import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "models/User";
import { decryptJwt, getCookie } from "../utils/cookie";

export function useGuard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const jwt = getCookie("token");
    const decrypt = jwt ? decryptJwt(jwt) : null;
    if (!decrypt) {
      router.push(`${process.env.API_URL}/api/v1/auth/google`);
      return;
    }

    if (decrypt.exp < Date.now() / 1000) {
      router.push(`${process.env.API_URL}/api/v1/auth/google`);
      return;
    }

    setUser(decrypt.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    isLoading: !user,
    isError: !user,
  };
}

function expToDate(exp: number) {
  const date = new Date(0);
  date.setUTCSeconds(exp);
  return date;
}
