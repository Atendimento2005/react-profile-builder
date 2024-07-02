"use client";
import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NewTestimonialForm from "@/components/custom/new-testimonial-form";
import { deleteTestimonial } from "@/app/dashboard/testimonials/actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function TestimonialsTable({ uid, testimonials}) {
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const updateTestimonials = (data) => {
    setTestimonialsList([...testimonialsList, data]);
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-500">Testimonials</CardTitle>
          <CardDescription>Show off your reviews here!</CardDescription>
        </CardHeader>
        <CardContent className="items-center justify-center">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5rem]">Sl No.</TableHead>
                <TableHead className="w-[8rem]">Name</TableHead>
                <TableHead >Testimonial</TableHead>
                <TableHead className="w-[4rem]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonialsList.map((testimonial, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{testimonial.testimonial_author}</TableCell>
                  <TableCell>{testimonial.testimonial_content}</TableCell>
                  <TableCell><Button onClick={() => {
                    deleteTestimonial(testimonial.id).then(() => {
                      setTestimonialsList(testimonialsList.filter((t) => t.id !== testimonial.id));
                    });
                  }} className="bg-red-500 text-sm aspect-square"><Trash2 className="h-5"/></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <NewTestimonialForm uid={uid} updateTestimonials={updateTestimonials}></NewTestimonialForm>
    </>
  );
}
