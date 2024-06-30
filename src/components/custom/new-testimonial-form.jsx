"use client";
import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { insertNewTestimonial } from "@/app/dashboard/testimonials/actions";

export default function NewTestimonialForm({ uid }) {
  const [loading, setLoading] = useState(false);
  const [allowInput, setAllowInput] = useState(true);
  const [open, setOpen] = useState(false);

  const handleNewTestimonial = (formData) => {
    insertNewTestimonial(formData, uid).then(() => {
      setLoading(false);
      setAllowInput(true);
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500">Add new testimonial</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new testimonial</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" placeholder="Name" id="name" name="name"></Input>
          </div>
          <div>
            <Label htmlFor="testimonial">Testimonial</Label>
            <Textarea
              placeholder="Testimonial"
              id="testimonial"
              name="testimonial"
            ></Textarea>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <DialogClose asChild>
              <Button className="w-28">Cancel</Button>
            </DialogClose>
            <Button
              className="w-28"
              onClick={() => {
                setLoading(true);
                setTimeout(() => setAllowInput(false), 50);
              }}
              disabled={!allowInput}
              formAction={handleNewTestimonial}
            >
              {loading ? (
                <LoaderCircle width={20} className="animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
