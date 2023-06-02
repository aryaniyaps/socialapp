"use client";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const signinSchema = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
});

interface SigninFormProps extends React.HTMLAttributes<HTMLFormElement> {}

export function SigninForm({ className, ...props }: SigninFormProps) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "" },
  });

  const supabase = createClientComponentClient();

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    // do something here
    await supabase.auth.signInWithOtp({
      email: values.email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    toast({
      title: "email link sent",
      description: "check your email for a sign in link!",
    });
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-6", className)}
        {...props}
      >
        <div className="grid gap-4">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            sign in with email
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${location.origin}/auth/callback` },
            });
          }}
        >
          <Icons.google className="mr-2 h-4 w-4" /> Google
        </Button>
      </form>
    </Form>
  );
}
