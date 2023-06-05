import { useQuery } from "@tanstack/react-query";
import useSupabase from "../hooks/use-supabase";

export function useUserQuery() {
  const supabase = useSupabase();

  const key = ["user"];

  return useQuery(key, async () => {
    const result = await supabase.auth.getUser();

    return result.data;
  });
}
