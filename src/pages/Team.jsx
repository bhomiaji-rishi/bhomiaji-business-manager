import {
  Users,
  Plus,
  UserRound,
} from "lucide-react";

export default function Team() {
  return (
    <div className="page">
      <div className="page-header page-header-row">
        <div>
          <p className="eyebrow">PEOPLE</p>
          <h1>Team</h1>
          <p className="page-description">
            Manage your sales representatives and team members.
          </p>
        </div>

        <button className="primary-button">
          <Plus size={18} />
          Add Team Member
        </button>
      </div>

      <div className="panel">
        <div className="empty-state large">
          <Users size={42} />

          <h2>No team members yet</h2>

          <p>
            Team members and sales representatives will
            appear here.
          </p>

          <button className="primary-button">
            <Plus size={18} />
            Add Team Member
          </button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: "20px" }}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">ROLES</p>
            <h2>Available Roles</h2>
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "14px 0",
            }}
          >
            <UserRound size={20} />

            <div>
              <strong>Owner</strong>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#718096",
                  fontSize: "13px",
                }}
              >
                Full access to the business manager.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "14px 0",
            }}
          >
            <UserRound size={20} />

            <div>
              <strong>Sales Representative</strong>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#718096",
                  fontSize: "13px",
                }}
              >
                Manage assigned retailers and orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
