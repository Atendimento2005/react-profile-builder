"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function onboardUser(formData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    data: {
      first_name: formData.get("f_name"),
      last_name: formData.get("l_name"),
    },
  });

  if (error) {
    console.log(error.code);
    return error.code;
  }

  if (data) {
    redirect("/dashboard/home");
  }
}

export async function checkUserInfo() {
  const supabase = createClient();

  return new Promise(async (resolve, reject) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.log(error);
      reject(error);
    }

    resolve(user);
  });
}
