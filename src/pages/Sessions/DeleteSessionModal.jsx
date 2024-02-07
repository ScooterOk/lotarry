import React, { useState } from "react";
import ModalCore from "../../components/ModalCore";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { IconClose } from "../../components/icons";
import LoadingButton from "../../components/LoadingButton";
import { useDeleteSessionByIdMutation } from "../../core/services/data/dataApi";

const DeleteSessionModal = ({ deleteSession, open, setOpen, refetch }) => {
  const [loading, setLoading] = useState(false);

  const [deleteSessionById] = useDeleteSessionByIdMutation();

  const handleDelete = async () => {
    setLoading(true);
    await deleteSessionById({ id: deleteSession });
    await refetch();
    setLoading(false);
    setOpen(false);
  };

  return (
    <ModalCore open={open} handleClose={setOpen} maxWidth={600} width={500}>
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
        onClick={() => setOpen(false)}
      >
        <IconClose />
      </IconButton>
      <Stack p={{ xs: 2, sm: 3 }} alignItems={"center"}>
        <Typography variant="h6">Ви збираєтесь видалити сессію</Typography>
        <Typography variant="h6" color={"error"}>
          ID: {deleteSession}
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={1.5}
          mt={1}
        >
          <LoadingButton
            variant="contained"
            color="error"
            loading={loading}
            onClick={handleDelete}
          >
            Видалити
          </LoadingButton>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Скасувати
          </Button>
        </Stack>
      </Stack>
    </ModalCore>
  );
};

export default DeleteSessionModal;
