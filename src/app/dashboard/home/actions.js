"use server";

import { createClient } from "@/utils/supabase/server";

export async function uploadAvatar(file) {
  console.log(file);
}

export async function updateUserData(values) {
  const supabase = await createClient();

  return new Promise(async (resolve, reject) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.log(error);
      reject(error);
    }

    if (user?.id) {
      values["user_id"] = user?.id;
    } else {
      console.log("No user found");
      reject("No User found");
    }

    supabase
      .from("user_data")
      .upsert(values)
      .select()
      .then((res) => {
        console.log(res)
        resolve();
      })
      .catch((error) => {
        console.log("errored");
        console.log(error.code);
        reject(error.code);
      });
  });
}
