import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ModalCore from "../ModalCore";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "../LoadingButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextFieldControlled from "../TextFieldControlled";
import PasswordFieldControlled from "../PasswordFieldControlled";
import { Link } from "react-router-dom";
import { useSetNewUserMutation } from "../../core/services/data/dataApi";

const SignUpModal = () => {
  const [loading, setLoading] = useState(false);

  const [setNewUser] = useSetNewUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      pass: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    setLoading(true);
    const body = { ...formData };
    delete body.password_confirmation;

    const res = await setNewUser({ body });
    console.log("res", res);

    return;
    // const winNumber = Math.floor(Math.random() * 300) + 1;
    // set("0S0_Q_21S2HA3RN", winNumber);
    // const result = [];
    // for (let i = 1; i <= 500; i++) {
    //   result.push({
    //     name: i,
    //     cliced: false,
    //     won: false,
    //   });
    // }
    // setGameData(result);
    // set("gameData", result);
    // setIsSession(true);
    // set("isSession", new Date().getTime());
    // setSessionsCount(sessionsCount + 1);
    // set("sessionsCount", sessionsCount + 1);
    // navigate("/list");
  };

  return (
    <ModalCore open={true} maxWidth={600}>
      <Box p={{ xs: 2, sm: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <TextFieldControlled
                label={"Email"}
                placeholder={"e.x username@gmail.com"}
                control={control}
                name={"email"}
                required
                rules={{
                  required: "Email is required.",
                }}
                errors={errors}
              />
            </Grid2>
            <Grid2 xs={12} sm={12}>
              <TextFieldControlled
                label={"Name"}
                placeholder={"Type in"}
                control={control}
                name={"name"}
                required
                rules={{
                  required: "First name is required.",
                }}
                errors={errors}
              />
            </Grid2>
            <Grid2 xs={6}>
              <TextFieldControlled
                label={"Office Name"}
                placeholder={"Type Office Name"}
                control={control}
                name={"office.name"}
                // required
                // rules={{
                //   required: "Last name is required.",
                // }}
                // errors={errors}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextFieldControlled
                label={"Office Location"}
                placeholder={"Type Office Location"}
                control={control}
                name={"office.location"}
                // required
                // rules={{
                //   required: "Phone is required.",
                // }}
                // errors={errors}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextFieldControlled
                label={"Office ID"}
                placeholder={"Type Office ID"}
                control={control}
                name={"office.id"}
                // required
                // rules={{
                //   required: "Phone is required.",
                // }}
                // errors={errors}
              />
            </Grid2>
            <Grid2 xs={12}>
              <PasswordFieldControlled
                control={control}
                name={"pass"}
                label={"Password"}
                placeholder={"Type in"}
                rules={{
                  validate: (value) =>
                    value?.length >= 8 || "Password complexity is not enough",
                }}
                errors={errors}
              />
            </Grid2>
            <Grid2 xs={12}>
              <PasswordFieldControlled
                control={control}
                name={"password_confirmation"}
                label={"Confirm password"}
                placeholder={"Type in"}
                errors={errors}
                rules={{
                  required: "Confirm is required",
                  validate: (val, form) =>
                    val === form.pass || "Password mismatch",
                }}
              />
            </Grid2>
            {/* <Grid2 xs={12}>
              <FormGroup
                sx={{
                  ml: 0.75,
                }}
              >
                <FormControlLabel
                  sx={{
                    alignItems: "flex-start",
                  }}
                  control={<Checkbox />}
                  label="I’d like to receive e-mail updates about latest trends, special sales announcements, online-only offers and more. "
                />
              </FormGroup>
            </Grid2> */}
            {/* <Grid2 xs={12}>
              <Typography
                variant={"hint"}
                color={"shades.500"}
                component={"div"}
                sx={{
                  "& a": {
                    color: "primary.middle",
                    textDecoration: "underline",
                  },
                }}
              >
                By signing up, you agree to SuperiorPromos{" "}
                <Link href={"/"}>Term of Service</Link> &{" "}
                <Link href={"/"}>Privacy policy</Link>
              </Typography>
            </Grid2> */}

            <Grid2 xs={12} textAlign={"center"}>
              <Typography variant="p1" component={"span"} color="shades.900">
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={0.5}
                >
                  <span>Вже маєте аккаунт?</span>
                  <Button
                    size="small"
                    component={Link}
                    to={"/sign-in"}
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
                    Залогінтесь
                  </Button>
                </Stack>
              </Typography>
            </Grid2>
            <Grid2 xs={12} textAlign={"center"}>
              <LoadingButton
                variant={"contained"}
                color={"primary"}
                size={"large"}
                type={"submit"}
                loading={loading}
              >
                Створити
              </LoadingButton>
            </Grid2>
          </Grid2>
          {/* <Grid2 container mt={3} spacing={1.5}>
            <Grid2 xs={6}>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  color: "shades.900",
                }}
                // onClick={() => setShow(false)}
              >
                Cancel
              </Button>
            </Grid2>
            <Grid2 xs={6}>
              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={loading}
              >
                Confirm
              </LoadingButton>
            </Grid2>
          </Grid2> */}
        </form>
      </Box>
    </ModalCore>
  );
};

export default SignUpModal;
