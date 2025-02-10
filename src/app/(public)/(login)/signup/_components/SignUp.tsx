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

  async function onSubmit(data: any) {
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
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-6">
        <h2 className="text-3xl font-bold text-white text-center mb-5">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mb-4">
            <label className="text-white font-semibold block mb-1">First Name</label>
            <input
              className={`w-full px-4 py-2 bg-white/30 backdrop-blur-md text-white border border-transparent rounded-md focus:outline-none focus:ring-2 ${
                errors.firstName ? "focus:ring-red-500" : "focus:ring-blue-300"
              }`}
              {...register("firstName", { required: "First name is required", minLength: 3, maxLength: 15 })}
            />
            {errors.firstName && <p className="text-red-300 text-sm">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="text-white font-semibold block mb-1">Last Name</label>
            <input
              className={`w-full px-4 py-2 bg-white/30 backdrop-blur-md text-white border border-transparent rounded-md focus:outline-none focus:ring-2 ${
                errors.lastName ? "focus:ring-red-500" : "focus:ring-blue-300"
              }`}
              {...register("lastName", { required: "Last name is required", minLength: 3, maxLength: 15 })}
            />
            {errors.lastName && <p className="text-red-300 text-sm">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-white font-semibold block mb-1">Email</label>
            <input
              className={`w-full px-4 py-2 bg-white/30 backdrop-blur-md text-white border border-transparent rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-300"
              }`}
              {...register("email", { required: "Email is required", minLength: 8, maxLength: 35 })}
            />
            {errors.email && <p className="text-red-300 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-white font-semibold block mb-1">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 bg-white/30 backdrop-blur-md text-white border border-transparent rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-blue-300"
              }`}
              {...register("password", { required: "Password is required", minLength: 3, maxLength: 50 })}
            />
            {errors.password && <p className="text-red-300 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {isSubmitting ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center mt-4">
          <Link href="/" className="text-white hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
