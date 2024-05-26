import { createClient } from "@supabase/supabase-js";

let key = import.meta.env.VITE_SUPABASE_KEY;
let url = import.meta.env.VITE_SUPABASE_URL;

const supabase = createClient(url, key);

export { supabase };