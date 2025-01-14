import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "../i18n/routing";
import { Database } from "./types/database.types";
import { handleRequest } from "../middleware";
import { User } from "./types/additional.types";

const intlMiddleware = createMiddleware(routing);

export async function updateSession(
  request: NextRequest
): Promise<NextResponse> {
  let intlResponse = intlMiddleware(request);

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          intlResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            intlResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();
  intlResponse = await handleRequest(request, user as unknown as User);

  return intlResponse;
}
