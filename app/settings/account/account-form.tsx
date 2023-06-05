"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/lib/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileSchema = z.object({
  email: z
    .string({ required_error: "please enter your email" })
    .email({ message: "please enter a valid email" }),
});

interface AccountFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

export function AccountForm({ user, className, ...props }: AccountFormProps) {
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user.email,
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const { data } = await supabase.auth.updateUser(
      { email: values.email },
      { emailRedirectTo: "" }
    );

    await supabase.auth.refreshSession;

    form.reset({
      email: data.user!.email,
    });

    toast({
      title: "confirmation link sent",
      description:
        "please check your email for a link to confirm the email change",
    });
  }

  return (
    <Form {...form}>
      {/* TODO: change this to server code and extract client side component separately */}
      {form.formState.isLoading ? (
        <h1>loading</h1>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email address</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>your email address is private</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            Update account
          </Button>
        </form>
      )}
    </Form>
  );
}
