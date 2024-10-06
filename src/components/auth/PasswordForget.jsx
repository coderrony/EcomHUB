"use client";
import { useForm } from "react-hook-form";
import Spinner from "../common/Spinner";
import { useState } from "react";
import { foundUser } from "@/app/actions";

function PasswordForget({ setOtpModal, setIsForgetPassword, setUser }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { email } = errors;

  const handleForgetPassword = async (data) => {
    setLoading(true);
    const getUser = await foundUser(data?.email);

    if (getUser) {
      setUser({ email: data?.email });
      // otp send
      const res = await fetch(`/api/auth/otp-sender`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data?.email, forgetPassword: true }),
      });

      const responseData = await res.json();

      if (responseData?.status === 201) {
        setIsForgetPassword(false);
        // Trigger the OTP modal
        setOtpModal(true);
      }
    } else {
      setError("email", {
        type: "manual",
        message: "Email address are invalid",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleForgetPassword)}>
      <h2 className="text-xl uppercase font-medium mb-1">
        Reset Password By Email
      </h2>
      <div>
        <label htmlFor="email" className="text-gray-600 mb-2 block">
          Email address
        </label>
        <input
          {...register("email", {
            required: "Email Field is Required!",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          type="email"
          name="email"
          id="email"
          className={`block w-full px-4 py-3 text-gray-600 text-sm rounded placeholder-gray-400 ${
            email?.message && "border-primary border-2"
          }`}
          placeholder="youremail.@domain.com"
        />
        {email?.message && (
          <p className="text-xs mt-2 ml-1 text-primary">{email.message}</p>
        )}
      </div>
      <button
        className="text-primary pt-2"
        onClick={() => setIsForgetPassword(false)}
      >
        Login
      </button>
      <div className="mt-4">
        <button
          type="submit"
          className={`block w-full py-2 text-center text-white border rounded  ${
            loading
              ? "bg-slate-500"
              : "bg-primary border-primary hover:text-primary hover:bg-transparent"
          }  transition uppercase font-roboto font-medium`}
        >
          {loading ? <Spinner /> : "Reset Password"}
        </button>
      </div>
    </form>
  );
}

export default PasswordForget;
