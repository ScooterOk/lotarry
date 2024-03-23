import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import lockButton from "../../assets/img/9-lock.png";
import orangeButton from "../../assets/img/orange-lock.png";

import SetPinModal from "../../components/SetPinModal";

import star_1 from "../../assets/img/11111.png";
import star_3 from "../../assets/img/3_orange_star.png";

import styles from "./styles.module.scss";
import cx from "classnames";

const Dashboard = () => {
  const [gameParams, setGameParams] = useState(null);
  const navigation = useNavigate();

  const { isSession, isUser } = useSelector((state) => state.data);

  useEffect(() => {
    if (isUser && isSession) {
      navigation("/list");
    }
  }, [isSession, isUser, navigation]);

  const handleClickSessionButton = (buttonCount, winPositionCount) => {
    setGameParams({
      buttonCount,
      winPositionCount,
    });
  };

  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        {/* <Stack
          justifyContent={"center"}
          direction={"row"}
          mb={2}
          position={"relative"}
          zIndex={1}
        >
          <img src={star_1} alt="star" width={120} height={120} />
        </Stack> */}
        <Grid2
          container
          justifyContent={"center"}
          spacing={6}
          position={"relative"}
          zIndex={1}
          mb={8}
        >
          <Grid2>
            <Button
              className={styles.button}
              onClick={() => handleClickSessionButton(20, 1)}
            >
              <img src={lockButton} alt="button" />
              <b>DEMO</b>
              {/* <i>
                <img src={star_1} alt="star" />
              </i> */}
            </Button>
          </Grid2>
          <Grid2>
            <Button
              className={styles.button}
              onClick={() => handleClickSessionButton(500, 1)}
            >
              <img src={lockButton} alt="button" />
              <b>500</b>
              {/* <i>
                <img src={star_1} alt="star" />
              </i> */}
            </Button>
          </Grid2>
          <Grid2>
            <Button
              className={styles.button}
              onClick={() => handleClickSessionButton(750, 1)}
            >
              <img src={lockButton} alt="button" />
              <b>750</b>
              {/* <i>
                <img src={star_1} alt="star" />
              </i> */}
            </Button>
          </Grid2>
          <Grid2>
            <Button
              className={styles.button}
              onClick={() => handleClickSessionButton(1000, 1)}
            >
              <img src={lockButton} alt="button" />
              <b>1000</b>
              {/* <i>
                <img src={star_1} alt="star" />
              </i> */}
            </Button>
          </Grid2>
        </Grid2>

        <Grid2
          container
          justifyContent={"center"}
          spacing={6}
          position={"relative"}
          zIndex={1}
        >
          <Grid2>
            <Button
              className={cx(styles.button, styles.orange)}
              onClick={() => handleClickSessionButton(20, 3)}
            >
              <img src={orangeButton} alt="button" />
              <b>DEMO</b>
              <i>
                <img src={star_3} alt="star" />
              </i>
            </Button>
          </Grid2>
          <Grid2>
            <Button
              className={cx(styles.button, styles.orange)}
              onClick={() => handleClickSessionButton(500, 3)}
            >
              <img src={orangeButton} alt="button" />
              <b>500</b>
              <i>
                <img src={star_3} alt="star" />
              </i>
            </Button>
          </Grid2>
          <Grid2>
            <Button
              className={cx(styles.button, styles.orange)}
              onClick={() => handleClickSessionButton(750, 3)}
            >
              <img src={orangeButton} alt="button" />
              <b>750</b>
              <i>
                <img src={star_3} alt="star" />
              </i>
            </Button>
          </Grid2>
          <Grid2>
            <Button
              className={cx(styles.button, styles.orange)}
              onClick={() => handleClickSessionButton(1000, 3)}
            >
              <img src={orangeButton} alt="button" />
              <b>1000</b>
              <i>
                <img src={star_3} alt="star" />
              </i>
            </Button>
          </Grid2>
        </Grid2>
      </div>
      <SetPinModal gameParams={gameParams} setGameParams={setGameParams} />
    </DashboardLayout>
  );
};

export default Dashboard;
