import { useEffect, useState } from "react";
import useSWR from "swr";
import { User } from "../types/User";
import { decryptJwt, getCookie } from "../utils/cookie";
import { fetcher } from "./fetcher";

export function useMe() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const jwt = getCookie("token");
    const decrypt = jwt ? decryptJwt(jwt) : null;
    setUser(decrypt.user);
  }, []);

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
