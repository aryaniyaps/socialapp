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
import { Database, Profile } from "@/lib/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileSchema = z.object({
  username: z
    .string({ required_error: "please enter your username" })
    .min(3, {
      message: "username must be at least 3 characters",
    })
    .max(28, {
      message: "username cannot be longer than 28 characters",
    }),
});

interface ProfileFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
  profile: Profile;
}

export function ProfileForm({
  user,
  profile,
  className,
  ...props
}: ProfileFormProps) {
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: profile.username,
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const { data } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username: values.username })
      .select("username")
      .single();

    form.reset({
      username: data!.username,
    });

    toast({
      title: "updated profile",
      description: "your user profile is updated!",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                this is your public display name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
}
