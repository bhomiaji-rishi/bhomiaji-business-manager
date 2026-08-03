import {
  LayoutDashboard,
  Package,
  Boxes,
  Store,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

const items = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Boxes,
  },
  {
    id: "retailers",
    label: "Retailers",
    icon: Store,
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar({
  tab,
  setTab,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          B
        </div>

        <div>
          <strong>BHOMIAJI</strong>
          <span>Business Manager</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
  className={`sidebar-link ${
    tab === item.id
      ? "sidebar-link-active"
      : ""
  }`}
>
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
