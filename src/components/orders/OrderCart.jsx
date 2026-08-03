import { Trash2 } from "lucide-react";

export default function OrderCart({
  cartItems,
  cartTotal,
  saving,
  onRemove,
  onSave,
}) {
  if (cartItems.length === 0) return null;

  return (
    <>
      <table
        className="table"
        style={{ marginTop: 20 }}
      >
        <thead>
          <tr>
            <th>Brand</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{item.brand}</td>

              <td>{item.name}</td>

              <td>{item.quantity}</td>

              <td>₹{item.price}</td>

              <td>
                ₹
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </td>

              <td>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() =>
                    onRemove(item.productId)
                  }
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: 20,
          textAlign: "right",
        }}
      >
        <h2>
          Grand Total ₹
          {cartTotal.toLocaleString()}
        </h2>
      </div>

      <button
        type="button"
        className="primary-button"
        onClick={onSave}
        disabled={saving}
        style={{ marginTop: 20 }}
      >
        {saving
          ? "Saving..."
          : "Save Order"}
      </button>
    </>
  );
}