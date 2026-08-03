import { supabase } from "./supabase";

export async function getInventoryMovements() {
  const { data, error } = await supabase
    .from("inventory_movements")
    .select(`
      *,
      products ( id, brand, name ),
      product_sizes ( id, size )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw error;

  return data || [];
}
