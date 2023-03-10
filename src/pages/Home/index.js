import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import bg from "../../assets/img/bg.webm";
import ModalCore from "../../components/ModalCore";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import services from "../../core/services";
import { set } from "lockr";

const { REACT_APP_ADMIN_PASSWORD } = process.env;

const { setIsSession, setGameData } = services;

// Home page
const Home = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = () => {
    const winNumber = Math.floor(Math.random() * 300) + 1;
    set("0S0_Q_21S2HA3RN", winNumber);
    const result = [];
    for (let i = 1; i <= 500; i++) {
      result.push({
        name: i,
        cliced: false,
        won: false,
      });
    }
    setGameData(result);
    set("gameData", result);
    setIsSession(true);
    set("isSession", new Date().getTime());
    navigate("/list");
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            margin={"auto"}
            width={480}
          >
            <h1 style={{ fontWeight: 700 }}>Введіть пароль адміністратора</h1>

            <Controller
              name="password"
              control={control}
              rules={{
                required: (
                  <>
                    <b>Пароль</b> обовʼязковий
                  </>
                ),
                validate: (val) => {
                  if (val === REACT_APP_ADMIN_PASSWORD) {
                    return true;
                  }
                  return "Пароль не вірний!";
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.password}
                  label={"Пароль"}
                  color={"primary"}
                  fullWidth
                  variant={"outlined"}
                  type={"password"}
                  helperText={!!errors.password && errors?.password?.message}
                  sx={{
                    mb: 2,
                  }}
                />
              )}
            />
            <Button
              variant={"contained"}
              color={"primary"}
              size={"large"}
              type={"submit"}
            >
              Почати
            </Button>
          </Stack>
        </form>
      </ModalCore>
    </Box>
  );
};

export default Home;
