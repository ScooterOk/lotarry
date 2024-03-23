import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { gsap } from "gsap";
import cx from "classnames";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

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
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import win_icon from "../../assets/img/win_icon_2.png";

const { setCurrentAttempt, setIsWon, setMemberSelectsList } = services;

const List = () => {
  const [loading, setLoading] = useState(null);
  const [winNumber, setWinNumber] = useState(null);

  const navigation = useNavigate();

  const { isSession, currentAttempt, isWon, sessionsCount, memberSelectsList } =
    useSelector((state) => state.data);

  const { data: session } = useGetSessionByIdQuery(isSession, {
    skip: !isSession,
  });

  const { data: memberSelectsData } = useGetMembersSelectsBySessionIdQuery(
    isSession,
    { skip: !isSession }
  );

  console.log("session", session);

  useEffect(() => {
    if (!memberSelectsList && !!memberSelectsData)
      setMemberSelectsList(memberSelectsData);
  }, [memberSelectsData, memberSelectsList]);

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

  const wonCounter = useMemo(
    () => gameData?.filter((item) => item.won)?.length,
    [gameData]
  );

  useEffect(() => {
    if (!isSession) {
      navigation("/dashboard");
    }
  }, [isSession, navigation]);

  const curtainAnimation = useCallback(
    (open) => {
      if (!main.current || !session) return;
      const scale = main.current.querySelector(".lock_l")?._gsap?.scaleX;
      if (open && scale < 1) return;
      gsap.to(main.current.querySelectorAll(".lock_l"), {
        duration: 1.5,
        scaleX: open ? 0 : 1,
        ease: open ? "power2.in" : "power2.out",
        delay: 0,
      });
      gsap.to(main.current.querySelectorAll(".lock_r"), {
        duration: 1.5,
        scaleX: open ? 0 : 1,
        ease: open ? "power2.in" : "power2.out",
        delay: 0,
      });
    },
    [session]
  );

  useEffect(() => {
    curtainAnimation(!!currentAttempt);
  }, [currentAttempt, curtainAnimation]);

  const handleWin = async () => {
    gsap.to(grid.current.querySelectorAll("section.won"), {
      duration: 3,
      y: -50,
      scale: 1.2,
      opacity: 0,
      ease: "power4.out",
      onComplete: () => {
        setIsWon(true);
        set("_lw", true);
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
      y: 50,
      ease: "power4.in",
    });
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
    const listResult = select.error
      ? memberSelectsList
      : !!memberSelectsList
      ? [...memberSelectsList, select?.data]
      : [select?.data];

    setMemberSelectsList(listResult);

    console.log("listResult", listResult, currentAttempt);

    const selectedAmount =
      listResult.filter((item) => item.attempt.id === currentAttempt)?.length ||
      0;
    const attemptsAllowed = select.data?.attempt?.attemptsAllowed;
    const isAttemptUsed = selectedAmount >= attemptsAllowed;

    if (select?.data?.isWin) {
      setWinNumber(wn);
      setTimeout(handleWin, 300);
    }

    if (isAttemptUsed && !select?.data?.isWin) {
      setCurrentAttempt(null);
      rm("_lca");
    }
    setLoading(null);
  };

  console.log(
    "Array.from({ length: wonCounter }, (_, index) => index + 1)",
    Array.from({ length: wonCounter }, (_, index) => index + 1)
  );

  return (
    <Layout>
      <Box
        ref={main}
        pt={4}
        pb={3}
        minHeight={1}
        position={"relative"}
        sx={{
          background: !!currentAttempt
            ? "linear-gradient(185deg,  rgba(51, 51, 51, 0.75) 0%, rgba(27, 27, 27, 0.75) 100%)"
            : "linear-gradient(185deg,  rgba(51, 51, 51, 0.75) 0%, rgba(27, 27, 27, 0.75) 100%)",
        }}
      >
        <Box className={cx("lock_l", styles.lock_l)} />
        <Box className={cx("lock_r", styles.lock_r)} />
        {session?.winPositionsAmount > 1 && (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={3}
            mb={3}
            color={"#ff0000"}
            className={cx(
              styles.won_counter,
              wonCounter && styles[`won_${wonCounter}`]
            )}
          >
            {Array.from(
              { length: session?.winPositionsAmount },
              (_, index) => index + 1
            ).map((item) => (
              <img key={`won_icon_${item}`} src={win_icon} alt="win" />
            ))}
          </Stack>
        )}
        {isWon ? (
          <Firework
            winNumber={winNumber}
            winPositionsAmount={session?.winPositionsAmount}
            gameData={gameData}
          />
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
            {/* <Box className={cx("lock_l", styles.lock_l)} />
            <Box className={cx("lock_r", styles.lock_r)} /> */}
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
