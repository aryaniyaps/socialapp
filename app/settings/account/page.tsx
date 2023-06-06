import { Separator } from "@/components/ui/separator";

import { auth } from "@/lib/firebase";
import { AccountForm } from "./account-form";

export default async function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">user account</h3>
        <p className="text-sm text-muted-foreground">
          manage your user account
        </p>
      </div>
      <Separator />
      <AccountForm user={auth.currentUser!} />
    </div>
  );
}
