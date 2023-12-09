import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { gsap } from "gsap";
import cx from "classnames";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import Home from "../Home";

import { get, set, rm } from "lockr";
import services from "../../core/services";
import { button, lock_l, lock_r } from "./styles";
import Firework from "../../components/Firework";
import styles from "./styles.module.scss";
import {
  useEditSessionByIdMutation,
  useGetAttemptByIdQuery,
  useGetSessionByIdQuery,
  usePostMembersSelectsMutation,
} from "../../core/services/data/dataApi";

const { setIsSession, setCurrentAttempt, setIsWon } = services;

const List = () => {
  const [loading, setLoading] = useState(null);

  const { isSession, officeUser, currentAttempt, isWon, sessionsCount } =
    useSelector((state) => state.data);

  const { data: session, refetch: refetchSession } = useGetSessionByIdQuery(
    isSession,
    {
      skip: !isSession,
    }
  );

  const { data: attemptData, refetch: refetchAttempt } = useGetAttemptByIdQuery(
    currentAttempt,
    {
      skip: !currentAttempt,
    }
  );

  const [addNewAttempt] = usePostMembersSelectsMutation();

  const [editSession] = useEditSessionByIdMutation();

  const attempts = useMemo(
    () =>
      session?.attempts?.reduce((previousValue, currentValue) => {
        return [...previousValue, ...currentValue.memberSelects];
      }, []),
    [session]
  );

  const gameData = useMemo(() => {
    const result = [];
    for (let i = 1; i <= 500; i++) {
      result.push({
        name: i,
        cliced: attempts?.some((value) => value.selectPosition === i),
        won:
          session?.winPosition === i &&
          attempts?.some((value) => value.selectPosition === i),
        loading: i === loading,
      });
    }
    return result;
  }, [attempts, loading, session]);

  const grid = useRef();
  const main = useRef();
  const winNumber = get("0S0_Q_21S2HA3RN");

  // useEffect(() => {
  //   if (!isSession) return;
  //   console.log("isSession", isSession);
  // }, [isSession]);

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

  const handleWin = async (currentMember) => {
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

    const body = {
      finishTime: new Date().getTime(),
      winMember: {
        ...currentMember,
      },
      office: session?.office,
      number: session?.number,
      startTime: session?.startTime,
      winPosition: session?.winPosition,
    };

    console.log("body", body);

    const response = await editSession({ id: session?.id, body });
    console.log("response", response);
  };

  // console.log("session", session, attemptData);

  const handleClickButton = async (wn) => {
    // console.log(session?.winPosition);
    // console.log("attemptData", attemptData, attemptData.memberSelects.length);
    setLoading(wn);

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
        id: currentAttempt,
      },
      selectPosition: wn,
      win: wn === session?.winPosition,
      selectDatetime: new Date().getTime(),
    };
    await addNewAttempt({ body });
    const updatedSession = await refetchSession();

    const isAttemptUsed =
      updatedSession?.data?.attempts.find((item) => item.id === currentAttempt)
        ?.attemptCount ===
      updatedSession?.data?.attempts.find((item) => item.id === currentAttempt)
        ?.memberSelects?.length;

    if (wn === session?.winPosition) {
      handleWin(attemptData?.member);
    }
    if (isAttemptUsed && wn !== session?.winPosition) {
      setCurrentAttempt(null);
      rm("currentAttempt");
    }

    setLoading(null);

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
  };

  // console.log("isSession/officeUser", isSession, officeUser);

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
                  sx={{
                    ...button,
                    ...(!!item.loading && {
                      transform: "scale(1.1)",
                      pointerEvents: "none",
                      opacity: 0.8,
                    }),
                  }}
                >
                  {item.loading && (
                    <CircularProgress
                      sx={{
                        color: "#fff",
                      }}
                      size={32}
                    />
                  )}
                  {!item.loading && item.name}
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
