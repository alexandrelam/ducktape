import useSWR from "swr";
import { Video } from "../types/Video";
import { fetcher } from "./fetcher";
import { useGuard } from "./useGuard";

export function useFeed() {
  const { user } = useGuard();

  const { data, error } = useSWR(
    user ? `/api/v1/users/${user.id}/videos` : null,
    fetcher
  );

  return {
    feed: data as Video[],
    isLoading: !error && !data,
    isError: error,
  };
}
