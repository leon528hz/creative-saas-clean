// app/dashboard/signout/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Sign the current user out (server action via /dashboard/signout).
 * Redirect back to the home page afterwards.
 */
export async function POST() {
  const cookieStore = cookies();

  // Create a server-side Supabase client that can read/write auth cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: any) {
          cookieStore.set(name, "", options);
        }
      }
    }
  );

  // Sign out the user
  await supabase.auth.signOut();

  // Redirect home
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return NextResponse.redirect(new URL("/", base));
}
