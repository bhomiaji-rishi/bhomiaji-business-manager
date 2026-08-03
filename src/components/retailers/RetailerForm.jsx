import { useState } from "react";
import { Plus, Check } from "lucide-react";

const initialForm = {
  retailerName: "",
  shopName: "",
  phone: "",
  email: "",
  gstNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  outstanding: "",
  notes: "",
};

export default function RetailerForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSaved(false);

    if (!form.retailerName.trim()) {
      setError("Retailer name is required.");
      return;
    }

    if (!form.shopName.trim()) {
      setError("Shop name is required.");
      return;
    }

    try {
      setSaving(true);

      await onAdd(form);

      setForm(initialForm);
      setSaved(true);

      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message || "Unable to save retailer.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="product-form panel"
      onSubmit={handleSubmit}
    >
      <div className="panel-header">
        <div>
          <p className="eyebrow">CUSTOMERS</p>
          <h2>Add Retailer</h2>
        </div>

        <Plus size={20} />
      </div>

      <div className="form-content">

        <div className="form-field">
          <label>Retailer Name</label>
          <input
            value={form.retailerName}
            onChange={(e) =>
              update("retailerName", e.target.value)
            }
            required
          />
        </div>

        <div className="form-field">
          <label>Shop Name</label>
          <input
            value={form.shopName}
            onChange={(e) =>
              update("shopName", e.target.value)
            }
            required
          />
        </div>

        <div className="form-row">

          <div className="form-field">
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) =>
                update("phone", e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                update("email", e.target.value)
              }
            />
          </div>

        </div>

        <div className="form-field">
          <label>GST Number</label>
          <input
            value={form.gstNumber}
            onChange={(e) =>
              update("gstNumber", e.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label>Address</label>
          <input
            value={form.address}
            onChange={(e) =>
              update("address", e.target.value)
            }
          />
        </div>

        <div className="form-row">

          <div className="form-field">
            <label>City</label>
            <input
              value={form.city}
              onChange={(e) =>
                update("city", e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>State</label>
            <input
              value={form.state}
              onChange={(e) =>
                update("state", e.target.value)
              }
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-field">
            <label>Pincode</label>
            <input
              value={form.pincode}
              onChange={(e) =>
                update("pincode", e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>Outstanding (₹)</label>
            <input
              type="number"
              value={form.outstanding}
              onChange={(e) =>
                update("outstanding", e.target.value)
              }
            />
          </div>

        </div>

        <div className="form-field">
          <label>Notes</label>
          <textarea
            rows="3"
            value={form.notes}
            onChange={(e) =>
              update("notes", e.target.value)
            }
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {saved && (
          <div className="success-message">
            <Check size={16} />
            Retailer added successfully.
          </div>
        )}

        <button
          type="submit"
          className="primary-button"
          disabled={saving}
        >
          {saving ? "Saving..." : "Add Retailer"}
        </button>

      </div>
    </form>
  );
}