import React, { useMemo, useState } from "react";
import InputMask from "react-input-mask";
import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { set } from "lockr";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm, useWatch } from "react-hook-form";
import services from "../../core/services";
import {
  useDeleteSessionByIdMutation,
  useEditSessionByIdMutation,
  useGetMembersListQuery,
  useGetSessionByIdQuery,
  usePostNewAttemptMutation,
  usePostNewMemberMutation,
} from "../../core/services/data/dataApi";
import { useSelector } from "react-redux";
import LoadingButton from "../LoadingButton";

const { setCurrentAttempt } = services;

const StartGameForm = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const { isSession, officeUser } = useSelector((state) => state.data);

  const { data: session } = useGetSessionByIdQuery(isSession, {
    skip: !isSession,
  });
  const { data: membersList } = useGetMembersListQuery();
  const [postNewMember] = usePostNewMemberMutation();
  const [postNewAttempt] = usePostNewAttemptMutation();

  const members = useMemo(
    () =>
      membersList?.map((item) => ({
        label: `${item.phone} ${item.name}`,
        id: item.id,
        name: item.name,
        phone: item.phone,
      })) || [],
    [membersList]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: {
      name: "",
      phone: "",
      count: "",
      member: undefined,
    },
  });

  const member = useWatch({
    control,
    name: "member",
  });

  const [handleEditSession] = useEditSessionByIdMutation();

  const onSubmit = async (formData) => {
    setLoading(true);

    let member;
    if (!formData.member) {
      const memberBody = {
        phone: formData.phone,
        name: formData.name,
      };
      const responseNewMember = await postNewMember({ body: memberBody });
      member = responseNewMember.data;
    } else if (formData.member) {
      member = formData.member;
    }

    const body = {
      member,
      attemptCount: Number(formData.count),
      attemptDatetime: new Date().getTime(),
      officeUser: {
        id: officeUser.id,
      },
      session: {
        id: isSession,
      },
    };

    const responseAttempt = await postNewAttempt({ body });

    // console.log("responseNewMember", responseNewMember);

    setCurrentAttempt(responseAttempt.data);
    set("currentAttempt", responseAttempt.data);
    handleClose(false);
    setLoading(true);
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={() => {
        handleClose(false);
      }}
      sx={{
        "& .MuiPaper-root": {
          overflow: "visible",
          minWidth: 400,
        },
      }}
    >
      <Box padding={"80px 24px"}>
        <IconButton
          color={"primary"}
          sx={{
            position: "absolute",
            top: 16,
            left: -20,
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#fff",
            },
          }}
          onClick={() => {
            handleClose(false);
          }}
        >
          <CloseIcon />
        </IconButton>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name={"member"}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={members}
                  onChange={(_, val) => {
                    field.onChange(val);
                  }}
                  size="small"
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Оберіть гравця" />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <Stack
                        direction={"row"}
                        spacing={0.5}
                        sx={{
                          borderRadius: "8px",
                          margin: "5px",
                        }}
                        component="li"
                        {...props}
                      >
                        <span>{option.phone}</span>
                        <b>{option.name}</b>
                      </Stack>
                    );
                  }}
                />
              )}
            />

            <Divider>або додайте нового</Divider>
            <Collapse in={!member} unmountOnExit mountOnEnter>
              <Stack spacing={2}>
                {/* Name */}
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: (
                      <>
                        <b>Імʼя</b> обовʼязкове
                      </>
                    ),
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.name}
                      label="Ведіть імʼя"
                      fullWidth
                      variant={"outlined"}
                      size={"small"}
                      helperText={!!errors.name && errors?.name?.message}
                    />
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: (
                      <>
                        <b>Телефон</b> обовʼязковий
                      </>
                    ),
                  }}
                  render={({ field }) => (
                    <InputMask
                      mask="+38(999)999 99 99"
                      value={field.value}
                      onChange={field.onChange}
                      alwaysShowMask={false}
                    >
                      {(inputProps) => (
                        <TextField
                          {...inputProps}
                          error={!!errors.phone}
                          label="Ведіть телефон"
                          fullWidth
                          variant={"outlined"}
                          size={"small"}
                          helperText={!!errors.phone && errors?.phone?.message}
                        />
                      )}
                    </InputMask>
                  )}
                />
              </Stack>
            </Collapse>

            {/* Count */}
            <Controller
              name="count"
              control={control}
              rules={{
                required: (
                  <>
                    <b>Кількість спроб</b> обовʼязкові
                  </>
                ),
              }}
              render={({ field }) => (
                <InputMask
                  mask="999"
                  value={field.value}
                  onChange={field.onChange}
                  alwaysShowMask={false}
                  maskChar={" "}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      error={!!errors.count}
                      label="Ведіть кількість спроб"
                      fullWidth
                      variant={"outlined"}
                      size={"small"}
                      helperText={!!errors.count && errors?.count?.message}
                    />
                  )}
                </InputMask>
              )}
            />
          </Stack>
          <LoadingButton
            type={"submit"}
            variant={"contained"}
            size={"large"}
            color={"primary"}
            loading={loading}
            sx={{
              mt: 3,
            }}
          >
            Далі
          </LoadingButton>
        </form>
      </Box>
    </Drawer>
  );
};

export default StartGameForm;
