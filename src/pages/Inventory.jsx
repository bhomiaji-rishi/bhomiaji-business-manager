import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Boxes, RefreshCw } from "lucide-react";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import { getProducts } from "../services/products";
import { getInventoryMovements } from "../services/inventory";

const movementLabels = {
  opening_stock: "Opening stock",
  purchase: "Purchase",
  sale: "Sale",
  sale_return: "Sale return",
  adjustment_in: "Adjustment in",
  adjustment_out: "Adjustment out",
  production_in: "Production in",
  production_out: "Production out",
};

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  async function loadInventory() {
    try {
      setLoading(true);
      setError("");
      const [productData, movementData] = await Promise.all([getProducts(), getInventoryMovements()]);
      setProducts(productData);
      setMovements(movementData);
    } catch (err) {
      setError(err?.message || "Unable to load inventory.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadInventory(); }, []);

  const summary = useMemo(() => ({
    total: products.reduce((sum, product) => sum + (Number(product.stock) || 0), 0),
    low: products.filter((product) => Number(product.stock) > 0 && Number(product.stock) <= 10).length,
    out: products.filter((product) => Number(product.stock) === 0).length,
  }), [products]);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const stock = Number(product.stock) || 0;
    if (filter === "Low stock") return stock > 0 && stock <= 10;
    if (filter === "Out of stock") return stock === 0;
    return true;
  }), [products, filter]);

  return <div className="page">
    <div className="page-header page-header-row"><div><p className="eyebrow">OPERATIONS</p><h1>Inventory</h1><p className="page-description">Monitor stock levels and every recorded stock movement.</p></div><Button variant="secondary" icon={<RefreshCw size={18} />} onClick={loadInventory} disabled={loading}>Refresh</Button></div>
    {error && <div className="error-message">{error}</div>}
    <section className="inventory-summary"><div><span>Total units</span><strong>{summary.total}</strong></div><div><span>Low stock</span><strong>{summary.low}</strong></div><div><span>Out of stock</span><strong>{summary.out}</strong></div></section>
    <section className="panel"><div className="panel-header"><div><p className="eyebrow">STOCK LEVELS</p><h2>Products</h2></div><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>Low stock</option><option>Out of stock</option></select></div>{loading ? <p>Loading inventory...</p> : filteredProducts.length === 0 ? <EmptyState icon={Boxes} title="No matching products" description="Try another stock filter." /> : <table className="table"><thead><tr><th>Product</th><th>Barcode</th><th>Stock</th><th>Availability</th></tr></thead><tbody>{filteredProducts.map((product) => { const stock = Number(product.stock) || 0; return <tr key={product.id}><td>{[product.brand, product.name].filter(Boolean).join(" — ")}</td><td>{product.barcode || "—"}</td><td>{stock}</td><td><span className={stock === 0 ? "stock-empty" : stock <= 10 ? "stock-low" : "stock-available"}>{stock === 0 ? "Out of stock" : stock <= 10 ? "Low stock" : "In stock"}</span></td></tr>; })}</tbody></table>}</section>
    <section className="panel" style={{ marginTop: 24 }}><div className="panel-header"><div><p className="eyebrow">AUDIT TRAIL</p><h2>Recent stock movements</h2></div></div>{loading ? <p>Loading stock history...</p> : movements.length === 0 ? <EmptyState icon={AlertTriangle} title="No stock movements yet" description="New sales and future stock adjustments will appear here." /> : <table className="table"><thead><tr><th>Date</th><th>Product</th><th>Size</th><th>Type</th><th>Change</th><th>Note</th></tr></thead><tbody>{movements.map((movement) => <tr key={movement.id}><td>{new Date(movement.created_at).toLocaleString("en-IN")}</td><td>{[movement.products?.brand, movement.products?.name].filter(Boolean).join(" — ") || "—"}</td><td>{movement.product_sizes?.size || "—"}</td><td>{movementLabels[movement.movement_type] || movement.movement_type}</td><td className={movement.quantity_change > 0 ? "movement-in" : "movement-out"}>{movement.quantity_change > 0 ? "+" : ""}{movement.quantity_change}</td><td>{movement.notes || "—"}</td></tr>)}</tbody></table>}</section>
  </div>;
}
