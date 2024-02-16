import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { gsap } from "gsap";
import cx from "classnames";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import Home from "../Home";

import { set, rm } from "lockr";
import services from "../../core/services";
import { button } from "./styles";
import Firework from "../../components/Firework";
import styles from "./styles.module.scss";
import {
  useGetMembersSelectsBySessionIdQuery,
  useGetSessionByIdQuery,
  usePostMembersSelectsMutation,
} from "../../core/services/data/dataApi";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const { setCurrentAttempt, setIsWon } = services;

const List = () => {
  const [loading, setLoading] = useState(null);
  const [winNumber, setWinNumber] = useState(null);

  const { isSession, officeUser, currentAttempt, isWon, sessionsCount } =
    useSelector((state) => state.data);

  const { data: session } = useGetSessionByIdQuery(isSession, {
    skip: !isSession,
  });

  const { data: memberSelectsList, refetch: memberSelectsListRefetch } =
    useGetMembersSelectsBySessionIdQuery(isSession);

  const [addNewMemberSelect] = usePostMembersSelectsMutation();

  const gameData = useMemo(() => {
    if (!session) return null;
    const result = [];
    for (let i = 1; i <= session?.buttonsAmount; i++) {
      result.push({
        name: i,
        cliced: memberSelectsList?.some((value) => value.selectPosition === i),
        won: memberSelectsList?.find(
          (value) => i === value.selectPosition && value.isWin
        ),
        loading: i === loading,
      });
    }
    return result;
  }, [loading, memberSelectsList, session]);

  const grid = useRef();
  const main = useRef();

  useEffect(() => {
    if (!grid.current) return;
    gsap.to(grid.current.querySelectorAll(".lock_l"), {
      duration: 1.5,
      left: !!currentAttempt && !!session ? "-100%" : "0%",
      ease: !!currentAttempt && !!session ? "power3.in" : "power3.out",
      delay: 0,
    });
    gsap.to(grid.current.querySelectorAll(".lock_r"), {
      duration: 1.5,
      right: !!currentAttempt && !!session ? "-100%" : "0%",
      ease: !!currentAttempt && !!session ? "power3.in" : "power3.out",
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
  }, [currentAttempt, session]);

  const handleWin = async () => {
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

    // const body = {
    //   finishTime: dayjs().toISOString(),
    //   winMember: {
    //     ...currentMember,
    //   },
    //   office: session?.office,
    //   number: session?.number,
    //   startTime: session?.startTime,
    //   winPosition: session?.winPosition,
    // };
    // await editSession({ id: session?.id, body });
  };

  const handleClickButton = async (wn) => {
    setLoading(wn);

    const body = {
      attempt: {
        id: currentAttempt,
        appSession: {
          id: isSession,
        },
      },
      selectPosition: wn,
      selectDatetime: dayjs().toISOString(),
    };

    const select = await addNewMemberSelect({ body });
    const response = await memberSelectsListRefetch();

    const currentAttemptData = response.data.find(
      (item) => item.id === select?.data?.id
    );

    const selectedAmount =
      response.data.filter((item) => item.attempt.id === currentAttempt)
        ?.length || 0;
    const attemptsAllowed = currentAttemptData?.attempt?.attemptsAllowed;

    const isAttemptUsed = selectedAmount >= attemptsAllowed;

    if (currentAttemptData.isWin) {
      setWinNumber(wn);
      handleWin();
    }

    if (isAttemptUsed && !currentAttemptData.isWin) {
      setCurrentAttempt(null);
      rm("currentAttempt");
    }

    setLoading(null);
  };

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
            <Box className={cx("lock_l", styles.lock_l)} />
            <Box className={cx("lock_r", styles.lock_r)} />
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
                    ...(loading && { pointerEvents: "none" }),
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
        <Box
          padding={5}
          color={"white"}
          component={Link}
          to={"/sessions"}
          sx={{
            textDecoration: "none",
          }}
        >
          SF-{sessionsCount.toString().padStart(4, "0")}
        </Box>
      </Box>
    </Layout>
  );
};

export default List;
