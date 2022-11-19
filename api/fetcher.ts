import { getCookie } from "../utils/cookie";

export const fetcher = async (url: string) => {
  const res = await fetch(`${process.env.API_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
  return res.json();
};
