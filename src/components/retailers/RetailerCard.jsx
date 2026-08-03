import { Store, Phone, Mail, Trash2 } from "lucide-react";

export default function RetailerCard({
  retailer,
  isOwner,
  onDelete,
}) {
  return (
    <div className="product-card">

      <div className="product-image">
        <Store size={34} />
      </div>

      <div className="product-brand">
        {retailer.shop_name}
      </div>

      <h3>{retailer.retailer_name}</h3>

      <div className="product-details">
        <span>
          <Phone size={14} /> {retailer.phone || "-"}
        </span>
      </div>

      <div className="product-details">
        <span>
          <Mail size={14} /> {retailer.email || "-"}
        </span>
      </div>

      {retailer.city && (
        <div className="product-sizes">
          {retailer.city}, {retailer.state}
        </div>
      )}

      <div className="product-barcode">
        Outstanding ₹
        {Number(retailer.outstanding || 0).toLocaleString("en-IN")}
      </div>

      {isOwner && (
        <button
          className="delete-product-button"
          onClick={() => onDelete(retailer.id)}
        >
          <Trash2 size={15} />
          Delete
        </button>
      )}
    </div>
  );
}