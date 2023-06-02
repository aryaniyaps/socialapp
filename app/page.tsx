import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold tracking-tight">{APP_NAME}</h1>
      <h3 className="mt-2">landing page</h3>
      <div className="mt-4">
        {session ? (
          <Link href="/dashboard">
            <Button>dashboard</Button>
          </Link>
        ) : (
          <Link href="/signin">
            <Button>sign in</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
