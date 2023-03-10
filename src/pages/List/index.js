import React, { useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import { gsap } from "gsap";
import cx from "classnames";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import Home from "../Home";

import { get, set } from "lockr";
import services from "../../core/services";
import { button, lock_l, lock_r } from "./styles";
import Firework from "../../components/Firework";
import styles from "./styles.module.scss";

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
    gsap.to(grid.current.querySelectorAll(".lock_l"), {
      duration: 1.5,
      left: !!currentUser ? "-100%" : "0%",
      ease: !!currentUser ? "power3.in" : "power3.out",
      delay: 0,
    });
    gsap.to(grid.current.querySelectorAll(".lock_r"), {
      duration: 1.5,
      right: !!currentUser ? "-100%" : "0%",
      ease: !!currentUser ? "power3.in" : "power3.out",
      delay: 0,
    });

    console.log("gsap.version", gsap);

    /*gsap.to(grid.current.querySelectorAll("section:not(.cliced) button"), {
      duration: 3,
      stagger: {
        grid: "auto",
        from: "random",
        amount: 1,
      },
      opacity: 0.75,
      ease: "power4.out",
      background: "#000000",
    });*/

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
  }, [currentUser]);

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
      <Box
        ref={main}
        pt={8}
        pb={3}
        minHeight={1}
        position={"relative"}
        sx={{
          background: !!currentUser
            ? "linear-gradient(185deg,  rgba(51, 51, 51, 0.75) 0%, rgba(27, 27, 27, 0.75) 100%)"
            : "linear-gradient(185deg,  rgba(51, 51, 51, 0.75) 0%, rgba(27, 27, 27, 0.75) 100%)",
        }}
      >
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
            {/*<div className={styles.cut} />*/}
            <Box sx={lock_l} className={"lock_l"} />
            <Box sx={lock_r} className={"lock_r"} />
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
                  className={cx(
                    !!!currentUser && item.cliced && !item.won && styles.clicked
                    // !!!currentUser && !item.won && styles.disabled
                  )}
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
