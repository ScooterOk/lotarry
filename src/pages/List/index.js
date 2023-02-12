import React from "react";
import { Box, Button } from "@mui/material";

import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import Home from "../Home";
import { get, set } from "lockr";
import services from "../../core/services";
import { button } from "./styles";

const { setGameData, setCurrentUser } = services;

const winNumber = get("0S0_Q_21S2HA3RN");

const List = () => {
  const { isSession, gameData, currentUser } = useSelector(
    (state) => state.data
  );

  console.log("currentUser", currentUser, winNumber);

  const handleClickButton = (wn) => {
    console.log(wn, winNumber);
    if (wn === winNumber) {
      setGameData(null);
      return;
    }
    const result = gameData.map((item) => {
      if (item.name === wn) {
        return {
          ...item,
          cliced: true,
          won: wn === winNumber,
        };
      }
      return item;
    });
    const count = currentUser?.count - 1;
    const currentUserResult =
      !!count && count > 0 ? { ...currentUser, count } : null;
    setGameData(result);
    setCurrentUser(currentUserResult);
    set("gameData", result);
    set("currentUser", currentUserResult);
  };

  if (!!!isSession) return <Home />;

  return (
    <Layout>
      <Box
        mt={1}
        sx={{
          pointerEvents: !!currentUser ? "initial" : "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginRight: -3,
            pl: 4,
            pr: 4,
          }}
        >
          {gameData?.map((item) => (
            <Button
              // disabled={item === 30}
              variant={"contained"}
              size={"large"}
              color={
                item.cliced ? (item.won ? "success" : "warning") : "primary"
              }
              onClick={() => {
                handleClickButton(item.name);
              }}
              sx={button}
            >
              {item.name}
            </Button>
          ))}
        </Box>
        {/*<Grid container spacing={2} flexWrap={"wrap"}>
          {gameData?.map((item) => (
            <Grid
              item
              xs={2}
              textAlign={"center"}
              key={`key-list-${item.name}`}
            >
              <Button
                // disabled={item === 30}
                variant={"contained"}
                size={"large"}
                color={
                  item.cliced ? (item.won ? "success" : "warning") : "primary"
                }
                onClick={() => {
                  handleClickButton(item.name);
                }}
                sx={button}
              >
                {item.name}
              </Button>
            </Grid>
          ))}
        </Grid>*/}
      </Box>
    </Layout>
  );
};

export default List;
