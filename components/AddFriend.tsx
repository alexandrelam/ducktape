import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMe } from "../api/useMe";
import { mutate } from "swr";
import { getCookie } from "../utils/cookie";

export function AddFriend() {
  const [friendId, setFriendId] = useState<string>("");
  const { user, isLoading } = useMe();

  const notifySuccess = () => toast.success("Ami ajouté");
  const notifyError = () => toast.error("L'utilisateur n'existe pas");

  async function handleAddFriend() {
    try {
      await fetch(
        `${process.env.API_URL}/api/v1/users/${user.id}/friends/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      mutate("/api/v1/users/" + user.id);
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  }

  if (!user || isLoading) return null;

  return (
    <Wrapper>
      <StyledTextField
        id="outlined-basic"
        label="UID Utilisateur"
        variant="outlined"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddFriend}>
        <PersonAddIcon />
      </Button>
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
