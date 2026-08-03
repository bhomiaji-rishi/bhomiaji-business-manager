import { supabase } from "./supabase";

// Get Business Profile
export async function getBusinessProfile() {
  const { data, error } = await supabase
    .from("business_profile")
    .select("*")
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}

// Update Business Profile
export async function updateBusinessProfile(id, profile) {
  const { data, error } = await supabase
    .from("business_profile")
    .update({
      business_name: profile.business_name,
      owner_name: profile.owner_name,
      gst_number: profile.gst_number,
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}