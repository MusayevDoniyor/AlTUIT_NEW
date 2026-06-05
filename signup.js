const { createClient } = require("@supabase/supabase-js");
require("dotenv").config(); // Load variables from .env

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://fbvmqyavgeqgvxoxhffi.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZidm1xeWF2Z2VxZ3Z4b3hoZmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NTM4OTYsImV4cCI6MjA5NjEyOTg5Nn0.ZD2qrTP9m41r2brHZYO0DPiPBczAl8BY5aYKMzXGnbM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function signUp() {
  const email = "admin@tatual.uz";
  const password = "admin@tatual.uz2026";
  console.log(`Attempting to sign up ${email}...`);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error.message);
  } else {
    console.log("Signup success!", data);
  }
}

signUp();
