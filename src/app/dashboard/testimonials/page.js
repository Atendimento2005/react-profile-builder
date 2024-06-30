import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/server";
import TestimonialsTable from "@/components/custom/testimonials-table";
import NewTestimonialForm from "@/components/custom/new-testimonial-form";

export default async function Testimonials() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser().catch((err) => {
    console.log(err);
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col space-y-4 items-center justify-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-red-500">Testimonials</CardTitle>
            <CardDescription>Show off your reviews here!</CardDescription>
          </CardHeader>
          <CardContent className="items-center justify-center">
            <TestimonialsTable uid={user?.id}></TestimonialsTable>
          </CardContent>
        </Card>
        <NewTestimonialForm uid={user?.id}></NewTestimonialForm>
      </div>
    </main>
  );
}
