export default function OrderItem({
  index,
  item,
  products,
  onChange,
  onRemove,
}) {
  const product = products.find(
    (p) => p.id === item.productId
  );

  const total =
    (product?.price || 0) * item.quantity;

  return (
    <div className="order-item">

      <select
        value={item.productId}
        onChange={(e) =>
          onChange(index, {
            ...item,
            productId: e.target.value,
          })
        }
      >
        <option value="">
          Select Product
        </option>

        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
          >
            {product.brand} — {product.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) =>
          onChange(index, {
            ...item,
            quantity: Number(e.target.value),
          })
        }
      />

      <div>
        ₹{Number(product?.price || 0).toLocaleString("en-IN")}
      </div>

      <div>
        ₹{Number(total).toLocaleString("en-IN")}
      </div>

      <button
        type="button"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>

    </div>
  );
}
