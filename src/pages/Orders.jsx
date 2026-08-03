import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus, ShoppingCart, Trash2, X } from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import { getProducts } from "../services/products";
import { getRetailers } from "../services/retailers";
import { cancelOrderAndRestoreStock, createOrderWithStock, getOrders, updateOrderStatus } from "../services/order";
import { getProductSizes } from "../services/productSizes";
import BarcodeScanner from "../components/common/BarcodeScanner";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [retailerId, setRetailerId] = useState("");
  const [productId, setProductId] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [saving, setSaving] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  async function loadData() {
    try {
      setLoading(true);
      setError("");
      const [orderData, productData, retailerData] = await Promise.all([
        getOrders(),
        getProducts(),
        getRetailers(),
      ]);
      setOrders(orderData);
      setProducts(productData);
      setRetailers(retailerData);
    } catch (err) {
      setError(err?.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    async function loadSizes() {
      setSelectedSize("");
      if (!productId) {
        setAvailableSizes([]);
        return;
      }
      try {
        setAvailableSizes(await getProductSizes(productId));
      } catch (err) {
        setError(err?.message || "Unable to load product sizes.");
        setAvailableSizes([]);
      }
    }
    loadSizes();
  }, [productId]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  const filteredOrders = useMemo(() => orders.filter((order) => {
    const retailer = `${order.retailers?.shop_name || ""} ${order.retailers?.retailer_name || ""}`.toLowerCase();
    return retailer.includes(search.trim().toLowerCase()) && (statusFilter === "All" || (order.status || "Pending") === statusFilter);
  }), [orders, search, statusFilter]);

  function addToCart() {
    const product = products.find((item) => String(item.id) === String(productId));
    const validQuantity = Number(quantity);
    if (!product) {
      setError("Select a product to add.");
      return;
    }
    if (!selectedSize) {
      setError("Select a size to add.");
      return;
    }
    const size = availableSizes.find((item) => String(item.id) === String(selectedSize));
    if (!size) {
      setError("This product has no size inventory. Add its size stock before creating an order.");
      return;
    }
    if (size && validQuantity > Number(size.stock)) {
      setError(`Only ${size.stock} unit(s) are available in size ${size.size}.`);
      return;
    }
    if (!Number.isFinite(validQuantity) || validQuantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id && item.sizeId === size?.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id && item.sizeId === size?.id
            ? { ...item, quantity: item.quantity + validQuantity }
            : item,
        );
      }
      return [...current, {
        productId: product.id,
        sizeId: size?.id || null,
        label: `${[product.brand, product.name].filter(Boolean).join(" — ")}${size ? ` (${size.size})` : ""}`,
        price: Number(product.price) || 0,
        quantity: validQuantity,
      }];
    });
    setProductId("");
    setSelectedSize("");
    setQuantity(1);
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setRetailerId("");
    setProductId("");
    setSelectedSize("");
    setQuantity(1);
    setCart([]);
    setError("");
  }

  async function saveOrder() {
    if (!retailerId) {
      setError("Select a retailer before saving.");
      return;
    }
    if (!cart.length) {
      setError("Add at least one product before saving.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await createOrderWithStock({ retailerId, items: cart });
      toast.success("Order created successfully.");
      closeForm();
      await loadData();
    } catch (err) {
      setError(err?.message || "Unable to create the order.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteOrder(orderId) {
    if (!window.confirm("Cancel this order and restore its stock?")) return;

    try {
      setUpdatingOrderId(orderId);
      setError("");
      await cancelOrderAndRestoreStock(orderId);
      setOrders((current) => current.map((order) => order.id === orderId ? { ...order, status: "Cancelled" } : order));
      toast.success("Order cancelled and stock restored.");
    } catch (err) {
      setError(err?.message || "Unable to cancel the order.");
      toast.error(err?.message || "Unable to cancel the order.");
    } finally {
      setUpdatingOrderId(null);
    }
  }

  async function handleStatusChange(orderId, status) {
    const currentOrder = orders.find((order) => order.id === orderId);
    if (currentOrder?.status === "Cancelled") {
      setError("Cancelled orders cannot be reactivated. Create a new order instead.");
      return;
    }
    if (status === "Cancelled") {
      await handleDeleteOrder(orderId);
      return;
    }
    try {
      setUpdatingOrderId(orderId);
      setError("");
      const updated = await updateOrderStatus(orderId, status);
      setOrders((current) => current.map((order) => order.id === orderId ? { ...order, status: updated.status } : order));
      toast.success("Order status updated.");
    } catch (err) {
      setError(err?.message || "Unable to update the order status.");
      toast.error(err?.message || "Unable to update the order status.");
    } finally {
      setUpdatingOrderId(null);
    }
  }

  function handleBarcodeDetected(barcode) {
    const product = products.find((item) => String(item.barcode || "").trim() === String(barcode).trim());
    if (!product) {
      setError(`No product was found for barcode ${barcode}.`);
      return;
    }
    setProductId(String(product.id));
    setError("");
    toast.success(`${product.name} selected.`);
  }

  return (
    <div className="page">
      <div className="page-header page-header-row">
        <div>
          <p className="eyebrow">SALES</p>
          <h1>Orders</h1>
          <p className="page-description">Create and manage retailer orders.</p>
        </div>
        <Button icon={<Plus size={18} />} onClick={() => setShowForm(true)}>New Order</Button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <section className="panel" style={{ marginBottom: 24 }}>
          <div className="panel-header">
            <div><p className="eyebrow">SALES</p><h2>Create Order</h2></div>
            <button type="button" className="icon-button" onClick={closeForm} aria-label="Close order form"><X size={18} /></button>
          </div>
          <div className="form-content">
            <div className="form-field">
              <label htmlFor="retailer">Retailer</label>
              <select id="retailer" value={retailerId} onChange={(event) => setRetailerId(event.target.value)}>
                <option value="">Select retailer</option>
                {retailers.map((retailer) => <option key={retailer.id} value={retailer.id}>{retailer.shop_name || retailer.retailer_name}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="product">Product</label>
              <select id="product" value={productId} onChange={(event) => setProductId(event.target.value)}>
                <option value="">Select product</option>
                {products.map((product) => <option key={product.id} value={product.id}>{[product.brand, product.name].filter(Boolean).join(" — ")}</option>)}
              </select>
            </div>
            <BarcodeScanner onDetected={handleBarcodeDetected} />
            {availableSizes.length > 0 && <div className="form-field">
              <label htmlFor="size">Size</label>
              <select id="size" value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}>
                <option value="">Select size</option>
                {availableSizes.map((size) => <option key={size.id} value={size.id} disabled={Number(size.stock) < 1}>{size.size} ({size.stock} in stock)</option>)}
              </select>
            </div>}
            <div className="form-field">
              <label htmlFor="quantity">Quantity</label>
              <input id="quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            </div>
            <Button variant="secondary" icon={<Plus size={18} />} onClick={addToCart}>Add Product</Button>
          </div>

          {cart.length > 0 && <div className="table-wrap"><table className="table"><thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th><th aria-label="Actions" /></tr></thead><tbody>
            {cart.map((item) => <tr key={`${item.productId}-${item.sizeId || "default"}`}><td>{item.label}</td><td>{item.quantity}</td><td>{currency.format(item.price)}</td><td>{currency.format(item.price * item.quantity)}</td><td><button type="button" className="icon-button" onClick={() => setCart((current) => current.filter((cartItem) => !(cartItem.productId === item.productId && cartItem.sizeId === item.sizeId)))} aria-label={`Remove ${item.label}`}><X size={18} /></button></td></tr>)}
          </tbody><tfoot><tr><th colSpan="3">Grand total</th><th>{currency.format(total)}</th><th /></tr></tfoot></table></div>}
          <div style={{ marginTop: 20 }}><Button disabled={saving} onClick={saveOrder}>{saving ? "Saving..." : "Save Order"}</Button></div>
        </section>
      )}

      <section className="panel">
        <div className="panel-header"><h2>Recent Orders</h2></div>
        <div className="toolbar"><input className="order-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search retailer..." /><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All</option><option>Pending</option><option>Confirmed</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></div>
        {loading ? <p>Loading orders...</p> : orders.length === 0 ? <EmptyState icon={ShoppingCart} title="No Orders" description="Start selling by creating your first retailer order." buttonText="Create Order" onButtonClick={() => setShowForm(true)} /> : filteredOrders.length === 0 ? <p>No orders match these filters.</p> : (
          <div className="table-wrap"><table className="table"><thead><tr><th>Retailer</th><th>Total</th><th>Status</th><th>Date</th><th aria-label="Actions" /></tr></thead><tbody>
            {filteredOrders.map((order) => <tr key={order.id}><td>{order.retailers?.shop_name || order.retailers?.retailer_name || "Unknown retailer"}</td><td>{currency.format(Number(order.total) || 0)}</td><td><select value={order.status || "Pending"} disabled={updatingOrderId === order.id} onChange={(event) => handleStatusChange(order.id, event.target.value)} aria-label="Order status"><option>Pending</option><option>Confirmed</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></td><td>{order.created_at ? new Date(order.created_at).toLocaleDateString("en-IN") : "—"}</td><td><button type="button" className="icon-button" onClick={() => handleDeleteOrder(order.id)} aria-label="Delete order"><Trash2 size={18} /></button></td></tr>)}
          </tbody></table></div>
        )}
      </section>
    </div>
  );
}
