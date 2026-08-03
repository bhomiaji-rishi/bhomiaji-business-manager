import { useEffect, useState } from "react";

import { getProducts } from "../services/products";
import { getRetailers } from "../services/retailers";
import { getOrders } from "../services/order";
import { getTeamMembers } from "../services/team";

import {
  Package,
  ShoppingCart,
  Users,
  UserRound,
  AlertTriangle,
} from "lucide-react";

export default function Dashboard({ setTab }) {
  const [products, setProducts] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          productData,
          retailerData,
          orderData,
          teamData,
        ] = await Promise.all([
          getProducts(),
          getRetailers(),
          getOrders(),
          getTeamMembers(),
        ]);

        setProducts(productData);
        setRetailers(retailerData);
        setOrders(orderData);
        setTeam(teamData);
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();
  }, []);
  const LOW_STOCK_LIMIT = 10;

const lowStockProducts = products.filter(
  (p) => Number(p.stock || 0) <= LOW_STOCK_LIMIT
);

const totalRevenue = orders.reduce(
  (sum, order) => sum + Number(order.total || 0),
  0
);

const stats = [
  {
    label: "Orders",
    value: orders.length,
    icon: ShoppingCart,
    tab: "orders",
  },
  {
    label: "Products",
    value: products.length,
    icon: Package,
    tab: "products",
  },
  {
    label: "Retailers",
    value: retailers.length,
    icon: Users,
    tab: "retailers",
  },
  {
    label: "Team",
    value: team.length,
    icon: UserRound,
    tab: "team",
  },
  {
    label: "Revenue",
    value: `₹${totalRevenue.toLocaleString()}`,
    icon: ShoppingCart,
    tab: "orders",
  },
  {
    label: "Low Stock",
    value: lowStockProducts.length,
    icon: AlertTriangle,
    tab: "products",
  },
];
return (
  <div className="page">
    <div className="page-header">
      <div>
        <p className="eyebrow">OVERVIEW</p>
        <h1>Dashboard</h1>
        <p className="page-description">
          Welcome to Bhomiaji Business Manager.
        </p>
      </div>
    </div>

    <section className="stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            className="stat-card"
            key={stat.label}
            onClick={() => setTab(stat.tab)}
            style={{ cursor: "pointer" }}
>
            <div className="stat-icon">
              <Icon size={20} />
            </div>

            <div>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </div>
          </div>
        );
      })}
    </section>



<section className="dashboard-grid">

  {/* Recent Orders */}
  <div className="panel">
    <div className="panel-header">
      <div>
        <p className="eyebrow">ORDERS</p>
        <h2>Recent Orders</h2>
      </div>
        <button
          className="icon-button"
          onClick={() => setTab("orders")}
        >
          View All →
    </button>
    </div>

    {orders.length === 0 ? (
     <EmptyState
  icon={ShoppingCart}
  title="No Orders Yet"
  description="Create your first wholesale order to start tracking sales."
  buttonText="Create Order"
  onButtonClick={() => setTab("orders")}
/>
    ) : (
      <table className="table">
        <thead>
          <tr>
            <th>Retailer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.slice(0, 5).map((order) => (
            <tr key={order.id}>
              <td>
                {order.retailers?.shop_name ||
                  order.retailers?.retailer_name}
              </td>

              <td>₹{order.total}</td>

              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>

  {/* Low Stock */}
  <div className="panel">
    <div className="panel-header">
      <div>
        <p className="eyebrow">INVENTORY</p>
        <h2>Low Stock</h2>
      </div>

      <button
        className="icon-button"
        onClick={() => setTab("products")}
      >
        View All
      </button>
    </div>

    {lowStockProducts.length === 0 ? (
     <EmptyState
  icon={Package}
  title="Inventory Looks Good"
  description="All your products have sufficient stock."
/>
    ) : (
      <table className="table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Product</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {lowStockProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.brand}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>

</section>
<section className="panel" style={{ marginTop: 24 }}>
  <div className="panel-header">
    <div>
      <p className="eyebrow">QUICK ACTIONS</p>
      <h2>Quick Actions</h2>
    </div>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      padding: "20px",
    }}
  >
    <button
      className="primary-button"
      onClick={() => setTab("orders")}
    >
      ➕ New Order
    </button>

    <button
      className="primary-button"
      onClick={() => setTab("products")}
    >
      📦 New Product
    </button>

    <button
      className="primary-button"
      onClick={() => setTab("retailers")}
    >
      🏪 New Retailer
    </button>

    <button
      className="primary-button"
      onClick={() => setTab("team")}
    >
      👥 Add Team Member
    </button>
  </div>
</section>
    </div>
  );
}