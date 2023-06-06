import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileUpdate } from "../database.types";
import repo from "../repo";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (profile: ProfileUpdate) => await repo.updateProfile(profile),
    {
      onSuccess(data, variables) {
        queryClient.setQueryData(["profile", variables.id], data);
      },
    }
  );
}
