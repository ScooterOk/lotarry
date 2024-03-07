import React, { useEffect } from "react";
import { Box } from "@mui/material";
import bg from "../../assets/img/bg.webm";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import SignInModal from "../../components/SignInModal";

// Home page
const Home = () => {
  const { isUser, isSession } = useSelector((state) => state.data);
  const navigation = useNavigate();

  useEffect(() => {
    if (!isUser) return;
    if (isSession) {
      navigation("/list");
    } else {
      navigation("/dashboard");
    }
  }, [isUser, isSession, navigation]);

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

export default Home;
