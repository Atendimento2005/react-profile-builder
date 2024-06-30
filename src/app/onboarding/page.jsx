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
import { onboardUser, checkUserInfo } from "./actions";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Onboarding() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [allowInput, setAllowInput] = useState(true);
  const [broadcast, setBroadcast] = useState({}); //{status: "success|error", "message":"message"}

  useEffect(() => {
    console.log("checking");
    checkUserInfo()
      .then((user) => {
        if (user.user_metadata.first_name && user.user_metadata.last_name) {
          router.push("/dashboard/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  const handleOnboard = (formData) => {
    onboardUser(formData)
      .then(() => {
        setBroadcast({
          status: "success",
          message: "Updated sucessfully! Redirecting...",
        });
        router.push("/dashboard/home");
      })
      .catch((errorCode) => {
        setBroadcast({ status: "error", message: errorCode });
      })
      .finally(() => {
        setIsLoading(false);
        setAllowInput(true);
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
                  className="ml-auto w-36"
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
