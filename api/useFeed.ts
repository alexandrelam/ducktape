import useSWR from "swr";
import { Video } from "../types/Video";
import { fetcher } from "./fetcher";

export function useFeed(userId: number | null) {
  const { data, error } = useSWR(
    userId ? `http://localhost:4000/api/v1/users/${userId}/videos` : null,
    fetcher
  );

  return {
    feed: data as Video[],
    isLoading: !error && !data,
    isError: error,
  };
}
