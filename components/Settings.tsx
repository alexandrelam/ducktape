import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { logout } from "../firebase/config";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { UserUid } from "./UserUid";
import { AddFriend } from "./AddFriend";
import { FriendList } from "./FriendList";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export function Settings() {
  const router = useRouter();
  const [user, error] = useAuthState(auth);
  const [friends, setFriends] = useState<User[]>([]);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  async function fetchFriends() {
    const userDoc = await getDoc(doc(db, "users", user!.uid));
    setFriends(userDoc.data()?.friends);
  }

  useEffect(() => {
    fetchFriends();
  });

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
      <Button color="error" onClick={handleLogout}>
        Se déconnecter
      </Button>
      <UserUid />
      <h2>Amis</h2>
      <AddFriend fetchFriends={fetchFriends} />
      <FriendList friends={friends} fetchFriends={fetchFriends} />
    </Container>
  );
}

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
