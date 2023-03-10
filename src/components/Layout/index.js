import React from "react";
import Header from "./Header";
import bg from "../../assets/img/bg.webm";
import { Box } from "@mui/material";

const styles = {
  minHeight: "100vh",
  "& #video": {
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  "& main": {
    /*background:
      "linear-gradient(185deg, rgba(58,29,95,1) 0%, rgba(13,15,64,1) 100%)",*/
    position: "relative",
    zIndex: 1,
    maxWidth: "calc(100% - 10% - 10%)",
    margin: "auto",
    height: "calc(100vh - 120px)",
    overflowY: "auto",
    overflowX: "hidden",
    marginTop: 15,
  },
};

const Layout = (props) => {
  const { children } = props;
  return (
    <Box sx={styles}>
      <video autoPlay muted loop id="video">
        <source src={bg} type="video/mp4" />
      </video>
      <Header />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
