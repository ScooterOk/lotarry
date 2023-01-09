import React from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import bg from "../../assets/img/bg.webm";
import ModalCore from "../../components/ModalCore";

const Home = () => {
  return (
    <Box
      sx={{
        "& #video": {
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: -1,
        },
      }}
    >
      <video autoPlay muted loop id="video">
        <source src={bg} type="video/mp4" />
      </video>
      <ModalCore open={true} width={600}>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          margin={"auto"}
          width={400}
        >
          <h1 style={{ fontWeight: 700 }}>Введіть пароль адміністратора</h1>
          <TextField
            sx={{
              mb: 2,
            }}
            label={"Пароль"}
            color={"primary"}
            // placeholder={"Пароль"}
            fullWidth
            type={"password"}
          />
          <Button variant={"contained"} color={"primary"} size={"large"}>
            Почати
          </Button>
        </Stack>
      </ModalCore>
    </Box>
  );
};

export default Home;
