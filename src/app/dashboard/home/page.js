import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Folder,
  Award,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center pb-5">
        <h1 className="text-2xl font-bold md:text-3xl">Welcome, Rupa</h1>
      </div>
      <div className="flex flex-col space-y-4 items-center justify-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
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
            <CardTitle>Work Experience</CardTitle>
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
            <CardTitle>Contact Details</CardTitle>
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
        <Button>Update Profile</Button>
      </div>
    </main>
  );
}
