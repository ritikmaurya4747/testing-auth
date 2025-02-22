"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 200) {
        toast.success("🎉 User registered successfully!");
        reset();
        router.push("/");
      } else {
        toast.error(result.message || "❌ User already exists!");
      }
    } catch (error) {
      toast.error("⚠️ Something went wrong!");
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 to-purple-500">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              First Name
            </label>
            <input
              className={`w-full px-4 py-2 bg-gray-100 text-gray-900 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500`}
              {...register("firstName", {
                required: "First name is required",
                minLength: 3,
                maxLength: 15,
              })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Last Name
            </label>
            <input
              className={`w-full px-4 py-2 bg-gray-100 text-gray-900 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500`}
              {...register("lastName", {
                required: "Last name is required",
                minLength: 3,
                maxLength: 15,
              })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">Email</label>
            <input
              className={`w-full px-4 py-2 bg-gray-100 text-gray-900 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500`}
              {...register("email", {
                required: "Email is required",
                minLength: 8,
                maxLength: 35,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 bg-gray-100 text-gray-900 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500`}
              {...register("password", {
                required: "Password is required",
                minLength: 3,
                maxLength: 50,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            {isSubmitting ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center mt-5">
          <Link href="/" className="text-gray-700 hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
