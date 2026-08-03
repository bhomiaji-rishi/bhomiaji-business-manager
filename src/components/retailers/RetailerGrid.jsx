import RetailerCard from "./RetailerCard";

export default function RetailerGrid({
  retailers,
  isOwner,
  onDelete,
}) {
  if (!retailers.length) {
    return (
      <div className="panel">
        <div className="empty-state large">
          <h2>No retailers yet</h2>

          <p>
            Add your first retailer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {retailers.map((retailer) => (
        <RetailerCard
          key={retailer.id}
          retailer={retailer}
          isOwner={isOwner}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}