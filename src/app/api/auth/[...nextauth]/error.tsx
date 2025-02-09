import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const router = useRouter();
  const { error } = router.query; // Get the error message from the URL

  const errorMessages: Record<string, string> = {
    Configuration: "Authentication is not configured properly.",
    AccessDenied: "You do not have permission to access this resource.",
    Verification: "Email verification failed or expired.",
    Default: "An unknown error occurred. Please try again.",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
        <p className="mt-3 text-gray-600">
          {errorMessages[error as string] || errorMessages.Default}
        </p>

        <div className="mt-6">
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
