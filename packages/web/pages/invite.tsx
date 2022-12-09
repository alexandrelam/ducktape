import { useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useStore } from "../hooks/useStore";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useMe } from "../api/useMe";
import axios from "../api/privateAxios";
import { getCookie } from "../utils/cookie";
import { mutate } from "swr";

export default function Invite() {
  const { user, isLoading } = useMe();
  const router = useRouter();
  const { setPage } = useStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      router.push("/");
      toast.error("Code invalide");
      return;
    }

    if (!getCookie("token")) {
      localStorage.setItem("inviteCode", code);
      const redirectLink = "/login?redirect=/invite" + "&code=" + code;
      router.push(redirectLink);

      return;
    }

    if (isLoading) return;

    if (!user) {
      localStorage.setItem("inviteCode", code);
      const redirectLink = "/login?redirect=/invite" + "&code=" + code;
      router.push(redirectLink);

      return;
    }

    (async () => {
      if (code) {
        try {
          await axios(`/api/v1/users/${user.googleId}/friends/${code}`, {
            method: "PATCH",
          });
          mutate(`/api/v1/users/${user.id}`);
          mutate(`/api/v1/users/${user.id}/videos`);
          toast.success("Ami ajouté");
        } catch (error) {
          toast.error("Votre amis n'a pas pu être ajouté");
        }
        setPage(2);
        router.push("/");
      }
    })();
  }, [user, isLoading]);

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}

const Container = styled.div`
  height: var(--doc-height);
  display: flex;
  justify-content: center;
  align-items: center;
`;
