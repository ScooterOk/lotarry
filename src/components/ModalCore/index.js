import React from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

const ModalCore = ({ open, handleClose, children, width }) => {
  return (
    <Modal
      aria-modal={"true"}
      // aria-labelledby="transition-modal-title"
      // aria-describedby="transition-modal-description"
      // className={classes.modal}
      open={open}
      onClose={() => {
        if (!handleClose) return;
        handleClose(false);
      }}
      closeAfterTransition
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(2px)",
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            minWidth: width || "auto",
            position: "relative",
            zIndex: 1,
            outline: "none",
            background: "#fff",
            borderRadius: 2,
            boxShadow: "0 0 30px 7px rgba(187, 212, 250, 0.62)",
            pt: 2,
            pb: 2,
            pl: 4,
            pr: 4,
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalCore;
