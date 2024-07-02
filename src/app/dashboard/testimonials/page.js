import { createClient } from "@/utils/supabase/server";
import TestimonialsTable from "@/components/custom/testimonials-table";

export default async function Testimonials() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser().catch((err) => {
    console.log(err);
  });
  
  const { data, error, status } = await supabase
  .from("testimonials")
  .select()
  .eq("user_id", user?.id)


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col space-y-4 items-center justify-start">
          <TestimonialsTable uid={user?.id} testimonials={data}></TestimonialsTable>
      </div>
    </main>
  );
}
