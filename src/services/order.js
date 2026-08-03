import { supabase } from "./supabase";

// Get all orders with retailer details
export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      retailers (
        id,
        retailer_name,
        shop_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// Create Order
export async function createOrder(order) {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      retailer_id: order.retailerId,
      total: Number(order.total),
      status: order.status || "Pending",
      notes: order.notes || "",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Get items of one order
export async function getOrderItems(orderId) {
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      *,
      products (
        id,
        brand,
        name,
        price
      )
    `)
    .eq("order_id", orderId);

  if (error) throw error;

  return data || [];
}

// Add product to order
export async function addOrderItem(item) {
  const { data, error } = await supabase
    .from("order_items")
    .insert({
      order_id: item.orderId,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Delete order
export async function deleteOrder(id) {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}

export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function createOrderWithStock({ retailerId, items, notes = "" }) {
  const { data, error } = await supabase.rpc("create_order_with_stock", {
    p_retailer_id: retailerId,
    p_items: items.map((item) => ({
      product_id: item.productId,
      product_size_id: item.sizeId,
      quantity: item.quantity,
    })),
    p_notes: notes,
  });

  if (error) throw error;

  return data;
}

export async function cancelOrderAndRestoreStock(orderId) {
  const { data, error } = await supabase.rpc("cancel_order_and_restore_stock", {
    p_order_id: orderId,
  });

  if (error) throw error;

  return data;
}
