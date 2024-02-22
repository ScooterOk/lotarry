import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { gsap } from "gsap";
import cx from "classnames";

import { useSelector } from "react-redux";
import Home from "../Home";

import { set, rm } from "lockr";
import services from "../../core/services";

import styles from "./styles.module.scss";
import {
  useGetMembersSelectsBySessionIdQuery,
  useGetSessionByIdQuery,
  usePostMembersSelectsMutation,
} from "../../core/services/data/dataApi";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import DashboardLayout from "../../components/DashboardLayout";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import lockButton from "../../assets/img/9-lock.png";
import SetPinModal from "../../components/SetPinModal";

const { setCurrentAttempt, setIsWon } = services;

const Dashboard = () => {
  const [buttonsCount, setButtonsCount] = useState(null);
  const [loading, setLoading] = useState(null);
  const [winNumber, setWinNumber] = useState(null);
  const navigation = useNavigate();

  const { isSession, isUser, currentAttempt, isWon, sessionsCount } =
    useSelector((state) => state.data);

  useEffect(() => {
    if (!isUser) {
      navigation("/");
    }
    if (isUser && isSession) {
      console.log("isSession", isSession);
      navigation("/list");
    }
  }, [isSession, isUser, navigation]);

  const handleClickSessionButton = (count) => {
    setButtonsCount(count);
  };

  if (!isUser) return null;

  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <Grid2
          container
          justifyContent={"center"}
          spacing={6}
          position={"relative"}
          zIndex={1}
        >
          <Grid2>
            <Button
              className={styles.button}
              onClick={() => handleClickSessionButton(20)}
            >
              <img src={lockButton} alt="button" />
              <b>DEMO</b>
            </Button>
          </Grid2>
          <Grid2>
            <Button className={styles.button}>
              <img src={lockButton} alt="button" />
              <b>500</b>
            </Button>
          </Grid2>
          <Grid2>
            <Button className={styles.button}>
              <img src={lockButton} alt="button" />
              <b>750</b>
            </Button>
          </Grid2>
          <Grid2>
            <Button className={styles.button}>
              <img src={lockButton} alt="button" />
              <b>1000</b>
            </Button>
          </Grid2>
        </Grid2>
      </div>
      <SetPinModal
        buttonsCount={buttonsCount}
        setButtonsCount={setButtonsCount}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
