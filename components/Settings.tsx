import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { logout } from "../firebase/config";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export function Settings() {
  const router = useRouter();
  const [user, error] = useAuthState(auth);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  if (error)
    return (
      <div>Une erreur est surevenue lors du chargement de l'utilisateur</div>
    );

  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <ProfileWrapper>
        {user.photoURL ? (
          <ProfilePicture src={user.photoURL} alt="profile picture" />
        ) : null}
        <span>{user.displayName}</span>
      </ProfileWrapper>
      <DisconnectButton color="error" onClick={handleLogout}>
        Se déconnecter
      </DisconnectButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 80vh;
`;

const DisconnectButton = styled(Button)`
  margin-top: auto;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-top: 4rem;
  gap: 4px;
`;

const ProfilePicture = styled.img`
  border-radius: 100%;
  width: 6rem;
  height: 6rem;
`;
