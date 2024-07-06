"use server";

import { createClient } from "@/utils/supabase/server";

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
        console.log(res);
        resolve();
      })
      .catch((error) => {
        console.log("errored");
        console.log(error.code);
        reject(error.code);
      });
  });
}

export async function changeBanner(num) {
  const supabase = await createClient();

  return new Promise(async (resolve, reject) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    supabase
      .from("user_data")
      .upsert({ user_id: user?.id, banner: num })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export async function fetchBanner() {
  const supabase = await createClient();
  return new Promise(async (resolve, reject) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    supabase
      .from("user_data")
      .select("banner")
      .eq("user_id", user?.id)
      .then(({ data }) => {
        resolve(data[0].banner);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
