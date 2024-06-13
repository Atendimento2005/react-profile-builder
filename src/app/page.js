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

import { Badge } from "@/components/ui/badge";
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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Profile Builder</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Folder className="h-4 w-4" />
                Projects
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Award className="w-4 h-4" />
                Certificates{" "}
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Testimonials
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <Folder className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Award className="w-4 h-4" />
                  Certificates{" "}
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-4 w-4" />
                  Testimonials
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu className>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full ml-auto"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:bg-red-500 focus:text-slate-50">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center pb-5">
            <h1 className="text-2xl font-bold md:text-3xl">Welcome, Rupa</h1>
          </div>
          <div className="flex flex-col space-y-4 items-center justify-start">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>
                  Imagine you&apos;re introducing yourself at a networking
                  event. What would you say?
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
                <CardDescription>
                  Let us know how to get in touch!
                </CardDescription>
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
      </div>
    </div>
  );
}
