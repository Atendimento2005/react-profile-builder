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
import NewTestimonialForm from "@/components/custom/new-testimonial-form";
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
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Testimonial</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonialsList.map((testimonial, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{testimonial.testimonial_author}</TableCell>
                  <TableCell>{testimonial.testimonial_content}</TableCell>
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
