import { Plus } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="empty-state">
      <Icon
        size={56}
        strokeWidth={1.5}
        style={{
          color: "#b48b4d",
          marginBottom: 16,
        }}
      />

      <h3>{title}</h3>

      <p>{description}</p>

      {buttonText && (
        <button
          className="primary-button"
          onClick={onButtonClick}
          style={{ marginTop: 18 }}
        >
          <Plus size={18} />
          {buttonText}
        </button>
      )}
    </div>
  );
}