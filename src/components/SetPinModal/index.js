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
import { Link, redirect, useNavigate } from "react-router-dom";
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

const { setSessionsCount, setIsUser, setIsSession, setOfficeUser } = servises;

const SetPinModal = ({ buttonsCount, setButtonsCount }) => {
  const [loading, setLoading] = useState(false);
  const { sessionsCount, isUser } = useSelector((state) => state.data);

  const [handleNewSession] = useSetNewSessionMutation();
  const navigate = useNavigate();

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
    const number = sessionsCount + 1;
    setSessionsCount(number);
    set("sessionsCount", number);

    const body = {
      office: isUser.office,
      startTime: dayjs().toISOString(),
      buttonsAmount: buttonsCount,
      number: number.toString().padStart(4, "0"),
      winPositionsAmount: 1,
      comment: md5(formData.comment),
      sessionStatus: "ACTIVE",
      sessionType: "WINNERS",
    };

    const res = await handleNewSession({ body });

    // setGameData(result);
    setIsSession(res.data.id);
    set("isSession", res.data.id);
    setLoading(false);
    setButtonsCount(null);
  };

  return (
    <ModalCore open={!!buttonsCount} handleClose={setButtonsCount} width={600}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          margin={"auto"}
          width={480}
        >
          <h1 style={{ fontWeight: 700 }}>Створіть ПІН-код</h1>

          <Controller
            name="comment"
            control={control}
            rules={{
              required: (
                <>
                  <b>Пінкод</b> обовʼязковий
                </>
              ),
              validate: (value) => {
                const re = /^\d+$/;
                if (re.test(value)) {
                  return true;
                } else {
                  return (
                    <>
                      Пінкод має містити <b>4</b> цифри
                    </>
                  );
                }
              },
            }}
            render={({ field }) => (
              <InputMask
                mask={"9999"}
                value={field.value}
                onChange={field.onChange}
                maskChar={" "}
              >
                {() => (
                  <TextField
                    // {...field}
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
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setButtonsCount(null)}
            >
              Скасувати
            </Button>
          </Stack>

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

export default SetPinModal;
