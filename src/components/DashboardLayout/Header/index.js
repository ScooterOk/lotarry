import React, { useMemo, useState } from "react";

import styles from "./styles.module.scss";
import { Button, Stack, TextField } from "@mui/material";
import StartGameForm from "../../StartGameForm";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import logo_safe_box from "../../../assets/img/logo_safe_box.png";
import {
  useGetAttemptByIdQuery,
  useGetMembersSelectsBySessionIdQuery,
  useGetSessionByIdQuery,
} from "../../../core/services/data/dataApi";

import { Link, useNavigate } from "react-router-dom";
import servises from "../../../core/services";
import { rm } from "lockr";

const { setIsUser, setIsSession } = servises;

const Header = () => {
  const [isFormShow, setIsFormShow] = useState(false);
  const { isSession, currentAttempt, isUser } = useSelector(
    (state) => state.data
  );
  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsUser(null);
    rm("isUser");
    setIsSession(null);
    rm("isSession");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.logo_wrapper}>
            <img src={logo_safe_box} alt="" />
          </div>
        </div>
        <div className={styles.statistics}>
          <Button
            variant="outlined"
            color="inherit"
            LinkComponent={Link}
            to={"/sessions"}
          >
            Статистика
          </Button>
        </div>
        <div className={styles.logout}>
          <b>{isUser?.name}</b>
          <Button variant="contained" color="error" onClick={handleLogOut}>
            Вийти
          </Button>
        </div>
      </div>
      <StartGameForm open={isFormShow} handleClose={setIsFormShow} />
    </header>
  );
};

export default Header;
