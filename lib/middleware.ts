import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { User } from "./supabase/types/additional.types";
import { getSchoolClasses } from "./supabase/queries";

const intlMiddleware = createMiddleware(routing);

const localeLandingPaths = [
  "/",
  ...routing.locales.map((locale) => `/${locale}`),
];

export async function handleRequest(request: NextRequest, user: User | null) {
  const excludePaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/welcome",
    "/auth/callback",
  ];

  if (
    !user &&
    !excludePaths.some((path) => request.nextUrl.pathname.includes(path)) &&
    !localeLandingPaths.some((path) => request.nextUrl.pathname.endsWith(path))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/de/login`;
    return NextResponse.redirect(url);
  }

  if (user && request.nextUrl.pathname.endsWith("/app")) {
    const schoolClasses = await getSchoolClasses();
    if ((schoolClasses && schoolClasses.length === 0) || !schoolClasses) {
      return NextResponse.redirect(
        new URL(request.nextUrl.pathname + `/new`, request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL(
          request.nextUrl.pathname + `/${schoolClasses[0].id}`,
          request.url
        )
      );
    }
  }

  if (user && request.nextUrl.pathname.endsWith("/app/new")) {
    const schoolClasses = await getSchoolClasses();
    if (schoolClasses && schoolClasses.length > 0) {
      return NextResponse.redirect(
        new URL(
          request.nextUrl.pathname.replace("/new", "") +
            `/${schoolClasses[0].id}`,
          request.url
        )
      );
    }
  }

  return intlMiddleware(request);
}
