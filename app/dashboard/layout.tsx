import { UserNav } from "@/app/dashboard/user-nav";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 mx-6">
          <h1 className="font-semibold">{APP_NAME}</h1>
          <div className="ml-auto flex justify-center items-center gap-6">
            <Button variant="ghost" className="flex items-center gap-2">
              <Plus size={20} />
              new post
            </Button>
            <UserNav user={session!.user} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
