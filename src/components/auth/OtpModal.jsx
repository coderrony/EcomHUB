"use client";
import React, { useState, useEffect } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useToastHook from "@/hook/useToastHook";
import Link from "next/link";
import { emailVerificationExpire } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "../common/Spinner";

function OtpModal({
  setOtpModal,
  otpModal,
  user,
  forgetPassword,
  setForgetOtpVerify,
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(emailVerificationExpire); // 5 minutes in seconds
  const showToast = useToastHook();

  // handle otp verification
  const otpVerification = async () => {
    setLoading(true);
    if (value.length === 6) {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user, // user can be use  {email:example@gmail.com} for forgetPassword or registration user data
          otp: value,
          forgetPassword,
        }),
      });
      const responseData = await res.json();

      // otp not match
      if (responseData.status === 400) {
        setError(responseData?.message);
      }
      if (responseData?.status === 200) {
        if (!forgetPassword) {
          const registerUser = await signIn("credentials", {
            ...responseData?.user,
            isLogin: false,
            redirect: false, // Use `redirect: false` to handle the response manually
          });
          showToast({
            variant: "toastSuccess",
            title: "Welcome to EcomHUB",
            description: responseData?.message,
          });
          router.push("/");
        } else {
          setForgetOtpVerify(true);
        }

        // modal close
        setOtpModal(false);
      }
    } else {
      setError("6 fields must be filled!");
    }
    setLoading(false);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };
  const handleResendOtp = async () => {
    setTimeLeft(emailVerificationExpire); // Reset the timer to 5 minutes
    setValue(""); // Clear the OTP input
    // Add logic to resend the OTP if needed
    const res = await fetch(`/api/auth/otp-sender`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.email, forgetPassword }),
    });
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup timer on unmount
    } else {
      setValue(""); // Reset the InputOTP field when timeLeft reaches 0
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Dialog open={otpModal} onOpenChange={setOtpModal}>
      <DialogContent
        className="sm:max-w-lg bg-gray-200 text-center mx-auto"
        aria-describedby="dialog-description"
      >
        <DialogTitle aria-describedby="dialog-title">
          <h2 className="text-lg text-center font-roboto font-bold">
            {forgetPassword
              ? "Reset Your Account By Email"
              : "Create your EcomHUB Account"}
          </h2>
        </DialogTitle>
        <p className="text-xs text-success">
          Please check your {user?.email} for the verification OTP
        </p>
        <p className="text-sm">To Confirm The Email Enter 6 Digit OTP here</p>
        {error && <p className="text-sm text-danger">{error}</p>}
        <div className="space-y-2 max-w-sm mx-auto">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup className="bg-white shadow-lg">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {timeLeft === 0 ? (
          <button
            className="text-center text-sm text-success"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        ) : (
          <div className="text-center text-sm">
            OTP will expire in: {formatTime(timeLeft)}
          </div>
        )}
        <button
          className={` ${
            loading ? "bg-slate-500" : "bg-black"
          } text-white p-2 px-3 rounded max-w-sm mx-auto text-sm`}
          onClick={otpVerification}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Confirm OTP"}
        </button>
        <p className="text-xs">
          Already have an account?{" "}
          <Link className="text-blue-500" href={"/login"}>
            Sign in
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default OtpModal;
