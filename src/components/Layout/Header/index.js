import React, { useMemo, useState } from "react";

import styles from "./styles.module.scss";
import { Button, Stack, TextField } from "@mui/material";
import StartGameForm from "../../StartGameForm";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import logo_safe_box from "../../../assets/img/logo_safe_box.png";
import {
  useGetAttemptByIdQuery,
  useGetMembersSelectsBySessionIdQuery,
  useGetSessionByIdQuery,
} from "../../../core/services/data/dataApi";
import md5 from "md5";

const { REACT_APP_GAME_PASSWORD } = process.env;

const Header = () => {
  const [isFormShow, setIsFormShow] = useState(false);
  const { isSession, currentAttempt } = useSelector((state) => state.data);

  const { data: session } = useGetSessionByIdQuery(isSession, {
    skip: !isSession,
  });

  const { data: attempt } = useGetAttemptByIdQuery(currentAttempt, {
    skip: !currentAttempt,
  });

  const { data: memberSelectsList } =
    useGetMembersSelectsBySessionIdQuery(isSession);

  const commonAttemps = useMemo(() => {
    return session?.buttonsAmount - (memberSelectsList?.length || 0);
  }, [memberSelectsList?.length, session?.buttonsAmount]);

  const selectedCount = useMemo(() => {
    const selected = memberSelectsList?.filter(
      (item) => item.attempt.id === currentAttempt
    );

    return attempt?.attemptsAllowed - selected?.length || 0;
  }, [attempt, currentAttempt, memberSelectsList]);

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
        {!!commonAttemps && (
          <div className={styles.counter}>
            <b>Залишилося спроб:</b>
            <span>{commonAttemps}</span>
          </div>
        )}
        {!!currentAttempt ? (
          <div className={styles.counter}>
            <b>Залишилося спроб:</b>
            <span>{selectedCount || "..."}</span>
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
                      if (md5(val) === session?.comment) {
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
