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
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser().then(console.log("fetched user data!"));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center pb-5">
        <h1 className="text-2xl font-bold md:text-3xl">
          Welcome,{" "}
          <span className="text-red-500">{user.user_metadata.first_name}</span>
        </h1>
      </div>
      <div className="flex flex-col w-full items-center md:flex-row">
        <Skeleton className="h-52 md:h-56 lg:h-64 aspect-square rounded-full my-5 md:mx-5 lg:mx-10 outline outline-red-500 outline-3"></Skeleton>
        <Card className="w-full h-72">
          <CardHeader>
            <CardTitle className="text-red-500">Cover Image</CardTitle>
            <CardDescription>
              Choose a background for your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div></div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col space-y-4 items-center justify-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-red-500">About Me</CardTitle>
            <CardDescription>
              Imagine you&apos;re introducing yourself at a networking event.
              What would you say?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a little bit about yourself"
              ></Textarea>
            </div>
            <div>
              <Label htmlFor="usp">What sets you apart?</Label>
              <Textarea
                id="usp"
                placeholder="Explain the core benefit you deliver to your customers that no competitor can replicate"
              ></Textarea>
            </div>
            <div>
              <Label htmlFor="experience">Years of experience</Label>
              <Input
                type="number"
                placeholder="How many years have you worked in this field?"
                id="experience"
              ></Input>
            </div>
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
            <div>
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                placeholder="Outline your educational background, highlighting your alma mater and field of study"
              ></Textarea>
            </div>
            <div>
              <Label htmlFor="company">Company name</Label>
              <Input
                type="text"
                placeholder="Where do you work?"
                id="company"
              ></Input>
            </div>
            <div>
              <Label htmlFor="company-desc">Describe your workplace</Label>
              <Textarea
                id="company-desc"
                placeholder="Tell us what it feels like to work at your company"
              ></Textarea>
            </div>
            <div>
              <Label htmlFor="cities">Cities you have worked in</Label>
              <Textarea
                id="cities"
                placeholder="Share the cities you have called your work home. "
              ></Textarea>
              <p className="text-xs text-muted-foreground">
                Separate each one with comma.
                (e.g.,&nbsp;Kolkata,&nbsp;Delhi,&nbsp;Mumbai, ...)
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-red-500">Contact Details</CardTitle>
            <CardDescription>Let us know how to get in touch!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contact">Contact No.</Label>
              <Input type="text" id="contact"></Input>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email"></Input>
            </div>
            <div>
              <Label htmlFor="whatsapp">Whatsapp No.</Label>
              <Input type="text" id="whatsapp"></Input>
            </div>
            <div>
              <Label htmlFor="facebook">Facebook Profile</Label>
              <Input type="url" id="facebook"></Input>
            </div>
            <div>
              <Label htmlFor="instagram">Instagram Profile</Label>
              <Input type="url" id="instagram"></Input>
            </div>
            <div>
              <Label htmlFor="twitter">Twitter Profile</Label>
              <Input type="url" id="twitter"></Input>
            </div>
            <div>
              <Label htmlFor="linkedin">Linkedin Profile</Label>
              <Input type="url" id="linkedin"></Input>
            </div>
          </CardContent>
        </Card>
        <Button className="bg-red-500">Update Profile</Button>
      </div>
    </main>
  );
}
