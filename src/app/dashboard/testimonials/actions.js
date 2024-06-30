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
      .then(() => {
        console.log(formData.get("name"), formData.get("testimonial"));
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
