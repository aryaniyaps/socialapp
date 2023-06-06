"use client";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

interface SocialLoginProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SocialLogin({ className, ...props }: SocialLoginProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={async () => {
          const provider = new GoogleAuthProvider();
          await signInWithRedirect(auth, provider);
          // await supabase.auth.signInWithOAuth({
          //   provider: "google",
          //   options: {
          //     redirectTo: `${location.origin}/auth/callback/`,
          //   },
          // });
        }}
      >
        <Icons.google className="mr-2 h-4 w-4" /> Google
      </Button>
    </>
  );
}
