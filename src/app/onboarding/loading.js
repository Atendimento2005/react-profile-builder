import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen w-full container flex flex-row items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Let&apos;s get to know you better!</CardTitle>
          <CardDescription className="text-muted-foreground text-xs">
            Enter the following details to setup your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div>
                <Skeleton className="h-6 w-full"></Skeleton>
              </div>
              <div>
                <Skeleton className="h-6 w-full"></Skeleton>
              </div>
              <div>
                <Skeleton className="h-6 w-72"></Skeleton>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
