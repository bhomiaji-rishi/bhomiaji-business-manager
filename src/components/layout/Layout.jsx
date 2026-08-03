import "./Layout.css";

export default function Layout({
  sidebar,
  children,
}) {
  return (
    <div className="layout">
      {sidebar}

      <div className="layout-main">
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}
