import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserUid } from "./UserUid";
import { AddFriend } from "./AddFriend";
import { FriendList } from "./FriendList";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { doc, getDoc } from "firebase/firestore";
import RenameModal from "./RenameModal";

export function Settings() {
  const router = useRouter();
  const [userName, setUserName] = useState("loading...");
  const [friends, setFriends] = useState<User[]>([]);
  const [renameModalOpen, setRenameModalOpen] = useState(false);

  function handleLogout() {
    router.push("/login");
  }

  async function shareAddFriend() {
    // await navigator.share({
    //   title: "Invitez vos amis sur Ducktape",
    //   text: "Envoyez ce lien à vos amis pour les inviter sur Ducktape",
    //   url: "https://alexandrelam.github.io/ducktape/invite?code=" + user!.uid,
    // });
  }

  return (
    <Container>
      {/* <ProfileWrapper>
        {user.photoURL ? (
          <ProfilePicture src={user.photoURL} alt="profile picture" />
        ) : null}
        <span>{userName}</span>
      </ProfileWrapper>
      <UserUid />
      <Button onClick={shareAddFriend}>Envoyer un lien d'invitation</Button>
      <h2>Amis</h2>
      <AddFriend fetchFriends={fetchFriends} />
      <FriendList friends={friends} fetchFriends={fetchFriends} />
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
      /> */}
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
