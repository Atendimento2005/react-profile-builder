"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import UserAvatar from "@/components/custom/dashboard/user-avatar";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState, useEffect } from "react";
import {z} from "zod";

import { updateUserData } from "@/app/dashboard/home/actions";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  bio: z.string().optional(),
  usp: z.string().optional(),
  experience: z.coerce.number().optional(),
  education: z.string().optional(),
  company: z.string().optional(),
  "company_desc": z.string().optional(),
  cities: z.string().optional().transform((value) => value.split(",").map((city) => city.trim())),
  contact_no: z.string().optional().refine((value) => !value || /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value), {
    message: "Invalid phone number format",
  }).transform((value) => value.replace(/\D/g, "")),
  email: z.string().optional(),
  whatsapp_no: z.string().optional().refine((value) => !value || /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value), {
    message: "Invalid phone number format",
  }).transform((value) => value.replace(/\D/g, "")),
  facebook_url: z.string().optional().refine((value) => !value || /https?:\/\//.test(value), {
    message: "Invalid URL format",
  }),
  instagram_url: z.string().optional().refine((value) => !value || /https?:\/\//.test(value), {
    message: "Invalid URL format",
  }),
  twitter_url: z.string().optional().refine((value) => !value || /https?:\/\//.test(value), {
    message: "Invalid URL format",
  }),
  linkedin_url: z.string().optional().refine((value) => !value || /https?:\/\//.test(value), {
    message: "Invalid URL format",
  }),
});

export default function HomeForm({ data, uid}) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: data?.user_data?.bio ?? "",
      usp: data?.user_data?.usp ?? "",
      experience: data?.user_data?.experience ?? "",
      education: data?.user_data?.education ?? "",
      company: data?.user_data?.company ?? "",
      "company_desc": data?.user_data?.company_desc ?? "",
      cities: data?.user_data?.cities?.join(", ") ?? [],
      contact_no: (data?.user_data?.contact_no && data?.user_data?.contact_no !== "") ? "+" + data?.user_data?.contact_no : "",
      email: data?.user_data?.email ?? "",
      whatsapp_no: (data?.user_data?.whatsapp_no && data?.user_data?.whatsapp_no !== "") ? "+" + data?.user_data?.whatsapp_no : "",
      facebook_url: data?.user_data?.facebook_url ?? "",
      instagram_url: data?.user_data?.instagram_url ?? "",
      twitter_url: data?.user_data?.twitter_url ?? "",
      linkedin_url: data?.user_data?.linkedin_url ?? ""

    }
  })

  const {handleSubmit, formState: { isSubmitting }} = form

  const onSubmit = async (values) => {
    await updateUserData(values).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div className="flex flex-col w-full items-center md:flex-row">
        <UserAvatar uid={uid} url={data?.avatar_url}></UserAvatar>
        <Card className="w-full h-72">
          <CardHeader>
            <CardTitle className="text-red-500">Cover Image</CardTitle>
            <CardDescription>
              Choose a background for your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
               <Image alt="banner-img" width={100} height={200} src="/banner.jpg"></Image>

            </div>
          </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 items-center justify-start">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-red-500">About Me</CardTitle>
              <CardDescription>
                Imagine you&apos;re introducing yourself at a networking event.
                What would you say?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="bio"
                render = {({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="bio">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        id="bio"
                        placeholder="Tell us a little bit about yourself"
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
              )}/>
              <FormField
                control={form.control}
                name="usp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="usp">
                      What sets you apart?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="usp"
                        placeholder="Explain the core benefit you deliver to your customers that no competitor can replicate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="experience">Years of experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="How many years have you worked in this field?"
                        id="experience"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-red-500">Work Experience</CardTitle>
              <CardDescription>
                Spill the beans. Tell us about your professional journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="education">Education</FormLabel>
                    <FormControl>
                      <Textarea
                        id="education"
                        placeholder="Outline your educational background, highlighting your alma mater and field of study"
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="company">Company name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Where do you work?"
                        id="company"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="company_desc">
                      Describe your workplace
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="company_desc"
                        placeholder="Tell us what it feels like to work at your company"
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="cities">
                      Cities you have worked in
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="cities"
                        placeholder="Share the cities you have called your work home. "
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Separate each one with comma.
                      (e.g., Kolkata, Delhi, Mumbai, ...)
                    </p>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-red-500">Contact Details</CardTitle>
              <CardDescription>Let us know how to get in touch!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="contact_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="contact_no">Contact No.</FormLabel>
                    <FormControl>
                      <Input type="text" id="contact_no" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input type="email" id="email" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="whatsapp_no">Whatsapp No.</FormLabel>
                    <FormControl>
                      <Input type="text" id="whatsapp_no" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="facebook_url">Facebook Profile</FormLabel>
                    <FormControl>
                      <Input type="url" id="facebook_url" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="instagram_url">Instagram Profile</FormLabel>
                    <FormControl>
                      <Input type="url" id="instagram_url" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitter_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="twitter_url">Twitter Profile</FormLabel>
                    <FormControl>
                      <Input type="url" id="twitter_url" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="linkedin_url">Linkedin Profile</FormLabel>
                    <FormControl>
                      <Input id="linkedin_url" {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card> 
          <Button className="bg-red-500 w-32" type="submit" disabled={isSubmitting}>{isSubmitting ? (<LoaderCircle className="animate-spin"/>): "Update Profile"}</Button>
        </form>
      </Form >
    </>
  );
}

