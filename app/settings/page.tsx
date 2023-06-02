import { Separator } from "@/components/ui/separator";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { APP_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";

export default async function SettingsProfilePage() {
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">user profile</h3>
        <p className="text-sm text-muted-foreground">
          this is how others will see you on {APP_NAME}
        </p>
      </div>
      <Separator />
      <ProfileForm user={session.user} />
    </div>
  );
}
