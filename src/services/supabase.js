import {createClient} from "@supabase/supabase-js";

export const supabaseUrl = "https://ucdawguwlvgxbdxafhal.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZGF3Z3V3bHZneGJkeGFmaGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0MDM2ODYsImV4cCI6MjAxMzk3OTY4Nn0.YNM-vQI33NX0glnFUOjyjGWRAVPZ66JmKyLuEmgRxfo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
