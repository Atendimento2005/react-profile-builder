import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
export default function loading() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center pb-5">
        <Skeleton className="w-80 h-8"></Skeleton>
      </div>
      <div className="flex flex-col w-full items-center md:flex-row">
        <Skeleton className="h-52 md:h-56 lg:h-64 aspect-square rounded-full my-5 md:mx-5 lg:mx-10 outline outline-red-500 outline-3"></Skeleton>
        <Card className="w-full h-72">
          <CardHeader>
            <CardTitle className="text-red-500">
              <Skeleton className="w-72 h-6"></Skeleton>
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-80 h-4"></Skeleton>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Skeleton className="h-6 w-full"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-12 w-full"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-8 w-full"></Skeleton>
            </div>
          </CardContent>
        </Card>
      </div>
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
          <CardContent className="space-y-4">
            <div>
              <Skeleton className="h-6 w-full"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-12 w-full"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-8 w-full"></Skeleton>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-red-500">
              <Skeleton className="w-72 h-6"></Skeleton>
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-80 h-4"></Skeleton>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Skeleton className="h-6 w-full"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-12 w-full"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-8 w-full"></Skeleton>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-red-500">
              <Skeleton className="w-72 h-6"></Skeleton>
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-80 h-4"></Skeleton>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Skeleton className="h-6 w-full"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-12 w-full"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-8 w-full"></Skeleton>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
