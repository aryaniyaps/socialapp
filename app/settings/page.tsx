import { Separator } from "@/components/ui/separator";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { APP_NAME } from "@/lib/constants";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { ProfileForm } from "./profile-form";

export default async function SettingsProfilePage() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // load user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session!.user.id)
    .single();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">user profile</h3>
        <p className="text-sm text-muted-foreground">
          this is how others will see you on {APP_NAME}
        </p>
      </div>
      <Separator />
      <ProfileForm user={session!.user} profile={profile!} />
    </div>
  );
}
