"use client";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useUpdateProfileMutation } from "@/lib/mutations/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useProfileQuery } from "../../lib/queries/profile";

const profileSchema = z.object({
  username: z
    .string({ required_error: "please enter your username" })
    .min(3, {
      message: "username must be at least 3 characters",
    })
    .max(28, {
      message: "username cannot be longer than 28 characters",
    }),
  avatar: z.string(),
});

interface ProfileFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

export function ProfileForm({ user, className, ...props }: ProfileFormProps) {
  const { toast } = useToast();

  const { data: profile } = useProfileQuery(user.id);

  const mutation = useUpdateProfileMutation();

  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: profile!.username,
    },
  });

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(profile!.avatar_url);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const result = await mutation.mutateAsync({
      id: user.id,
      username: values.username,
    });

    form.reset({ username: result!.username });

    toast({
      title: "updated profile",
      description: "your user profile is updated!",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-6"
      >
        {" "}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { onChange, ...field } }) => (
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <Input
                  {...field}
                  id="user-avatar"
                  type="file"
                  accept="image/*"
                  className="absolute h-full w-full opacity-0"
                />
                <AvatarImage src={publicUrl} alt={profile!.username} />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <FormMessage className="" />
            </div>
          )}
        />
        <div className="flex flex-col justify-center gap-4 w-6/12">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input placeholder="aryaniyaps" {...field} />
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
        </div>
      </form>
    </Form>
  );
}
