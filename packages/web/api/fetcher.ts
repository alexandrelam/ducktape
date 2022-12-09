import axios from "./privateAxios";

export const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
