import { APP_NAME } from "@/lib/constants";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SignOut from "./sign-out";

export const metadata: Metadata = {
  title: `${APP_NAME} dashboard`,
  description: "dashboard page",
};

export default async function Dashboard() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/signin");
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold tracking-tight">{APP_NAME}</h1>
      <h3 className="mt-2">dashboard page</h3>
      <SignOut />
    </div>
  );
}
