"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { onboardUser } from "./actions";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Onboarding() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      const {
        data: { user },
        error,
      } = res;

      try {
        if (user.user_metadata.first_name && user.user_metadata.last_name) {
          router.push("/dashboard/home");
        }
      } catch (err) {
        console.log(err);
      }
    });
  });

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
                <Label htmlFor="f_name">First name</Label>
                <Input name="f_name" id="f_name"></Input>
              </div>
              <div>
                <Label htmlFor="l_name">Last name</Label>
                <Input name="l_name" id="l_name"></Input>
              </div>
              <div className="flex">
                <Button formAction={onboardUser} className="ml-auto">
                  Update Details
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
