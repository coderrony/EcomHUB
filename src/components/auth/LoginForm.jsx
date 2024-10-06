"use client";
import useToastHook from "@/hook/useToastHook";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../common/Spinner";
import { useRouter } from "next/navigation";

function LoginForm({ setIsForgetPassword }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const router = useRouter();
  const showToast = useToastHook();

  const { email, password } = errors;

  const handleLogin = async (data) => {
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        ...data,
        isLogin: true,
        redirect: false,
      });

      if (res.error) {
        showToast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid credentials",
        });
      } else {
        showToast({
          variant: "toastSuccess",
          title: "Great to See",
          description: "Login successful",
        });
        // Redirect or handle successful login
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      showToast({
        variant: "destructive",
        title: "Login Failed",
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
      <div className="space-y-2">
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
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password Field is Required!",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            name="password"
            id="password"
            className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 ${
              password?.message && "border-primary border-2"
            }`}
            placeholder="*******"
          />
          {password?.message && (
            <p className="text-xs mt-2 ml-1 text-primary">{password.message}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <button
          className="text-primary"
          onClick={() => setIsForgetPassword(true)}
        >
          Forgot password
        </button>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className={`block w-full py-2 text-center text-white border rounded  ${
            loading
              ? "bg-slate-500"
              : "bg-primary border-primary hover:text-primary hover:bg-transparent"
          }  transition uppercase font-roboto font-medium`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
