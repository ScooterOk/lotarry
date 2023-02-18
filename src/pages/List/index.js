import React, { useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import { gsap } from "gsap";
import cx from "classnames";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import Home from "../Home";

import { get, set } from "lockr";
import services from "../../core/services";
import { button } from "./styles";
import Firework from "../../components/Firework";

const { setGameData, setCurrentUser, setIsWon } = services;

const winNumber = get("0S0_Q_21S2HA3RN");

const List = () => {
  const { isSession, gameData, currentUser, isWon } = useSelector(
    (state) => state.data
  );
  const grid = useRef();
  const main = useRef();

  useEffect(() => {
    // console.log("grid", grid.current.querySelectorAll("button"));
    // if (!!!isSession) return;
    if (!grid.current) return;
    /*gsap.from(grid.current.querySelectorAll("section:not(.cliced)"), {
      duration: 1.5,
      stagger: {
        grid: "auto",
        from: "random",
        amount: 1,
      },
      opacity: 0,
      scale: 0.1,
      ease: "power4.out",
    });*/

    /* TRANSFUSION ANIMATION*/
    /*gsap.to(grid.current.querySelectorAll("section"), {
      duration: 2,
      stagger: {
        each: 0.2,
        grid: "auto",
        repeat: -1,
        from: "start",
        yoyo: true,
      },
      scale: 1.2,
      opacity: 0.75,
      repeat: -1,
      repeatDelay: 5,
      ease: "power4.in",
    });*/
  }, []);

  // console.log("currentUser", currentUser, winNumber);
  //
  // console.log("gsap", gsap);

  const handleWin = () => {
    gsap.to(grid.current.querySelectorAll("section.won"), {
      duration: 3,
      y: -50,
      scale: 1.2,
      opacity: 0,
      ease: "power4.out",
      onComplete: () => {
        setIsWon(true);
        set("isWon", true);
      },
    });
    gsap.to(grid.current.querySelectorAll("section:not(.won)"), {
      duration: 1,
      stagger: {
        grid: "auto",
        from: "random",
        amount: 1,
        // axis: "x",
      },
      opacity: 0,
      // scale: 0.1,
      y: 50,
      ease: "power4.in",
    });
  };

  const handleClickButton = (wn) => {
    console.log(winNumber);
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
    if (wn === winNumber) {
      handleWin();
    }
  };

  if (!!!isSession) return <Home />;

  return (
    <Layout>
      <Box ref={main} pt={8} minHeight={1} position={"relative"}>
        {isWon ? (
          <Firework winNumber={winNumber} />
        ) : (
          <Box
            ref={grid}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginRight: -3,
              pointerEvents: !!currentUser ? "initial" : "none",
              pl: 4,
              pr: 4,
              "& section": {
                marginRight: 3,
                marginBottom: 3,
              },
            }}
          >
            {gameData?.map((item) => (
              <section
                key={`key_list-${item.name}`}
                className={cx(item.cliced && "cliced", item.won && "won")}
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
              </section>
            ))}
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default List;
