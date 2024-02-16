import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ModalCore from "../ModalCore";
import {
  Button,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "../LoadingButton";
import { Link } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useSetNewSessionMutation,
} from "../../core/services/data/dataApi";
import servises from "../../core/services";
import { set } from "lockr";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import md5 from "md5";
import InputMask from "react-input-mask";

const { setSessionsCount, setGameData, setIsSession, setOfficeUser } = servises;

const SignInModal = () => {
  const [loading, setLoading] = useState(false);
  const { sessionsCount } = useSelector((state) => state.data);

  const { data: usersList } = useGetAllUsersQuery();

  const [handleNewSession] = useSetNewSessionMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      buttonsAmount: 500,
      comment: "",
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    const user = usersList.find(
      (user) => user.email === formData.email && user.pass === formData.password
    );
    if (!user) return;
    const number = sessionsCount + 1;
    setSessionsCount(number);
    set("sessionsCount", number);

    const body = {
      office: user.office,
      startTime: dayjs().toISOString(),
      buttonsAmount: formData.buttonsAmount,
      number: number.toString().padStart(4, "0"),
      winPositionsAmount: 1,
      comment: md5(formData.comment),
      sessionStatus: "ACTIVE",
      sessionType: "WINNERS",
    };

    // const result = [];
    // for (let i = 1; i <= 500; i++) {
    //   result.push({
    //     name: i,
    //     cliced: false,
    //     won: false,
    //   });
    // }

    const res = await handleNewSession({ body });

    // setGameData(result);
    setIsSession(res.data.id);
    set("isSession", res.data.id);
    setOfficeUser(user);
    set("officeUser", user);
    setLoading(false);
  };

  return (
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
          <h1 style={{ fontWeight: 700 }}>Створити розіграш</h1>

          <Controller
            name="email"
            control={control}
            rules={{
              required: (
                <>
                  <b>Пошта</b> обовʼязкова <br />
                </>
              ),
              validate: (value) => {
                const re =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(value)) {
                  return true;
                } else {
                  return <>Невірний формат пошти</>;
                }
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.email}
                label={"Пошта"}
                color={"primary"}
                fullWidth
                variant={"outlined"}
                type={"email"}
                helperText={!!errors.email && errors?.email?.message}
                sx={{
                  mb: 2,
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: (
                <>
                  <b>Пароль</b> обовʼязковий
                </>
              ),
              // validate: (val) => {
              //   if (val === REACT_APP_ADMIN_PASSWORD) {
              //     return true;
              //   }
              //   return "Пароль не вірний!";
              // },
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

          <Stack
            direction={"row"}
            spacing={2}
            width={1}
            sx={{
              "& button": {
                maxHeight: 55,
              },
            }}
          >
            <Controller
              name="buttonsAmount"
              control={control}
              rules={{
                required: (
                  <>
                    <b>Кількість</b> обовʼязкова
                  </>
                ),
                pattern: {
                  value: /^\d+$/,
                  message: (
                    <>
                      Тільки <b>цифри</b>
                    </>
                  ),
                },
                validate: (value) => {
                  if (Number(value) > 1000) {
                    return (
                      <>
                        Максимальна кількість <b>1000</b>
                      </>
                    );
                  } else {
                    return true;
                  }
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.buttonsAmount}
                  label={"Кількість спроб"}
                  color={"primary"}
                  fullWidth
                  variant={"outlined"}
                  type={"text"}
                  helperText={
                    !!errors.buttonsAmount && errors?.buttonsAmount?.message
                  }
                  sx={{
                    mb: 2,
                    flexGrow: 1,
                  }}
                />
              )}
            />

            <Controller
              name="comment"
              control={control}
              rules={{
                required: (
                  <>
                    <b>Пінкод</b> обовʼязковий
                  </>
                ),
              }}
              render={({ field }) => (
                <InputMask mask={"9999"} {...field} maskChar={" "}>
                  {() => (
                    <TextField
                      {...field}
                      error={!!errors.comment}
                      label={"Пінкод"}
                      color={"primary"}
                      fullWidth
                      variant={"outlined"}
                      type={"text"}
                      helperText={!!errors.comment && errors?.comment?.message}
                      sx={{
                        mb: 2,
                        flexGrow: 1,
                      }}
                    />
                  )}
                </InputMask>
              )}
            />
          </Stack>
          <LoadingButton
            variant={"contained"}
            color={"primary"}
            size={"large"}
            type={"submit"}
            loading={loading}
            fullWidth
          >
            Почати
          </LoadingButton>

          <Typography variant="p1" component={"span"} color="shades.900" mb={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={0.5}
            >
              <span>Ще не маєте аккаунта?</span>
              <Button
                size="small"
                component={Link}
                to={"/sign-up"}
                sx={{
                  color: "primary.dark",
                  pl: 0.5,
                  pr: 0.5,
                }}
                // onClick={() => {
                //   setShow(false);
                //   setIsShowModalIn(true);
                // }}
              >
                Створити
              </Button>
            </Stack>
          </Typography>

          {/* <Button
            onClick={async () => {
              const res = await handleDeleteUser({ id: 54 });
              console.log("res", res);
            }}
          >
            Delete
          </Button> */}
        </Stack>
      </form>
    </ModalCore>
  );
};

export default SignInModal;
