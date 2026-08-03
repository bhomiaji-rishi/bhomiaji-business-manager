import { useEffect, useState } from "react";
import {
  getBusinessProfile,
  updateBusinessProfile,
} from "../services/settings";
import { notify } from "../utils/notify";

export default function Settings() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getBusinessProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load business profile.");
    }
  }

  async function handleSave() {
    try {
      setSaving(true);

      await updateBusinessProfile(profile.id, profile);

      notify.success("Business profile updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Unable to save changes.");
    } finally {
      setSaving(false);
    }
  }

  if (!profile) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">SETTINGS</p>
          <h1>Business Settings</h1>
          <p className="page-description">
            Manage your business information.
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="form-content">

          <div className="form-field">
            <label>Business Name</label>
            <input
              value={profile.business_name || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  business_name: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Owner Name</label>
            <input
              value={profile.owner_name || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  owner_name: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <label>GST Number</label>
            <input
              value={profile.gst_number || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  gst_number: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Phone</label>
            <input
              value={profile.phone || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              value={profile.email || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <label>Address</label>
            <textarea
              rows={4}
              value={profile.address || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address: e.target.value,
                })
              }
            />
          </div>

          <button
            className="primary-button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>
      </div>
    </div>
  );
}