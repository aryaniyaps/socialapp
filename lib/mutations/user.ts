import { UserAttributes } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSupabase from "../hooks/use-supabase";

export function useUpdateUserMutation() {
  const supabase = useSupabase();

  const queryClient = useQueryClient();

  return useMutation(
    async (data: UserAttributes) => {
      const result = await supabase.auth.updateUser(data);

      return result.data;
    },
    {
      onSuccess(data) {
        queryClient.setQueryData(["user"], data);
      },
    }
  );
}
