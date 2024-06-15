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
    console.log("Error on update user");
    redirect("/error");
  }

  console.log(data);
}
