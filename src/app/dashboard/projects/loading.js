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
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col space-y-4 items-center justify-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-red-500">
              <Skeleton className="w-72 h-6"></Skeleton>
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-80 h-4"></Skeleton>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
            <Skeleton className="container max-w-xs aspect-video"></Skeleton>
            <Skeleton className="container max-w-xs aspect-video"></Skeleton>
            <Skeleton className="container max-w-xs aspect-video"></Skeleton>
          </CardContent>
        </Card>
        <Button className="bg-red-500">Update Profile</Button>
      </div>
    </main>
  );
}
