import { supabase } from "./supabase";

/**
 * Get all invoices
 */
export async function getInvoices() {
  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      retailers (
        retailer_name,
        shop_name
      ),
      orders (
        status
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

/**
 * Get one invoice
 */
export async function getInvoice(id) {
  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      retailers(*),
      orders(
        *,
        order_items(
          *,
          products(*),
          product_sizes(*)
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

/**
 * Create invoice
 */
export async function createInvoice(invoice) {
  const { data, error } = await supabase
    .from("invoices")
    .insert(invoice)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Update invoice
 */
export async function updateInvoice(id, updates) {
  const { data, error } = await supabase
    .from("invoices")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Delete invoice
 */
export async function deleteInvoice(id) {
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id);

  if (error) throw error;
}