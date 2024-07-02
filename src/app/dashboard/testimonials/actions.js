"use server";
import { createClient } from "@/utils/supabase/server";
export async function insertNewTestimonial(formData, uid) {
  const supabase = createClient();
  return new Promise((resolve, reject) => {
    supabase
      .from("testimonials")
      .insert({
        user_id: uid,
        testimonial_author: formData.get("name"),
        testimonial_content: formData.get("testimonial"),
      })
      .select()
      .single()
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export async function fetchTestimonials(uid) {
  const supabase = createClient();
  return new Promise((resolve, reject) => {
    supabase
      .from("testimonials")
      .select()
      .eq("user_id", uid)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
