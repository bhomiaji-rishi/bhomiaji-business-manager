import { supabase } from "./supabase";

// Get all team members
export async function getTeamMembers() {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// Create team member
export async function createTeamMember(member) {
  const { data, error } = await supabase
    .from("team_members")
    .insert({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      status: member.status || "Active",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Update team member
export async function updateTeamMember(id, updates) {
  const { data, error } = await supabase
    .from("team_members")
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

// Delete team member
export async function deleteTeamMember(id) {
  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}