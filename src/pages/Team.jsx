import toast from "react-hot-toast";
import EmptyState from "../components/common/EmptyState";
import { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  getTeamMembers,
  createTeamMember,
  deleteTeamMember,
} from "../services/team";
import { notify } from "../utils/notify";

export default function Team() {
  const [members, setMembers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Sales Representative");

  async function loadMembers() {
    try {
      const data = await getTeamMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  async function handleAddMember() {
    if (!name || !email) {
      toast.error("Name and Email are required.");
      return;
    }

    try {
      await createTeamMember({
        name,
        email,
        phone,
        role,
        status: "Active",
      });
       notify.success("Team member added successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setRole("Sales Representative");

      setShowForm(false);

      loadMembers();
    } catch (err) {
      console.error(err);

toast.error(
  err?.message || "Unable to add team member."
);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this member?")) {
      return;
    }


    try {
      await deleteTeamMember(id);
      notify.success("Team member deleted successfully!");
      loadMembers();
    } catch (err) {
      console.error(err);
    }
  }
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

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add Team Member
        </button>
      </div>

      {showForm && (
        <div className="panel" style={{ marginBottom: 20 }}>

          <div className="panel-header">
            <h2>Add Team Member</h2>
          </div>

          <div className="form-content">

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Owner</option>
              <option>Manager</option>
              <option>Sales Representative</option>
              <option>Warehouse</option>
            </select>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "16px",
              }}
            >
              <button
                className="primary-button"
                onClick={handleAddMember}
              >
                Save Member
              </button>

              <button
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>

          </div>

        </div>
      )}

      <div className="panel">

        <div className="panel-header">
          <h2>Team Members</h2>
        </div>
        {members.length === 0 ? (
  <EmptyState
    icon={UserRound}
    title="No Team Members"
    description="Invite your employees to collaborate on orders and inventory."
    buttonText="Add Team Member"
    onButtonClick={() => setShowForm(true)}
  />
) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.role}</td>
                  <td>{member.status}</td>

                  <td>
                    <button
                      className="icon-button"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel-header">
          <h2>Available Roles</h2>
        </div>

        <div style={{ padding: 20 }}>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <UserRound size={20} />
            <div>
              <strong>Owner</strong>
              <p style={{ color: "#777", margin: 0 }}>
                Full access to the system.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <UserRound size={20} />
            <div>
              <strong>Manager</strong>
              <p style={{ color: "#777", margin: 0 }}>
                Manage products, retailers and orders.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <UserRound size={20} />
            <div>
              <strong>Sales Representative</strong>
              <p style={{ color: "#777", margin: 0 }}>
                Create orders and manage retailers.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}