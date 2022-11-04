import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export default function login() {
  const router = useRouter();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  async function handleLogin() {
    await signInWithGoogle();
    router.push("/");
  }

  return (
    <Container>
      <Button variant="contained" size="large" onClick={handleLogin}>
        Se connecter avec Google
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
