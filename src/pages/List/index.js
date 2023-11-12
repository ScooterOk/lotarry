import React, { useEffect, useMemo, useRef } from "react";
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
import {
  useGetSessionByIdQuery,
  usePostMembersSelectsMutation,
} from "../../core/services/data/dataApi";

const { setGameData, setCurrentUser, setIsWon } = services;

const List = () => {
  const { isSession, officeUser, currentAttempt, isWon, sessionsCount } =
    useSelector((state) => state.data);

  const { data: session } = useGetSessionByIdQuery(isSession, {
    skip: !isSession,
  });

  const [addNewAttempt] = usePostMembersSelectsMutation();

  const gameData = useMemo(() => {
    const result = [];
    for (let i = 1; i <= 500; i++) {
      result.push({
        name: i,
        cliced: false,
        won: false,
      });
    }
    return result;
  }, []);

  console.log("session", session);
  console.log("currentAttempt", currentAttempt);

  const grid = useRef();
  const main = useRef();
  const winNumber = get("0S0_Q_21S2HA3RN");

  useEffect(() => {
    if (!isSession) return;
    console.log("isSession", isSession);
  }, [isSession]);

  useEffect(() => {
    // console.log("grid", grid.current.querySelectorAll("button"));
    // if (!!!isSession) return;
    if (!grid.current) return;
    gsap.to(grid.current.querySelectorAll(".lock_l"), {
      duration: 1.5,
      left: !!currentAttempt ? "-100%" : "0%",
      ease: !!currentAttempt ? "power3.in" : "power3.out",
      delay: 0,
    });
    gsap.to(grid.current.querySelectorAll(".lock_r"), {
      duration: 1.5,
      right: !!currentAttempt ? "-100%" : "0%",
      ease: !!currentAttempt ? "power3.in" : "power3.out",
      delay: 0,
    });

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
  }, [currentAttempt]);

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

  const handleClickButton = async (wn) => {
    console.log(session?.winPosition, wn);

    //   {
    //     "attempt" : {
    //         "id": 1,
    //         "member": {
    //             "id": 1,
    //             "phone": "0123456789",
    //             "name": "testuser"
    //         }
    //     },
    //     "selectPosition" : 10,
    //     "isWin" : false,
    //     "attemptDatetime" : "2023-07-28T13:07:16.441+02:00"
    // }

    const body = {
      attempt: {
        id: currentAttempt.id,
      },
      selectPosition: wn,
      isWin: false,
      selectDatetime: new Date().getTime(),
    };

    const res = await addNewAttempt({ body });
    console.log("RES", res);

    // const result = gameData.map((item) => {
    //   if (item.name === wn) {
    //     console.log("WIN!!!!", wn, winNumber, wn === winNumber);
    //     return {
    //       ...item,
    //       cliced: true,
    //       won: wn === winNumber,
    //     };
    //   }
    //   return item;
    // });
    // const count = currentAttempt?.count - 1;
    // const currentUserResult =
    //   !!count && count > 0 ? { ...currentAttempt, count } : null;
    // setGameData(result);
    // setCurrentUser(currentUserResult);
    // set("gameData", result);
    // set("currentUser", currentUserResult);
    // if (wn === winNumber) {
    //   handleWin();
    // }
  };

  console.log("isSession/officeUser", isSession, officeUser);

  if (!isSession || !officeUser) return <Home />;

  return (
    <Layout>
      <Box
        ref={main}
        pt={8}
        pb={3}
        minHeight={1}
        position={"relative"}
        sx={{
          background: !!currentAttempt
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
              pointerEvents: !!currentAttempt ? "initial" : "none",
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
                    !!!currentAttempt &&
                      item.cliced &&
                      !item.won &&
                      styles.clicked
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
        <Box padding={5} color={"white"}>
          SF-{sessionsCount.toString().padStart(4, "0")}
        </Box>
      </Box>
    </Layout>
  );
};

export default List;
