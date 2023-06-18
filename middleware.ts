import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token && req.nextUrl.pathname === "/posts") {
    console.log("you can not do this");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (token && req.nextUrl.pathname.startsWith("/auth")) {
    console.log("you can not do this");
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}


