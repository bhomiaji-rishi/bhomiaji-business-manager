import {
  ShoppingCart,
  Plus,
  Search,
} from "lucide-react";

export default function Orders() {
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

        <button className="primary-button">
          <Plus size={18} />
          New Order
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />

          <input
            type="search"
            placeholder="Search orders..."
          />
        </div>
      </div>

      <div className="panel">
        <div className="empty-state large">
          <ShoppingCart size={42} />

          <h2>No orders yet</h2>

          <p>
            Orders created for your retailers will appear
            here.
          </p>

          <button className="primary-button">
            <Plus size={18} />
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}
