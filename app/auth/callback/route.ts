import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/lib/database.types";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();

  const code = requestUrl.searchParams.get("code");
  const continueUrl = cookieStore.get("continue")?.value || "/dashboard";

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin.concat(continueUrl));
}
