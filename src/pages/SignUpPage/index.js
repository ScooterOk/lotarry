import React, { useEffect, useState } from "react";
import { Backdrop, Box, Button, Stack, TextField } from "@mui/material";
import bg from "../../assets/img/bg.webm";
import ModalCore from "../../components/ModalCore";
import LoadingButton from "../../components/LoadingButton";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import services from "../../core/services";
import { set } from "lockr";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../core/services/data/dataApi";
import SignInModal from "../../components/SignInModal";
import SignUpModal from "../../components/SignUpModal";

const { REACT_APP_ADMIN_PASSWORD } = process.env;

const { setIsSession, setGameData, setSessionsCount } = services;

// Home page
const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sessionsCount, isSession } = useSelector((state) => state.data);
  const navigation = useNavigate();

  const { data: usersList } = useGetAllUsersQuery();

  console.log("usersList", usersList);

  useEffect(() => {
    if (isSession) navigation("/list");
  }, [isSession, navigation]);

  const onSubmit = (formData) => {
    console.log("formData", formData);
    setLoading(true);
    return;
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
    setSessionsCount(sessionsCount + 1);
    set("sessionsCount", sessionsCount + 1);
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
      {/* <SignInModal /> */}
      <SignUpModal />
    </Box>
  );
};

export default SignUpPage;
