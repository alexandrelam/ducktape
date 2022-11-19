import { useEffect } from "react";
import styled from "@emotion/styled";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useStore } from "../hooks/useStore";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

export default function invite() {
  const router = useRouter();
  const { setPage } = useStore();

  // useEffect(() => {
  //   if (loading) return;

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get("code");

  //   if (!code) {
  //     router.push("/");
  //     toast.error("Code invalide");
  //     return;
  //   }

  //   if (!user) {
  //     const redirectLink = "/login?redirect=/invite" + "&code=" + code;
  //     router.push(redirectLink);

  //     return;
  //   }

  //   (async () => {
  //     if (code) {
  //       try {
  //         await addFriend(user.uid, code);
  //         await addFriend(code, user.uid);
  //       } catch (error) {
  //         toast.error("Votre amis n'a pas pu être ajouté");
  //       }
  //       setPage(2);
  //       router.push("/");
  //     }
  //   })();
  // }, [user, loading]);

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
