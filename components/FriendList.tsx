import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { User } from "../types/User";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  friends: User[];
  fetchFriends: () => Promise<void>;
};

export function FriendList({ friends, fetchFriends }: Props) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {/* {friends.map((friend) => (
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
      ))} */}
    </List>
  );
}
