import { createClient } from "@supabase/supabase-js";

let key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y2Rkb3FybmZteWZpZW5wcGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzM2MDIsImV4cCI6MjAyNTQwOTYwMn0.o4rnb00r_igMaBWXuV1V1FmWekva49nKLrwhndN3y2c';
let url = "https://stcddoqrnfmyfienppic.supabase.co";

const supabase = createClient(url, key);

export { supabase };