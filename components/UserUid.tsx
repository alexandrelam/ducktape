import React from "react";
import Button from "@mui/material/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function UserUid() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);

  function copyToClipboard() {
    if (user) {
      navigator.clipboard.writeText(user.uid);
      setOpen(true);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Le UID a été copié dans le presse-papier
        </Alert>
      </Snackbar>
      <Button onClick={copyToClipboard}>
        <span>UID: {user?.uid}</span>
        <ContentPasteIcon />
      </Button>
    </>
  );
}
