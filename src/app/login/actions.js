"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData) {
  const supabase = createClient();

  const userData = {
    phone: "+91" + formData.get("phone"),
  };

  const { data, error } = await supabase.auth.signInWithOtp(userData);

  if (error) {
    console.log("Error in login");
    redirect("error");
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

  console.log(userData);

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp(userData);

  if (error) {
    console.log("Error in OTP");
    redirect("/error");
  }

  console.log(session);
  redirect("/onboarding");
}
