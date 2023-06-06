import { useQuery } from "@tanstack/react-query";
import repo from "../repo";

export function useProfileQuery(userId: string) {
  const key = ["profile", userId];

  return useQuery(key, async () => await repo.getProfile(userId));
}
