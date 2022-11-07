import Button from "@mui/material/Button";
import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { signInWithGoogle } from "../firebase/config";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogin() {
    setOpen(true);
    await signInWithGoogle();
    setOpen(false);
    router.push("/");
  }

  return (
    <Container>
      <Button variant="contained" size="large" onClick={handleLogin}>
        Se connecter avec Google
      </Button>
      <Backdrop sx={{ color: "#fff", zIndex: 200 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
