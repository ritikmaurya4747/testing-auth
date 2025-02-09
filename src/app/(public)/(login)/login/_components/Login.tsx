"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const Login = () => {
  const [isClient, setIsClient] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Ensure router only works on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();

  async function onSubmit(data: FormValues) {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid email or password! ");
    } else {
      toast.success("Login Successful! ");
      router.push("/");
    }
    reset();
  }
  if (!isClient) return null;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-pink-500 focus:ring-pink-500"
                : "border-gray-300 focus:ring-pink-500"
            }`}
          />
          {errors.email && (
            <p className="text-pink-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum length should be 6 characters",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
              errors.password
                ? "border-pink-500 focus:ring-pink-500"
                : "border-gray-300 focus:ring-pink-500"
            }`}
          />
          {errors.password && (
            <p className="text-pink-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200"
        >
          Login
        </button>
      </form>
      <div className="text-center mt-4">
        <Link href="/signup" className="text-pink-500 hover:underline">
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;