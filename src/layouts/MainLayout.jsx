import {
  NavLink,
  Outlet,
} from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Store,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/products",
    icon: Package,
  },
  {
    label: "Retailers",
    path: "/retailers",
    icon: Store,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Team",
    path: "/team",
    icon: Users,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function MainLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">B</div>

          <div>
            <strong>BHOMIAJI</strong>
            <span>Business Manager</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigation.map(
            ({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive
                      ? "sidebar-link-active"
                      : ""
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            )
          )}
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}