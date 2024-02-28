import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import lockButton from "../../assets/img/9-lock.png";
import SetPinModal from "../../components/SetPinModal";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const [buttonsCount, setButtonsCount] = useState(null);
  const navigation = useNavigate();

  const { isSession, isUser } = useSelector((state) => state.data);

  useEffect(() => {
    if (isUser && isSession) {
      navigation("/list");
    }
  }, [isSession, isUser, navigation]);

  const handleClickSessionButton = (count) => {
    setButtonsCount(count);
  };

  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <Typography
          fontSize={28}
          fontWeight={700}
          color={"#f6ce1d"}
          component={"h2"}
          textAlign={"center"}
          mb={2}
        >
          Сейф -=1=-
        </Typography>
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
            <Button
              className={styles.button}
              onClick={() => handleClickSessionButton(500)}
            >
              <img src={lockButton} alt="button" />
              <b>500</b>
            </Button>
          </Grid2>
          <Grid2>
            <Button
              className={styles.button}
              onClick={() => handleClickSessionButton(750)}
            >
              <img src={lockButton} alt="button" />
              <b>750</b>
            </Button>
          </Grid2>
          <Grid2>
            <Button
              className={styles.button}
              onClick={() => handleClickSessionButton(1000)}
            >
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
