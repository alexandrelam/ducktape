import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { logout } from "../firebase/config";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export function Settings() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <Container>
      <span>{user?.email}</span>
      <Button color="error" onClick={handleLogout}>
        Se déconnecter
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
`;
