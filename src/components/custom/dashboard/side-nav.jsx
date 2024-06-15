"use client";
import Link from "next/link";
import { Home, Folder, Award, Users, Eye, Menu, Package2 } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function SideNav() {
  const [activeTab, setActiveTab] = useState("HOME");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
  );
}
