"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <Button
      className="mt-4"
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      sign out
    </Button>
  );
}
