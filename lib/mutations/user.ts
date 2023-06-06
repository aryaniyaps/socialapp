import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { auth } from "../firebase";

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: User) => {
      await auth.updateCurrentUser(data);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
}
