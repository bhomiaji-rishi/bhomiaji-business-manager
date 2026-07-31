import { Package, Plus, Search } from "lucide-react";

export default function Products() {
  return (
    <div className="page">
      <div className="page-header page-header-row">
        <div>
          <p className="eyebrow">CATALOG</p>
          <h1>Products</h1>
          <p className="page-description">
            Manage your clothing products and inventory.
          </p>
        </div>

        <button className="primary-button">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />

          <input
            type="search"
            placeholder="Search products..."
          />
        </div>
      </div>

      <div className="panel">
        <div className="empty-state large">
          <Package size={42} />

          <h2>No products yet</h2>

          <p>
            Add your first product to start managing
            your catalog and inventory.
          </p>

          <button className="primary-button">
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
