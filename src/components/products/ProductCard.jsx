import {
  Trash2,
} from "lucide-react";

export default function ProductCard({
  product,
  isOwner,
  onDelete,
}) {
  const stock = Number(product.stock) || 0;

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
          />
        ) : (
          <span>
            {product.brand?.[0] || "?"}
          </span>
        )}
      </div>

      <div className="product-brand">
        {product.brand}
      </div>

      <h3>{product.name}</h3>

      <div className="product-details">
        <strong>
          ₹{Number(product.price || 0).toLocaleString("en-IN")}
        </strong>

        <span
          className={
            stock > 0
              ? "stock-available"
              : "stock-empty"
          }
        >
          {stock > 0
            ? `${stock} in stock`
            : "Out of stock"}
        </span>
      </div>

      {product.sizes && (
        <div className="product-sizes">
          Sizes: {product.sizes}
        </div>
      )}

      {product.barcode && (
        <div className="product-barcode">
          SKU: {product.barcode}
        </div>
      )}

      {isOwner && (
        <button
          type="button"
          className="delete-product-button"
          onClick={() => onDelete(product.id)}
        >
          <Trash2 size={15} />
          Delete
        </button>
      )}
    </div>
  );
}