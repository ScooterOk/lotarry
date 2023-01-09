import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import bg from "../../assets/img/bg.webm";
import ModalCore from "../../components/ModalCore";

const Home = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const result = [];
    for (let i = 1; i < 1001; i++) {
      result.push({
        name: i,
        cliced: false,
      });
    }
    setList(result);
  }, []);

  console.log("list", list);

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
      <video autoPlay muted loop id="video">
        <source src={bg} type="video/mp4" />
      </video>
      <Grid container spacing={2} flexWrap={"wrap"}>
        {list.map((item, index) => (
          <Grid item xs={1} textAlign={"center"} key={`key-list-${item.name}`}>
            <Button
              disabled={item === 30}
              variant={"contained"}
              size={"large"}
              color={item.cliced ? "success" : "primary"}
              onClick={() => {
                console.log("item", item);
                setList((prev) => {
                  return prev.map((item, i) => {
                    if (i === index) {
                      return {
                        ...item,
                        cliced: true,
                      };
                    }
                    return item;
                  });
                });
              }}
              sx={{
                minWidth: 100,
                fontSize: 28,
              }}
            >
              {item.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
