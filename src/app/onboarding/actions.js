"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function onboardUser(formData) {
  const supabase = createClient();

  return new Promise((resolve, reject) => {
    supabase.auth
      .updateUser({
        data: {
          first_name: formData.get("f_name"),
          last_name: formData.get("l_name"),
        },
      })
      .then(({ data }) => {
        const user = data.user;
        supabase
          .from("profiles")
          .upsert({
            id: user.id,
            first_name: formData.get("f_name"),
            last_name: formData.get("l_name"),
          })
          .select()
          .then(() => {
            resolve();
          })
          .catch((error) => {
            console.log("errored");
            console.log(error.code);
            reject(error.code);
          });
      })
      .catch((error) => {
        console.log("errored");
        console.log(error.code);
        reject(error.code);
      });
  });
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
