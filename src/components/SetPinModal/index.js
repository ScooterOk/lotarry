import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ModalCore from "../ModalCore";
import { Button, Stack, TextField } from "@mui/material";
import LoadingButton from "../LoadingButton";
import {
  useGetUserByIdQuery,
  useSetNewSessionMutation,
} from "../../core/services/data/dataApi";
import servises from "../../core/services";
import { set } from "lockr";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import md5 from "md5";
import InputMask from "react-input-mask";

const { setSessionsCount, setIsSession } = servises;

const SetPinModal = ({ buttonsCount, setButtonsCount }) => {
  const [loading, setLoading] = useState(false);
  const { sessionsCount, isUser } = useSelector((state) => state.data);
  const { data: userData } = useGetUserByIdQuery(
    { userId: isUser },
    { skip: !isUser }
  );

  const [handleNewSession] = useSetNewSessionMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    const number = sessionsCount + 1;
    setSessionsCount(number);
    set("_lsc", number);

    const body = {
      office: userData.office,
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
    set("_ls", res.data.id);
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
        </Stack>
      </form>
    </ModalCore>
  );
};

export default SetPinModal;
