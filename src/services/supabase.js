import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tollnaadznatanuqtqqe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvbGxuYWFkem5hdGFudXF0cXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5NTQ4MzIsImV4cCI6MjAwNzUzMDgzMn0.pG1dZP-VXQRa5l95IfeJT_eXfQhYzUV4byZGiKT1dHU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
