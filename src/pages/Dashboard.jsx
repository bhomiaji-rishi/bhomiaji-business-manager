import {
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Today's Orders",
    value: "0",
    icon: ShoppingCart,
  },
  {
    label: "Products",
    value: "0",
    icon: Package,
  },
  {
    label: "Retailers",
    value: "0",
    icon: Users,
  },
  {
    label: "Low Stock",
    value: "0",
    icon: AlertTriangle,
  },
];

export default function Dashboard() {
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
            <div className="stat-card" key={stat.label}>
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
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">ORDERS</p>
              <h2>Recent Orders</h2>
            </div>

            <button className="icon-button" title="View orders">
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="empty-state">
            <ShoppingCart size={32} />
            <h3>No orders yet</h3>
            <p>
              Orders created by your team will appear here.
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">INVENTORY</p>
              <h2>Low Stock</h2>
            </div>

            <button className="icon-button" title="View products">
              <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="empty-state">
            <Package size={32} />
            <h3>Inventory looks good</h3>
            <p>
              Low-stock products will appear here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
