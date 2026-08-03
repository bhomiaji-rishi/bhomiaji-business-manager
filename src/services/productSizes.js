import { supabase } from "./supabase";

export async function getProductSizes(productId) {
  const { data, error } = await supabase
    .from("product_sizes")
    .select("*")
    .eq("product_id", productId)
    .order("size");

  if (error) throw error;

  return data || [];
}

export async function createProductSize(productId, size, stock) {
  const { data, error } = await supabase
    .from("product_sizes")
    .insert({
      product_id: productId,
      size,
      stock,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProductSize(id, stock) {
  const { data, error } = await supabase
    .from("product_sizes")
    .update({
      stock,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteProductSize(id) {
  const { error } = await supabase
    .from("product_sizes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}