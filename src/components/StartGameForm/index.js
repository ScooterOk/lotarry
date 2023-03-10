import React from "react";
import InputMask from "react-input-mask";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { set } from "lockr";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import services from "../../core/services";

const { setCurrentUser } = services;

const StartGameForm = ({ open, handleClose }) => {
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
    },
  });

  const onSubmit = (formData) => {
    setCurrentUser(formData);
    set("currentUser", formData);
    handleClose(false);
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

          <Button
            type={"submit"}
            variant={"contained"}
            size={"large"}
            color={"primary"}
            sx={{
              mt: 3,
            }}
          >
            Далі
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default StartGameForm;
