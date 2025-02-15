import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("authToken")?.value;
  // Redirect logged-in users from '/' to '/dashboard'
  if (
    isLoggedIn &&
    (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/signup")
  ) {
    // console.log("Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect non-logged-in users to '/' (login page)
  if (
    !isLoggedIn &&
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signup", "/input-search", "/dashboard"],
};
