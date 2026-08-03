
import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import {
  Plus,
  Check,
  Trash2,
} from "lucide-react";
import BarcodeScanner from "../common/BarcodeScanner";

const initialForm = {
  brand: "",
  name: "",
  imageUrl: "",
  barcode: "",
  price: "",
  sizeStocks: [{ size: "", stock: "" }],
};

export default function ProductForm({
  onAdd,
}) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSaved(false);

    if (!form.brand.trim()) {
      setError("Brand is required.");
      return;
    }

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!form.price) {
      setError("Price is required.");
      return;
    }

    try {
      setSaving(true);

      await onAdd({
        brand: form.brand.trim(),
        name: form.name.trim(),
        imageUrl: form.imageUrl.trim(),
        barcode: form.barcode.trim(),
        price: Number(form.price) || 0,
        sizeStocks: form.sizeStocks.map((item) => ({ size: item.size.trim(), stock: Number(item.stock) || 0 })).filter((item) => item.size),
      });

      setForm(initialForm);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 1800);
    } catch (err) {
      setError(
        err?.message || "Unable to save product."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="product-form panel"
      onSubmit={handleSubmit}
      >
 
           <Input
            label="Brand"
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            placeholder="e.g. Levi's"
            required
            />
        
          <Input
            label="Product Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Denim Shirt"
            required
          />

          <Input
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="0.00"
            required
        />

          <Input label="Barcode" value={form.barcode} onChange={(e) => update("barcode", e.target.value)} placeholder="Enter barcode" />
          <BarcodeScanner onDetected={(barcode) => update("barcode", barcode)} />

        <div className="form-field size-stock-fields">
          <label>Size-wise stock</label>
          {form.sizeStocks.map((item, index) => <div className="size-stock-row" key={index}>
            <input value={item.size} onChange={(e) => setForm((current) => ({ ...current, sizeStocks: current.sizeStocks.map((row, rowIndex) => rowIndex === index ? { ...row, size: e.target.value } : row) }))} placeholder="Size (e.g. M)" />
            <input type="number" min="0" value={item.stock} onChange={(e) => setForm((current) => ({ ...current, sizeStocks: current.sizeStocks.map((row, rowIndex) => rowIndex === index ? { ...row, stock: e.target.value } : row) }))} placeholder="Stock" />
            <button type="button" className="icon-button" aria-label="Remove size" disabled={form.sizeStocks.length === 1} onClick={() => setForm((current) => ({ ...current, sizeStocks: current.sizeStocks.filter((_, rowIndex) => rowIndex !== index) }))}><Trash2 size={16} /></button>
          </div>)}
          <div className="stock-total">Total stock: {form.sizeStocks.reduce((total, item) => total + (Number(item.stock) || 0), 0)}</div>
          <Button type="button" variant="secondary" onClick={() => setForm((current) => ({ ...current, sizeStocks: [...current.sizeStocks, { size: "", stock: "" }] }))}>Add size</Button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {saved && (
          <div className="success-message">
            <Check size={16} />
            Product saved successfully.
          </div>
        )}

        <Button
        type="submit"
        variant="primary"
        icon={<Plus size={18} />}
      >
        Add Product
        </Button>
    </form>
  );
}
