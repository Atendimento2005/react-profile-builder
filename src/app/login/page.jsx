"use client";
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { sendOTP, verifyOTP, redirectHome } from "./actions";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    console.log("fetching user info...");
    const supabase = createClient();
    supabase.auth
      .getUser()
      .then((res) => {
        const {
          data: { user },
        } = res;
        if (user) {
          // redirectHome();
          console.log("redirecting...");
          // redirect("/dashboard/home");
          router.push("/dashboard/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allowInput, setAllowInput] = useState(true);
  const [broadcast, setBroadcast] = useState({}); //{status: "success|error", "message":"message"}

  const handleOTPSend = async (formData) => {
    await sendOTP(formData).then((errorCode) => {
      setIsLoading(false);
      setAllowInput(true);
      if (errorCode) {
        setBroadcast({ status: "error", message: errorCode });
      } else {
        setOtpSent(true);
        setBroadcast({});
      }
    });
  };

  const handleOTPVerify = async (formData) => {
    await verifyOTP(formData).then((errorCode) => {
      setIsLoading(false);
      setAllowInput(true);
      if (errorCode) {
        if (errorCode === "otp_expired") {
          setBroadcast({
            status: "error",
            message: "OTP invalid or expired! Please try again.",
          });
        }
      } else {
        setBroadcast({
          status: "success",
          message: "You've been logged in! Redirecting shortly...",
        });
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <Card className="w-1/3 min-w-80 ">
        <CardHeader className="space-y-4">
          <CardTitle>Login</CardTitle>
          <Separator></Separator>
        </CardHeader>
        <CardContent>
          <form className="space-y-2">
            <div
              className={"flex flex-row items-end justify-start ".concat(
                otpSent ? "hidden" : "",
              )}
            >
              <div className="mr-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="tel" id="phone" name="phone"></Input>
              </div>
              <Button
                disabled={!allowInput}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setAllowInput(false), 50);
                }}
                formAction={handleOTPSend}
                className="w-24"
              >
                {isLoading ? (
                  <LoaderCircle width={20} className="animate-spin" />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
            <div
              className={"flex flex-row items-end justify-start ".concat(
                otpSent ? "" : "hidden",
              )}
            >
              <div className="mr-4">
                <Label htmlFor="otp">OTP</Label>
                <Input type="password" id="otp" name="otp"></Input>
              </div>
              <Button
                formAction={handleOTPVerify}
                disabled={!allowInput}
                className="w-24"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setAllowInput(false), 50);
                }}
              >
                {isLoading ? (
                  <LoaderCircle width={20} className="animate-spin" />
                ) : (
                  "Verify OTP"
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
