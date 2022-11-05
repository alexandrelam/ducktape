import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../types/User";

export function FriendList() {
  const [user] = useAuthState(auth);
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const userDoc = await getDoc(doc(db, "users", user!.uid));
      setFriends(userDoc.data()?.friends);
    })();
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {friends.map((friend) => (
        <ListItem key={friend.uid}>
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
