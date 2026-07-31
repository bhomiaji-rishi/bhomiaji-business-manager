import { Store, Plus, Search } from "lucide-react";

export default function Retailers() {
  return (
    <div className="page">
      <div className="page-header page-header-row">
        <div>
          <p className="eyebrow">CUSTOMERS</p>
          <h1>Retailers</h1>
          <p className="page-description">
            Manage your retailer network and customer information.
          </p>
        </div>

        <button className="primary-button">
          <Plus size={18} />
          Add Retailer
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />

          <input
            type="search"
            placeholder="Search retailers..."
          />
        </div>
      </div>

      <div className="panel">
        <div className="empty-state large">
          <Store size={42} />

          <h2>No retailers yet</h2>

          <p>
            Add your first retailer to start managing
            customers and their orders.
          </p>

          <button className="primary-button">
            <Plus size={18} />
            Add Retailer
          </button>
        </div>
      </div>
    </div>
  );
}
