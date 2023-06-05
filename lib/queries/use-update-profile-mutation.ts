import { useMutation } from "@tanstack/react-query";
import { Profile } from "../database.types";
import useSupabase from "../hooks/use-supabase";

export default function useUpdateProfileMutation() {
  const client = useSupabase();

  return useMutation(async (profile: Profile) => {
    return await client
      .from("profiles")
      .update({ username: profile.username, avatar_url: profile.avatar_url })
      .match({ id: profile.id })
      .select("*")
      .throwOnError()
      .single();
  });
}
