import Button from "@mui/material/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { auth, signInWithGoogle } from "../firebase/config";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthState } from "react-firebase-hooks/auth";

export default function login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    setOpen(false);
    const redirect = router.query.redirect as string;
    const code = router.query.code as string;

    if (code && redirect) {
      router.push(`${redirect}?code=${code}`);
    }

    router.push("/");
  }, [user, loading]);

  async function handleLogin() {
    setOpen(true);
    window.location.replace("http://localhost:4000/api/v1/auth/google");
  }

  return (
    <Container>
      <Image
        src="/ducktape/icon-384x384.png"
        alt="login illustration"
        width={200}
        height={200}
      />
      <BottomWrapper>
        <TextWrapper>
          <Title>Ducktape</Title>
          <SubTitle>Share 2 seconds daily videos with your friends!</SubTitle>
        </TextWrapper>
        <LoginButton variant="contained" size="large" onClick={handleLogin}>
          Se connecter avec Google
        </LoginButton>
      </BottomWrapper>
      <Backdrop sx={{ color: "#fff", zIndex: 200 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const LoginButton = styled(Button)`
  background-color: #2c542b;
  width: 100%;
  height: 4rem;
  color: #b5e3b4;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
`;

const Title = styled.h1`
  color: #2c542b;
  margin: 0;
  font-size: 3rem;
`;

const SubTitle = styled.span`
  color: #2c542b;
  font-size: 1.2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: var(--doc-height);
  background-color: #5ac161;
  padding: 0 3rem;
  padding-top: 5rem;
`;
