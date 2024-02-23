import React, { useEffect } from "react";
import { Box } from "@mui/material";
import bg from "../../assets/img/bg.webm";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import SignInModal from "../../components/SignInModal";

// Home page
const SignInPage = () => {
  const { isSession } = useSelector((state) => state.data);
  const navigation = useNavigate();

  useEffect(() => {
    if (isSession) navigation("/list");
  }, [isSession, navigation]);

  // const onSubmit = (formData) => {
  //   setLoading(true);
  //   return;
  //   const winNumber = Math.floor(Math.random() * 300) + 1;
  //   set("0S0_Q_21S2HA3RN", winNumber);
  //   const result = [];
  //   for (let i = 1; i <= 500; i++) {
  //     result.push({
  //       name: i,
  //       cliced: false,
  //       won: false,
  //     });
  //   }
  //   setGameData(result);
  //   set("gameData", result);
  //   setIsSession(true);
  //   set("isSession", new Date().getTime());
  //   setSessionsCount(sessionsCount + 1);
  //   set("sessionsCount", sessionsCount + 1);
  //   navigate("/list");
  // };

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
      <SignInModal />
    </Box>
  );
};

export default SignInPage;
