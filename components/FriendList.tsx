import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMe } from "../api/useMe";
import { User } from "../types/User";
import { mutate } from "swr";
import axios from "../api/privateAxios";

export function FriendList() {
  const { user, isLoading } = useMe();

  async function removeFriend(friend: User) {
    await axios(`/api/v1/users/${user.id}/friends/${friend.id}`, {
      method: "DELETE",
    });
    mutate("/api/v1/users/" + user.id);
  }

  if (!user || isLoading) return null;

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {user.friends.map((friend) => (
        <ListItem
          key={friend.id}
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
              src={friend.profilePicturePath}
            />
          </ListItemAvatar>
          <ListItemText primary={friend.name} secondary={friend.googleId} />
        </ListItem>
      ))}
    </List>
  );
}
