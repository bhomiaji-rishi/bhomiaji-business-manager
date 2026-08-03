import { supabase } from "./supabase";

export async function getRetailers() {
  const { data, error } = await supabase
    .from("retailers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

export async function createRetailer(retailer) {
  const { data, error } = await supabase
    .from("retailers")
    .insert({
      retailer_name: retailer.retailerName,
      shop_name: retailer.shopName,
      phone: retailer.phone,
      email: retailer.email,
      gst_number: retailer.gstNumber,
      address: retailer.address,
      city: retailer.city,
      state: retailer.state,
      pincode: retailer.pincode,
      outstanding: Number(retailer.outstanding) || 0,
      notes: retailer.notes,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateRetailer(id, updates) {
  const { data, error } = await supabase
    .from("retailers")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteRetailer(id) {
  const { error } = await supabase
    .from("retailers")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}