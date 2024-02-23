import { Box, Button, Stack } from "@mui/material";
import bg from "../../assets/img/bg.webm";
import ModalCore from "../../components/ModalCore";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

// Home page
const NotFound = () => {
  return (
    <Box
      sx={{
        "& #video": {
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: -1,
        },
      }}
    >
      {/* <video autoPlay muted loop id="video">
        <source src={bg} type="video/mp4" />
      </video> */}
      {/* <SignInModal /> */}
      <ModalCore open={true} width={600}>
        <div className={styles.wrapper}>
          <h1>Oops!</h1>
          <h2>404 - Сторінка не знайдена</h2>
          <p>
            Сторінка, яку ви шукаєте, могла бути видалена через зміну назви або
            тимчасово недоступна.
          </p>
          <Button LinkComponent={Link} to={"/"}>
            Повернутись на головну
          </Button>
        </div>
      </ModalCore>
    </Box>
  );
};

export default NotFound;
