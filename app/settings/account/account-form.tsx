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
import { useUpdateUserMutation } from "@/lib/mutations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "firebase/auth";
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
  const mutation = useUpdateUserMutation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user.email!,
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    await mutation.mutateAsync({ email: values.email });

    toast({
      title: "confirmation link sent",
      description:
        "please check your email for a link to confirm the email change",
    });
  }

  return (
    <Form {...form}>
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
    </Form>
  );
}
