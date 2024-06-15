"use client";
import Link from "next/link";
import { Home, Folder, Award, Users, Eye } from "lucide-react";
import { useState } from "react";

export default function SideNavMd() {
  const [activeTab, setActiveTab] = useState("HOME");
  return (
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
  );
}
