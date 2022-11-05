import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, forwardRef } from "react";
import { auth } from "../firebase/config";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  fetchFriends: () => Promise<void>;
};

export function AddFriend({ fetchFriends }: Props) {
  const [user] = useAuthState(auth);
  const [friendUid, setFriendUid] = useState<string>("");
  const [open, setOpen] = useState(false);

  async function addFriend(userUid: string, friendUid: string) {
    const friendDoc = await getDoc(doc(db, "users", friendUid));
    await updateDoc(doc(db, "users", userUid), {
      friends: arrayUnion({
        uid: friendUid,
        name: friendDoc.data()?.name,
        photoURL: friendDoc.data()?.photoURL,
      }),
    });
  }

  async function handleAddFriend() {
    if (user) {
      try {
        if (friendUid === user.uid)
          throw new Error("Vous ne pouvez pas vous ajouter vous-même");
        await addFriend(user.uid, friendUid);
        await addFriend(friendUid, user.uid);
        fetchFriends();
      } catch (e) {
        setOpen(true);
      }
    }
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Wrapper>
      <StyledTextField
        id="outlined-basic"
        label="UID Utilisateur"
        variant="outlined"
        value={friendUid}
        onChange={(e) => setFriendUid(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddFriend}>
        <PersonAddIcon />
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          L'utilisateur n'a pas été ajouté en amis
        </Alert>
      </Snackbar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledTextField = styled(TextField)`
  flex-grow: 1;
`;
