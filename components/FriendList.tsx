import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "../types/User";
import DeleteIcon from "@mui/icons-material/Delete";

export function FriendList() {
  const [user] = useAuthState(auth);
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const userDoc = await getDoc(doc(db, "users", user!.uid));
      setFriends(userDoc.data()?.friends);
    })();
  }, []);

  async function removeFriend(friend: User) {
    await updateDoc(doc(db, "users", user!.uid), {
      friends: arrayRemove(friend),
    });

    await updateDoc(doc(db, "users", friend.uid), {
      friends: arrayRemove({
        uid: user!.uid,
        name: user!.displayName,
        photoURL: user!.photoURL,
      }),
    });

    const userDoc = await getDoc(doc(db, "users", user!.uid));
    const friends = userDoc.data()?.friends;
    setFriends(friends);
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {friends.map((friend) => (
        <ListItem
          key={friend.uid}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeFriend(friend)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar
              alt={`profile picture of ${friend.name}`}
              src={friend.photoURL}
            />
          </ListItemAvatar>
          <ListItemText primary={friend.name} secondary={friend.uid} />
        </ListItem>
      ))}
    </List>
  );
}
