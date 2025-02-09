"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const SignUp = () => {
  const [formData, setFormData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  async function onSubmit(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      // api call to register  user
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fixed typo here
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 200) {
        toast.success("User registered successfully! 🎉");
        setFormData(result);
        reset();
      } else {
        toast.error(data.message || "User Already exist! ❌");
        // console.error(result);
      }
    } catch (error) {
      toast.error("Something went wrong! ⚠️");
      // console.error(error);
    }
  }
  return (
    <div className="flex justify-center items-center py-2 bg-gray-100">
      <div className="w-full max-w-md px-5 py-2 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } `}
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 3,
                  message: "minimum length atleast 3 is required",
                },
                maxLength: {
                  value: 15,
                  message: "maximum length 15 not exceed",
                },
              })}
            />
            {errors.firstName && (
              <p className="text-red-600 font-semibold">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } `}
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 3,
                  message: "minimum length atleast 3 is required",
                },
                maxLength: {
                  value: 15,
                  message: "maximum length 15 not exceed",
                },
              })}
            />
            {errors.lastName && (
              <p className="text-red-600 font-semibold">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } `}
              {...register("email", {
                required: "Email  is required",
                minLength: {
                  value: 8,
                  message: "minimum length atleast 8 is required",
                },
                maxLength: {
                  value: 35,
                  message: "maximum length 50 not exceed",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } `}
              {...register("password", {
                required: "Password  is required",
                minLength: {
                  value: 8,
                  message: "minimum length atleast 8 is required",
                },
                maxLength: {
                  value: 50,
                  message: "maximum length 50 not exceed",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 font-semibold">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            {isSubmitting ? "wait form is Submitting" : "Sign Up"}
          </button>{" "}
        </form>
        <div className="text-center mt-4">
          <Link href="/login" className="text-pink-500 hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;