import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Retailers from "./pages/Retailers";
import Orders from "./pages/Orders_old";
import Team from "./pages/Team";
import Settings from "./pages/Settings";

import Sidebar from "./components/products/Sidebar";
import Layout from "./components/layout/Layout";

export default function App() {
  const { user, loading } = useAuth();

  const [tab, setTab] = useState("dashboard");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  function renderPage() {
    switch (tab) {
      case "products":
        return <Products />;

      case "retailers":
        return <Retailers />;

      case "orders":
        return <Orders />;

      case "team":
        return <Team />;

      case "settings":
        return <Settings />;

      case "dashboard":
      default:
        return <Dashboard setTab={setTab} />;
    }
  }

  return (
    <Layout
      sidebar={
        <Sidebar
          tab={tab}
          setTab={setTab}
        />
      }
    >
      {renderPage()}
    </Layout>
  );
}