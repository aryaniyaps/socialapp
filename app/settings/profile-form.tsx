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
}

export function ProfileForm({ user, className, ...props }: ProfileFormProps) {
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    resetOptions: { keepDirtyValues: true },
    defaultValues: async () => {
      // this feels like a hack to me
      const { data } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      console.log(data);

      return {
        username: data!.username,
      };
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
      {/* TODO: change this to server code and extract client side component separately */}
      {form.formState.isLoading ? (
        <h1>loading</h1>
      ) : (
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
                  this is your public display name. you can only change this
                  once every 30 days
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
      )}
    </Form>
  );
}
