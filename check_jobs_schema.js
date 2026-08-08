import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envContent = fs.readFileSync(".env", "utf-8");
const env = {};
envContent.split("\n").forEach((line) => {
  const parts = line.split("=");
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join("=").trim();
  }
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function test() {
  console.log("Checking jobs table...");
  const { data, error } = await supabase.from("jobs").select("*").limit(1);
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Jobs sample record:", data);
  }
}

test();
