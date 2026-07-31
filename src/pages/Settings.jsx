import {
  Settings as SettingsIcon,
  LogOut,
  Shield,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function Settings() {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">SYSTEM</p>

        <h1>Settings</h1>

        <p className="page-description">
          Manage your account and application settings.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">ACCOUNT</p>
              <h2>Your Account</h2>
            </div>

            <SettingsIcon size={20} />
          </div>

          <div style={{ padding: "22px" }}>
            <p
              style={{
                margin: "0 0 6px",
                color: "#718096",
                fontSize: "12px",
              }}
            >
              EMAIL
            </p>

            <p
              style={{
                margin: 0,
                fontWeight: 700,
                color: "#243b53",
                wordBreak: "break-word",
              }}
            >
              {user?.email || "No email available"}
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">SECURITY</p>
              <h2>Authentication</h2>
            </div>

            <Shield size={20} />
          </div>

          <div style={{ padding: "22px" }}>
            <p
              style={{
                margin: "0 0 18px",
                color: "#718096",
                lineHeight: 1.6,
              }}
            >
              Your account is authenticated through
              Supabase.
            </p>

            <button
              className="primary-button"
              onClick={handleSignOut}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
