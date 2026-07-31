import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Retailers from "./pages/Retailers";
import Orders from "./pages/Orders";
import Team from "./pages/Team";
import Settings from "./pages/Settings";

import MainLayout from "./layouts/MainLayout";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/retailers" element={<Retailers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
