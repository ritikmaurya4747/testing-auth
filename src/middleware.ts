import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  // console.log("Auth Token:", authToken);

  const loggedUserNotAccessible =
    request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/signup";
    if(loggedUserNotAccessible){
        if(authToken){
           return NextResponse.redirect(new URL("/dashboard",request.url))
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signup", "/input-search", "/dashboard"],
};
