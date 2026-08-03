import "./Card.css";

export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  className = "",
}) {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="card-header">

          <div>
            {subtitle && (
              <p className="card-subtitle">
                {subtitle}
              </p>
            )}

            {title && (
              <h3 className="card-title">
                {title}
              </h3>
            )}
          </div>

          {headerAction && (
            <div>
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>
    </div>
  );
}