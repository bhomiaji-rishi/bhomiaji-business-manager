import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import {
  getRetailers,
  createRetailer,
  deleteRetailer,
} from "../services/retailers";

import RetailerForm from "../components/retailers/RetailerForm";
import RetailerGrid from "../components/retailers/RetailerGrid";
import { notify } from "../utils/notify";

export default function Retailers() {
  const [retailers, setRetailers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isOwner = true;

  async function loadRetailers() {
    try {
      setLoading(true);
      setError("");

      const data = await getRetailers();
      setRetailers(data);
    } catch (err) {
      setError(
        err?.message || "Unable to load retailers."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRetailers();
  }, []);

  async function handleAdd(retailer) {
    notify.success("Retailer added successfully!");
    try {
      const created = await createRetailer(retailer);

      setRetailers((current) => [
        created,
        ...current,
      ]);
    } catch (err) {
      toast.error(
  err?.message ||
  "Unable to create retailer."
);
    }
  }

  async function handleDelete(id) {
    notify.success("Retailer deleted successfully!");
    if (!window.confirm("Delete this retailer?")) {
      return;
    }

    try {
      await deleteRetailer(id);

      setRetailers((current) =>
        current.filter((r) => r.id !== id)
      );
    } catch (err) {
      toast.error(
  err?.message ||
  "Unable to delete retailer."
);
    }
  }

  const filteredRetailers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) return retailers;

    return retailers.filter((r) =>
      `${r.retailer_name} ${r.shop_name} ${r.phone} ${r.city}`
        .toLowerCase()
        .includes(query)
    );
  }, [retailers, search]);

  return (
    <div className="page">

      <div className="page-header page-header-row">

        <div>
          <p className="eyebrow">
            CUSTOMERS
          </p>

          <h1>Retailers</h1>

          <p className="page-description">
            Manage your retailer network.
          </p>
        </div>

        <button
          className="icon-button"
          onClick={loadRetailers}
        >
          <RefreshCw size={18} />
        </button>

      </div>

      {error && (
        <div
          className="error-message"
          style={{ marginBottom: 18 }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <RetailerForm
          onAdd={handleAdd}
        />
      </div>

      <div className="toolbar">

<div className="search-box">
  <Search size={18} />

  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search retailers..."
  />
</div>

      </div>

{loading ? (
  <div className="panel">
    <div className="empty-state large">
      <h2>Loading retailers...</h2>
    </div>
  </div>
) : filteredRetailers.length === 0 ? (
  <EmptyState
    icon={Users}
    title="No Retailers"
    description="Add your first retailer to begin managing your wholesale customers."
    buttonText="Add Retailer"
    onButtonClick={() =>
      document
        .querySelector(".panel")
        ?.scrollIntoView({
          behavior: "smooth",
        })
    }
  />
) : (
  <RetailerGrid
    retailers={filteredRetailers}
    isOwner={isOwner}
    onDelete={handleDelete}
  />
)}

    </div>
  );
}
