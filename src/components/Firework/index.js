import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

import styles from "./styles.module.scss";
import cx from "classnames";
import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { rm } from "lockr";
import servises from "../../core/services";

gsap.registerPlugin(DrawSVGPlugin);

const { setIsSession, setCurrentAttempt, setIsWon } = servises;

const Firework = ({ winNumber }) => {
  const svg = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(
      document.querySelector(`.${styles.jackpot}`).querySelectorAll("span"),
      {
        duration: 0.5,
        opacity: 0,
        stagger: 0.15,
        // y: 150,
        scale: 2.5,
      }
    );

    gsap.from(document.querySelector(`.${styles.won}`).querySelector("h2"), {
      duration: 2,
      opacity: 0,
      y: -100,
      ease: "power4.out",
    });

    gsap.from(svg.current.querySelectorAll("path, circle"), {
      drawSVG: "50% 50%",
      duration: 3,
      ease: "power2.out",
    });
  }, []);

  const handleFinishSession = () => {
    setCurrentAttempt(null);
    rm("currentAttempt");
    setIsSession(null);
    rm("isSession", null);
    setIsWon(null);
    rm("isWon", null);
    navigate("/dashboard");
  };

  return (
    <div className={styles.won}>
      <div className={cx(styles.firework, styles.f1)} />
      <div className={cx(styles.firework, styles.f2)} />
      <div className={cx(styles.firework, styles.f3)} />
      <div className={cx(styles.firework, styles.f4)} />
      <div className={cx(styles.firework, styles.f5)} />
      <div className={cx(styles.firework, styles.f6)} />
      <div className={cx(styles.firework, styles.f7)} />

      <h2>
        Вітаємо! <br /> Переможний номер: {winNumber}
      </h2>

      <div className={styles.jackpot}>
        <span data-text={"J"}>J</span>
        <span data-text={"A"}>A</span>
        <span data-text={"C"}>C</span>
        <span data-text={"K"}>K</span>
        <span data-text={"P"}>P</span>
        <span data-text={"O"}>O</span>
        <span data-text={"T"}>T</span>
        <span data-text={"!"}>!</span>
      </div>
      <svg
        width="500px"
        height="500px"
        viewBox="0 0 60 60"
        ref={svg}
        className={styles.svg}
      >
        <g>
          <path
            id={"path1"}
            d="M58.057,6.083H47.298l-8.633-4.855c-0.345-0.193-0.77-0.19-1.112,0.009C37.212,1.435,37,1.804,37,2.2v0.883h-8v3H1.943   C0.872,6.083,0,6.955,0,8.026v44.113c0,1.071,0.872,1.943,1.943,1.943H2v4h10v-4h17v3h8v0.716c0,0.396,0.212,0.765,0.554,0.965   c0.173,0.102,0.368,0.152,0.563,0.152c0.189,0,0.379-0.048,0.548-0.143l8.339-4.69H48v4h10v-4h0.057   c1.071,0,1.943-0.872,1.943-1.943V8.026C60,6.955,59.128,6.083,58.057,6.083z M10,56.083H4v-2h6V56.083z M12,52.119v-0.036H2v0.057   L1.943,8.083H29v2H6.346C5.053,10.083,4,11.135,4,12.428v35.309c0,1.293,1.053,2.346,2.346,2.346H14h8h7v2.002L12,52.119z    M22,48.083v-1h4v1H22z M14,38.083v1h-4v-1H14z M14,42.083h-4v-1h4V42.083z M10,44.083h4v1h-4V44.083z M10,47.083h4v1h-4V47.083z    M16,38.083h4v10h-4V38.083z M26,42.083h-4v-1h4V42.083z M22,44.083h4v1h-4V44.083z M26,39.083h-4v-1h4V39.083z M28,37.083   c0-0.553-0.447-1-1-1h-5h-1h-6h-1H9c-0.553,0-1,0.447-1,1v11H6.346C6.155,48.083,6,47.927,6,47.737V31.083h8h8h7v17h-1V37.083z    M29,29.083h-1v-11c0-0.553-0.447-1-1-1h-5h-1h-6h-1H9c-0.553,0-1,0.447-1,1v11H6V12.428c0-0.19,0.155-0.346,0.346-0.346H29V29.083   z M22,29.083v-1h4v1H22z M14,19.083v1h-4v-1H14z M14,23.083h-4v-1h4V23.083z M10,25.083h4v1h-4V25.083z M10,28.083h4v1h-4V28.083z    M16,19.083h4v10h-4V19.083z M26,23.083h-4v-1h4V23.083z M22,25.083h4v1h-4V25.083z M26,20.083h-4v-1h4V20.083z M31,55.083v-1v-4   v-40v-4v-1h6v50H31z M39,3.71l4.219,2.373h-0.147L53,11.668v3.415c-0.553,0-1,0.447-1,1c0,0.553,0.447,1,1,1v1   c-0.553,0-1,0.447-1,1s0.447,1,1,1v20c-0.553,0-1,0.447-1,1s0.447,1,1,1v1c-0.553,0-1,0.447-1,1s0.447,1,1,1v3.332L39,56.29V3.71z    M56,56.083h-6v-2h6V56.083z M58,52.083h-7.294L55,49.668v-0.083v-4.502h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1v-1h1   c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1v-20h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1v-1h1c0.553,0,1-0.447,1-1c0-0.553-0.447-1-1-1h-1   v-4.585v-0.083l-4.182-2.352L58,8.026l0.057,44.057H58z"
          />

          <circle cx="34" cy="6.999" r="1" />

          <circle cx="34" cy="12.999" r="1" />

          <circle cx="34" cy="46.999" r="1" />

          <circle cx="34" cy="40.999" r="1" />

          <circle cx="34" cy="18.999" r="1" />

          <circle cx="34" cy="52.999" r="1" />

          <path d="M41,35c-0.553,0-1,0.447-1,1s0.447,1,1,1c2.212,0,4.011-1.799,4.011-4.011V27.01C45.011,24.798,43.212,23,41,23   c-0.553,0-1,0.447-1,1s0.447,1,1,1c1.108,0,2.011,0.902,2.011,2.011v5.979C43.011,34.097,42.108,35,41,35z" />

          <path d="M41,19c-0.553,0-1,0.447-1,1s0.447,1,1,1c3.314,0,6.011,2.696,6.011,6.011v5.979C47.011,36.303,44.314,39,41,39   c-0.553,0-1,0.447-1,1s0.447,1,1,1c4.417,0,8.011-3.594,8.011-8.011V27.01C49.011,22.593,45.417,19,41,19z" />
        </g>
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>
      <Box mt={7} zIndex={10} position={"relative"}>
        <Button
          size={"large"}
          color={"primary"}
          variant={"contained"}
          onClick={handleFinishSession}
          // component={Link}
          // to={"/"}
        >
          Продовжити
        </Button>
      </Box>
    </div>
  );
};

export default Firework;
