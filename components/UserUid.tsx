import React from "react";
import Button from "@mui/material/Button";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { toast } from "react-toastify";

export function UserUid() {
  const notifyCopyToClipboard = () =>
    toast.success("Copié dans le presse-papier");

  function copyToClipboard() {
    //   if (user) {
    //     navigator.clipboard.writeText(user.uid);
    //     notifyCopyToClipboard();
    //   }
  }

  return (
    <Button onClick={copyToClipboard}>
      <span>UID: </span>
      <ContentPasteIcon />
    </Button>
  );
}
