import { supabase } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      brand: product.brand,
      name: product.name,
      image_url: product.imageUrl || "",
      barcode: product.barcode || "",
      price: Number(product.price) || 0,
      sizes: product.sizes || "",
      stock: Number(product.stock) || 0,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}
