import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function RenameModal({ open, handleClose }: Props) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // @ts-ignore
    // const newName = (e.target as HTMLFormElement).name.value;

    // if (newName.length > 0) {
    //   try {
    //     await updateDoc(doc(db, "users", user!.uid), {
    //       name: newName,
    //     });
    //     toast.success("Votre nom a bien été modifié");
    //     handleClose();
    //   } catch (error) {
    //     toast.error("Une erreur est survenue lors du changement de nom");
    //   }
    // }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Rename modal"
      aria-describedby="Rename modal with a form to change the username"
    >
      <Container>
        <Form onSubmit={handleSubmit}>
          <StyledTextField id="name" label="Nouveau nom" variant="outlined" />
          <Button variant="contained" type="submit">
            <CheckIcon />
          </Button>
        </Form>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  padding: 3rem 1.5rem;
  border-radius: 0.2rem;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  gap: 0.5rem;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;
