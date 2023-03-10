import React, { useMemo, useState } from "react";

import styles from "./styles.module.scss";
import { Button, Stack, TextField } from "@mui/material";
import StartGameForm from "../../StartGameForm";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import logo_safe_box from "../../../assets/img/logo_safe_box.png";

const { REACT_APP_GAME_PASSWORD } = process.env;

const Header = () => {
  const [isFormShow, setIsFormShow] = useState(false);
  const { gameData, currentUser } = useSelector((state) => state.data);

  const commonAttemps = useMemo(
    () => gameData?.filter((item) => !item.cliced).length || 0,
    [gameData]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = () => {
    setIsFormShow(true);
    reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.logo_wrapper}>
            <img src={logo_safe_box} alt="" />
          </div>
        </div>
        <div className={styles.counter}>
          <b>Залишилося спроб:</b>
          <span>{commonAttemps}</span>
        </div>
        {!!currentUser ? (
          <div className={styles.counter}>
            <b>Залишилося спроб:</b>
            <span>{currentUser?.count}</span>
          </div>
        ) : (
          <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: (
                      <>
                        <b>Пароль</b> обовʼязковий!
                      </>
                    ),
                    validate: (val) => {
                      if (val === REACT_APP_GAME_PASSWORD) {
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
                      helperText={
                        !!errors.password && errors?.password?.message
                      }
                      size={"small"}
                      sx={{
                        color: "#fff",
                        position: "relative",
                        "& .Mui-error": {
                          color: "#fff!important",
                        },
                        "& .MuiFormHelperText-root": {
                          position: "absolute",
                          top: "100%",
                          left: 0,
                        },
                        "& .MuiInputBase-root": {
                          color: "#fff",
                        },
                        "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#fff",
                          },
                        "& .MuiFormLabel-root": {
                          color: "inherit",
                          "&.Mui-focused": {
                            color: "inherit",
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff!important",
                        },
                      }}
                    />
                  )}
                />
                <Button
                  variant={"contained"}
                  size={"medium"}
                  color={"primary"}
                  type={"submit"}
                >
                  Почати
                </Button>
              </Stack>
            </form>
          </div>
        )}
      </div>
      <StartGameForm open={isFormShow} handleClose={setIsFormShow} />
    </header>
  );
};

export default Header;
