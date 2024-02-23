import React, { useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "@mui/material";
import StartGameForm from "../../StartGameForm";

import { useSelector } from "react-redux";

import logo_safe_box from "../../../assets/img/logo_safe_box.png";
import { useGetUserByIdQuery } from "../../../core/services/data/dataApi";

import { Link } from "react-router-dom";

import logout from "../../../utils/logout";

const Header = () => {
  const [isFormShow, setIsFormShow] = useState(false);
  const { isUser } = useSelector((state) => state.data);

  const { data: userData } = useGetUserByIdQuery(
    { userId: isUser },
    { skip: !isUser }
  );

  const handleLogOut = () => {
    logout();
    // setIsUser(null);
    // rm("_lu");
    // setIsSession(null);
    // rm("_ls");
    // navigate("/");
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
          <b>{userData?.name}</b>
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
