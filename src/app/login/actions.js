"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function sendOTP(formData) {
  const supabase = createClient();

  const userData = {
    phone: "+91" + formData.get("phone"),
  };

  const { data, error } = await supabase.auth.signInWithOtp(userData);

  if (error) {
    console.log(error.code);
    return error.code;
  }

  console.log(data);
}

export async function verifyOTP(formData) {
  const supabase = createClient();
  const userData = {
    phone: "+91" + formData.get("phone"),
    token: formData.get("otp"),
    type: "sms",
  };

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp(userData);

  if (error) {
    return error.code;
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}
