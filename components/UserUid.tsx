import React from "react";
import Button from "@mui/material/Button";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { toast } from "react-toastify";
import { useMe } from "../api/useMe";

export function UserUid() {
  const { user, isLoading } = useMe();

  const notifyCopyToClipboard = () =>
    toast.success("Copié dans le presse-papier");

  function copyToClipboard() {
    if (user) {
      navigator.clipboard.writeText(user.googleId);
      notifyCopyToClipboard();
    }
  }

  if (!user || isLoading) return null;

  return (
    <Button onClick={copyToClipboard}>
      <span>id: {user.googleId}</span>
      <ContentPasteIcon />
    </Button>
  );
}
