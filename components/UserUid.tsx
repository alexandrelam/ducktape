import React from "react";
import Button from "@mui/material/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { toast } from "react-toastify";

export function UserUid() {
  const [user] = useAuthState(auth);

  const notifyCopyToClipboard = () =>
    toast.success("Copié dans le presse-papier");

  function copyToClipboard() {
    if (user) {
      navigator.clipboard.writeText(user.uid);
      notifyCopyToClipboard();
    }
  }

  return (
    <Button onClick={copyToClipboard}>
      <span>UID: {user?.uid}</span>
      <ContentPasteIcon />
    </Button>
  );
}
