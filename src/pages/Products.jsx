  import toast from "react-hot-toast";
  import { Package } from "lucide-react";
import StatCard from "../components/common/StatCard";
import EmptyState from "../components/common/EmptyState";
  import { useEffect, useMemo, useState } from "react";
  import { RefreshCw } from "lucide-react";
  import SearchBar from "../components/common/SearchBar";
  import Card from "../components/common/Card";
  import Button from "../components/common/Button";
  import {
    getProducts,
    createProduct,
    deleteProduct,
  } from "../services/products";

  import ProductForm from "../components/products/ProductForm";
  import ProductGrid from "../components/products/ProductGrid";
import { notify } from "../utils/notify";

  export default function Products() {


    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState("");

    const role = "owner";

  const canManageProducts =
    role === "owner" ||
    role === "manager";
   

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        setError(
          err?.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      loadProducts();
    }, []);

    async function handleAdd(product) {
    try {
        const created = await createProduct(product);
        notify.success("Product added successfully!"); 
        setProducts((current) => [
        created,
        ...current,
      ]);
   } catch (err) {
  toast.error(
    err?.message ||
    "Unable to create product."
  );

  setError(
    err?.message ||
    "Unable to create product."
  );

  throw err;
}
  }

    async function handleDelete(id) {
      notify.success("Product deleted successfully!");
      const confirmed = window.confirm(
        "Delete this product?"
      );

      if (!confirmed) {
        return;
      }

      try {
        await deleteProduct(id);

        setProducts((current) =>
          current.filter(
            (product) => product.id !== id
          )
        );
      } catch (err) {
        toast.error(
  err?.message ||
  "Unable to delete product."
);

setError(
  err?.message ||
  "Unable to delete product."
);
      }
    }

    const filteredProducts = useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      if (!query) {
        return products;
      }

      return products.filter((product) =>
        `${product.brand} ${product.name} ${product.barcode || ""}`
          .toLowerCase()
          .includes(query)
      );
    }, [products, search]);

    return (
      <div className="page">
        <div className="page-header page-header-row">
          <div>
            <p className="eyebrow">
              CATALOG
            </p>

            <h1>Products</h1>

            <p className="page-description">
              Manage your products, prices, sizes
              and stock.
            </p>
          </div>

          <Button
    variant="secondary"
    icon={<RefreshCw size={18} />}
    onClick={loadProducts}
  >
    Refresh
  </Button>
        </div>
          <div className="mb-4">
            <StatCard
              title="Products"
              value={products.length}
              subtitle="Total products in catalog"
              icon={<Package size={20} />}
            />
          </div>

          {error && (
          <div
            className="error-message"
            style={{
              marginBottom: "18px",
            }}
          >
            {error}
          </div>
        )}

        {canManageProducts && (
  <Card
    title="Add Product"
    subtitle="CATALOG"
    className="mb-4"
  >
    <ProductForm
      onAdd={handleAdd}
    />
  </Card>
)}

     <div className="toolbar">
  <SearchBar
    value={search}
    onChange={setSearch}
    placeholder="Search brand, product or SKU..."
  />
</div>

        {loading ? (
          <div className="panel">
            <div className="empty-state large">
              <h2>Loading products...</h2>
            </div>
          </div> 
) : filteredProducts.length === 0 ? (
  <EmptyState
    icon={Package}
    title="No Products"
    description="Add your first product to start managing your inventory."
    buttonText={
      canManageProducts ? "Add Product" : undefined
    }
    onButtonClick={() => {
      document
        .querySelector(".panel")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }}
  />
) : (
  <ProductGrid
    products={filteredProducts}
    isOwner={canManageProducts}
    onDelete={handleDelete}
  />
)}
      </div> 
    );
  }
  