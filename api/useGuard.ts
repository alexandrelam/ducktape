import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { decryptJwt, getCookie } from "../utils/cookie";

export function useGuard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const jwt = getCookie("token");
    const decrypt = jwt ? decryptJwt(jwt) : null;
    if (!decrypt) {
      //router.push(`${process.env.API_URL}/api/v1/auth/google`);
      return;
    }

    if (decrypt.exp < Date.now() / 1000) {
      //router.push(`${process.env.API_URL}/api/v1/auth/google`);
      return;
    }

    setUser(decrypt.user);
  }, []);

  return {
    user,
    isLoading: !user,
    isError: !user,
  };
}
