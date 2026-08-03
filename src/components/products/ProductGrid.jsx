import ProductCard from "./ProductCard";



export default function ProductGrid({
  products,
  isOwner,
  onDelete,
}) {
  if (!products.length) {
    return (
      <div className="panel">
        <div className="empty-state large">
          <h2>No products yet</h2>

          <p>
            Add your first product to start building
            your catalog.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isOwner={isOwner}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}