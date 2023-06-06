import { useQuery } from "@tanstack/react-query";
import repo from "../repo";

export function useUserQuery() {
  const key = ["user"];

  return useQuery(key, () => {
    return repo.getUser();
  });
}
