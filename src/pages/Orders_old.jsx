import toast from "react-hot-toast";
import EmptyState from "../components/common/EmptyState";
import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { getRetailers } from "../services/retailers";
import {
  getOrders,
  getOrderItems,
  createOrder,
  addOrderItem,
} from "../services/order";
import {
  ShoppingCart,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import OrderCart from "../components/orders/OrderCart";


export default function Orders() {
  const [showForm, setShowForm] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState("");
const [selectedProduct, setSelectedProduct] = useState("");
const [quantity, setQuantity] = useState(1);
const [cartItems, setCartItems] = useState([]);
const [saving, setSaving] = useState(false);
const [saveError, setSaveError] = useState("");
  const [retailers, setRetailers] = useState([]);
const [retailersLoading, setRetailersLoading] = useState(false);
const [retailerError, setRetailerError] = useState("");
const [products, setProducts] = useState([]);
const [orders, setOrders] = useState([]);
const [ordersLoading, setOrdersLoading] = useState(true);
const [productsLoading, setProductsLoading] = useState(false);
const [productError, setProductError] = useState("");
const [selectedOrder, setSelectedOrder] = useState(null);
const [orderItems, setOrderItems] = useState([]);

function handleRemoveItem(productId) {
  setCartItems((current) =>
    current.filter(
      (item) => item.productId !== productId
    )
  );
}

useEffect(() => {
  async function loadRetailers() {
    try {
      setRetailersLoading(true);
      setRetailerError("");

      const data = await getRetailers();

      setRetailers(data);
    } catch (err) {
      console.error("LOAD RETAILERS ERROR:", err);

      setRetailerError(
        err?.message || "Unable to load retailers."
      );
    } finally {
      setRetailersLoading(false);
    }
  }

  loadRetailers();
}, []);

async function loadOrders() {
  try {
    setOrdersLoading(true);

    const data = await getOrders();

    setOrders(data);
  } catch (err) {
    console.error("LOAD ORDERS ERROR:", err);
  } finally {
    setOrdersLoading(false);
  }
}

useEffect(() => {
  async function loadProducts() {
    try {
      setProductsLoading(true);
      setProductError("");

      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      console.error("LOAD PRODUCTS ERROR:", err);

      setProductError(
        err?.message || "Unable to load products."
      );
    } finally {
      setProductsLoading(false);
    }
  }

  loadProducts();
}, []);

useEffect(() => {
  loadOrders();
}, []);


async function handleViewOrder(order) {
  try {
    setSelectedOrder(order);

    const items = await getOrderItems(order.id);

    setOrderItems(items);
  } catch (err) {
  console.error(err);
  toast.error("Unable to load order details.");
}
}

function handleAddProduct() {
  if (!selectedProduct) {
    notify.error("Please select a product.");
    return;
  }

  if (!quantity || quantity < 1) {
    notify.error("Quantity must be at least 1.");
    return;
  }



  const existing = cartItems.find(
    (item) => item.productId === product.id
  );

  if (existing) {
    setCartItems((current) =>
      current.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      )
    );
  } else {
    setCartItems((current) => [
      ...current,
      {
        productId: product.id,
        brand: product.brand,
        name: product.name,
        price: Number(product.price || 0),
        quantity,
      },
    ]);
  }

  setSelectedProduct("");
  setQuantity(1);
}

}

  setSelectedProduct("");
  setQuantity(1);


