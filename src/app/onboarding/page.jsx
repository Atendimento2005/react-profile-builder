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
import { LoaderCircle } from "lucide-react";
import { onboardUser } from "./actions";

import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Onboarding() {
  const supabase = createClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [allowInput, setAllowInput] = useState(true);
  const [broadcast, setBroadcast] = useState({}); //{status: "success|error", "message":"message"}

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

  const handleOnboard = (formData) => {
    onboardUser(formData).then((errorCode) => {
      setIsLoading(false);
      setAllowInput(true);
      if (errorCode) {
        setBroadcast({ status: "error", message: errorCode });
      } else {
        setBroadcast({});
      }
    });
  };

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
                <Button
                  formAction={handleOnboard}
                  disabled={!allowInput}
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setAllowInput(false), 50);
                  }}
                  className="ml-auto w-24"
                >
                  {isLoading ? (
                    <LoaderCircle width={20} className="animate-spin" />
                  ) : (
                    "Update details"
                  )}
                </Button>
              </div>
              {broadcast ? (
                <p
                  className={"text-sm ".concat(
                    broadcast.status === "error" ? "text-red-600" : null,
                  )}
                >
                  {broadcast.message}
                </p>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
