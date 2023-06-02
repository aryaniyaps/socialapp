import { MainNav } from "@/app/dashboard/components/main-nav";
import { UserNav } from "@/app/dashboard/components/user-nav";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="w-full min-h-screen flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 mx-6">
          <MainNav />
          <div className="ml-auto flex justify-center items-center gap-6">
            <Button variant="ghost" className="flex items-center gap-2">
              <Plus size={20} />
              new post
            </Button>
            <UserNav user={session.user} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
