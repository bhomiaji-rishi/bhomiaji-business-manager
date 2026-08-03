import { supabase } from "./supabase";

/**
 * Get all payments for one invoice
 */
export async function getPayments(invoiceId) {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("invoice_id", invoiceId)
    .order("payment_date", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

/**
 * Record payment
 */
export async function createPayment(payment) {
  const { data, error } = await supabase
    .from("payments")
    .insert(payment)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Update payment
 */
export async function updatePayment(id, updates) {
  const { data, error } = await supabase
    .from("payments")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Delete payment
 */
export async function deletePayment(id) {
  const { error } = await supabase
    .from("payments")
    .delete()
    .eq("id", id);

  if (error) throw error;
}