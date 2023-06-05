import { useQuery } from "@tanstack/react-query";
import useSupabase from "../hooks/use-supabase";

export default function useProfileQuery(userId: number) {
  const client = useSupabase();

  const key = ["profile", userId];

  return useQuery(key, async () => {
    const result = await client
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .throwOnError()
      .single();

    return result.data;
  });
}
