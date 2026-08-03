import { supabase } from "../services/supabase";
import { getFinancialYear } from "./financialYear";

/**
 * Generate the next invoice number.
 * Example:
 * BCC/26-27/0001
 */
export async function generateInvoiceNumber() {
  const fy = getFinancialYear();

  const prefix = `BCC/${fy}/`;

  const { data, error } = await supabase
    .from("invoices")
    .select("invoice_number")
    .like("invoice_number", `${prefix}%`)
    .order("invoice_number", {
      ascending: false,
    })
    .limit(1);

  if (error) {
    throw error;
  }

  let nextNumber = 1;

  if (data.length > 0) {
    const last = data[0].invoice_number;

    const lastSequence = parseInt(
      last.split("/").pop(),
      10
    );

    nextNumber = lastSequence + 1;
  }

  return `${prefix}${String(nextNumber).padStart(4, "0")}`;
}