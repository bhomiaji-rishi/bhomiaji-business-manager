import "./StatCard.css";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <p className="stat-card-title">{title}</p>
          <h2 className="stat-card-value">{value}</h2>
        </div>

        {icon && (
          <div className="stat-card-icon">
            {icon}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="stat-card-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}