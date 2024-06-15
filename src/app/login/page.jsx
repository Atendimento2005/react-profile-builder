"use client";
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

import { login, verifyOTP } from "./actions";
import { useState } from "react";

export default function Login() {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen w-full container flex flex-col justify-center items-center">
      <Card className="w-1/3 min-w-80 ">
        <CardHeader className="space-y-4">
          <CardTitle>Login</CardTitle>
          <Separator></Separator>
        </CardHeader>
        <CardContent>
          <form>
            <div
              className={"flex flex-row items-end justify-start ".concat(
                otpSent ? "hidden" : "",
              )}
            >
              <div className="mr-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="tel" id="phone" name="phone"></Input>
              </div>
              <Button onClick={() => setOtpSent(true)} formAction={login}>
                Send OTP
              </Button>
            </div>
            <div
              className={"flex flex-row items-end justify-center ".concat(
                otpSent ? "" : "hidden",
              )}
            >
              <div className="mr-4">
                <Label htmlFor="otp">OTP</Label>
                <Input type="password" id="otp" name="otp"></Input>
              </div>
              <Button formAction={verifyOTP}>Verify OTP</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
