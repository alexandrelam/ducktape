import useSWR from "swr";
import { User } from "../types/User";
import { fetcher } from "./fetcher";
import { useGuard } from "./useGuard";

export function useMe() {
  const { user } = useGuard();

  const { data, error } = useSWR(
    user ? `/api/v1/users/${user.id}` : null,
    fetcher
  );

  return {
    user: data as User,
    isLoading: !error && !data,
    isError: error,
  };
}