async function handleSaveOrder() {
  if (!selectedRetailer) {
    setSaveError("Please select a retailer.");
    return;
  }

  if (cartItems.length === 0) {
    setSaveError("Please add at least one product.");
    return;
  }

  // Continue with the rest of the save logic here...

  try {
    setSaving(true);
    setSaveError("");

    const product = products.find(
      (p) => String(p.id) === String(selectedProduct)
    );

    if (!product) {
      throw new Error("Selected product not found.");
    }

    const total = cartItems.reduce(
  (sum, item) =>
    sum + item.price * item.quantity,
  0
);
    // 1. Create the main order
    const order = await createOrder({
      retailerId: selectedRetailer,
      total,
      status: "Pending",
      notes: "",
    });

    // 2. Add product to the order
   for (const item of cartItems) {
  await addOrderItem({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  });
}

    // 3. Reset form
    setSelectedRetailer("");
    setSelectedProduct("");
    setQuantity(1);
    setCartItems([]);

    setShowForm(false);
    await loadOrders();

    notify.success("Order created successfully!");

  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);

    setSaveError(
      err?.message ||
        "Unable to create order."
    );

    toast.error(
  err?.message ||
  "Unable to create order."
);
  } finally {
    setSaving(false);
  }
}
const cartTotal = cartItems.reduce(
  (sum, item) =>
    sum + item.price * item.quantity,
  0
);
  return (
    <div className="page">
      <div className="page-header page-header-row">
        <div>
          <p className="eyebrow">SALES</p>

          <h1>Orders</h1>

          <p className="page-description">
            Create and manage retailer orders.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          New Order
        </button>
      </div>

      {showForm && (
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">SALES</p>
              <h2>Create Order</h2>
            </div>

            <button
              type="button"
              className="icon-button"
              onClick={() => setShowForm(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="form-content">
<div className="form-field">
  <label>Retailer</label>

  <select
    value={selectedRetailer}
    onChange={(e) =>
      setSelectedRetailer(e.target.value)
    }
  >
    <option value="">
      {retailersLoading
        ? "Loading retailers..."
        : "Select retailer"}
    </option>

    {retailers.map((retailer) => (
      <option
        key={retailer.id}
        value={retailer.id}
      >
        {retailer.shop_name ||
          retailer.retailer_name}
      </option>
    ))}
  </select>

  {retailerError && (
    <div className="error-message">
      {retailerError}
    </div>
  )}
</div>
<div className="form-field">
  <label>Product</label>

  <select
    value={selectedProduct}
    onChange={(e) => setSelectedProduct(e.target.value)}
  >
    <option value="">
      {productsLoading
        ? "Loading products..."
        : "Select product"}
    </option>

    {products.map((product) => (
      <option
        key={product.id}
        value={product.id}
      >
        {product.brand
          ? `${product.brand} - ${product.name}`
          : product.name}
      </option>
    ))}
  </select>

  {productError && (
    <div className="error-message">
      {productError}
    </div>
  )}
</div>  



<div className="form-field">
  <label>Quantity</label>

  <input
    type="number"
    min="1"
    value={quantity}
    onChange={(e) =>
      setQuantity(Number(e.target.value))
    }
  />
</div>

{saveError && (
  <div className="error-message">
    {saveError}
  </div>
)}

<button
  type="button"
  className="secondary-button"
  onClick={handleAddProduct}
>
  <Plus size={18} />
  Add Product
</button>

<OrderCart
  cartItems={cartItems}
  cartTotal={cartTotal}
  saving={saving}
  onRemove={handleRemoveItem}
  onSave={handleSaveOrder}
/>   
          </div>
        </div>
      )}

      {!showForm && (
  <div className="panel">

    <div className="panel-header">
      <h2>Recent Orders</h2>
    </div>
{ordersLoading ? (
  <p>Loading orders...</p>
) : orders.length === 0 ? (
  <EmptyState
  icon={ShoppingCart}
  title="No Orders"
  description="Start selling by creating your first retailer order."
  buttonText="Create Order"
  onButtonClick={() => setShowForm(true)}
/>
) : (
  <>
    <table className="table">
      <thead>
        <tr>
          <th>Retailer</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr
            key={order.id}
            onClick={() => handleViewOrder(order)}
            style={{ cursor: "pointer" }}
          >
            <td>
              {order.retailers?.shop_name ||
                order.retailers?.retailer_name}
            </td>

            <td>₹{order.total}</td>

            <td>{order.status}</td>

            <td>
              {new Date(order.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

{selectedOrder && (
  <div className="panel" style={{ marginTop: 24 }}>
    <div className="panel-header">
      <div>
        <p className="eyebrow">ORDER DETAILS</p>
        <h2>Order #{selectedOrder.id.slice(0, 8)}</h2>
      </div>
    </div>

    <div
      style={{
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}
    >
      <div>
        <strong>Retailer</strong>
        <p>
          {selectedOrder.retailers?.shop_name ||
            selectedOrder.retailers?.retailer_name}
        </p>
      </div>

      <div>
        <strong>Status</strong>
        <p>{selectedOrder.status}</p>
      </div>

      <div>
        <strong>Date</strong>
        <p>
          {new Date(
            selectedOrder.created_at
          ).toLocaleDateString()}
        </p>
      </div>

      <div>
        <strong>Total</strong>
        <p>
          ₹
          {Number(
            selectedOrder.total || 0
          ).toLocaleString()}
        </p>
      </div>
    </div>

    <table className="table">
      <thead>
        <tr>
          <th>Brand</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        {orderItems.map((item) => (
          <tr key={item.id}>
            <td>{item.products?.brand}</td>

            <td>{item.products?.name}</td>

            <td>{item.quantity}</td>

            <td>₹{item.price}</td>

            <td>
              ₹
              {(
                Number(item.quantity) *
                Number(item.price)
              ).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <th
            colSpan="4"
            style={{ textAlign: "right" }}
          >
            Grand Total
          </th>

          <th>
            ₹
            {Number(
              selectedOrder.total || 0
            ).toLocaleString()}
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
)}
  </>
)}
  </div>
)}

    </div>
  );
