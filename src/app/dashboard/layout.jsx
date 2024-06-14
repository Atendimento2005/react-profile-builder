"use client";
import Link from "next/link";
import {
  CircleUser,
  Home,
  Menu,
  Package2,
  Users,
  Folder,
  Award,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState("HOME");

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
                href="/dashboard/home"
                className={"flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ".concat(
                  activeTab === "HOME"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
                onClick={() => setActiveTab("HOME")}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/dashboard/projects"
                className={"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ".concat(
                  activeTab === "PROJECTS"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
                onClick={() => setActiveTab("PROJECTS")}
              >
                <Folder className="h-4 w-4" />
                Projects
              </Link>
              <Link
                href="/dashboard/certificates"
                className={"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ".concat(
                  activeTab === "CERTIFICATES"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
                onClick={() => setActiveTab("CERTIFICATES")}
              >
                <Award className="w-4 h-4" />
                Certificates{" "}
              </Link>
              <Link
                href="/dashboard/testimonials"
                className={"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ".concat(
                  activeTab === "TESTIMONIALS"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                )}
                onClick={() => setActiveTab("TESTIMONIALS")}
              >
                <Users className="h-4 w-4" />
                Testimonials
              </Link>
              <Link
                href="/preview"
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
                  href="/dashboard/home"
                  className={"mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ".concat(
                    activeTab === "HOME"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setActiveTab("HOME")}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  href="/dashboard/projects"
                  className={"mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ".concat(
                    activeTab === "PROJECTS"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setActiveTab("PROJECTS")}
                >
                  <Folder className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  href="/dashboard/certificates"
                  className={"mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ".concat(
                    activeTab === "CERTIFICATES"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setActiveTab("CERTIFICATES")}
                >
                  <Award className="w-4 h-4" />
                  Certificates{" "}
                </Link>
                <Link
                  href="/dashboard/testimonials"
                  className={"mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ".concat(
                    activeTab === "TESTIMONIALS"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setActiveTab("TESTIMONIALS")}
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
        {children}
      </div>
    </div>
  );
}
