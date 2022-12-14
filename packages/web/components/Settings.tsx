import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { UserUid } from "./UserUid";
import { AddFriend } from "./AddFriend";
import { FriendList } from "./FriendList";
import { useState } from "react";
import RenameModal from "./RenameModal";
import { useMe } from "../api/useMe";

export function Settings() {
  const router = useRouter();
  const { user, isLoading } = useMe();
  const [renameModalOpen, setRenameModalOpen] = useState(false);

  async function handleLogout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  }

  async function shareAddFriend() {
    await navigator.share({
      title: "Invitez vos amis sur Ducktape",
      text: "Envoyez ce lien à vos amis pour les inviter sur Ducktape",
      url: `/invite?code=${user.googleId}`,
    });
  }

  if (!user || isLoading) return null;

  return (
    <Container>
      <ProfileWrapper>
        {user.profilePicturePath ? (
          <ProfilePicture src={user.profilePicturePath} alt="profile picture" />
        ) : null}
        <span>{user.name}</span>
      </ProfileWrapper>
      <UserUid />
      <Button onClick={shareAddFriend}>
        Envoyer un lien d&apos;invitation
      </Button>
      <h2>Amis</h2>
      <AddFriend />
      <FriendList />
      <ButtonWrapper>
        <Button variant="outlined" onClick={() => setRenameModalOpen(true)}>
          Changer de nom
        </Button>
        <Button color="error" variant="outlined" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </ButtonWrapper>
      <RenameModal
        open={renameModalOpen}
        handleClose={() => setRenameModalOpen(false)}
      />
    </Container>
  );
}

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 0 1.5rem;
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
