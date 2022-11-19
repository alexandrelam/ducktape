import { getCookie } from "../utils/cookie";

export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};
