export default function PageHeader({
  title,
  subtitle,
  actions,
}) {
  return (
    <div className="page-header page-header-row">

      <div>
        {subtitle && (
          <p className="eyebrow">
            {subtitle}
          </p>
        )}

        <h1>{title}</h1>
      </div>

      {actions}
    </div>
  );
}