import React, { useState } from "react";
import styles from "./style.module.scss";
import { useGetSessionsListQuery } from "../../core/services/data/dataApi";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Row from "./Row";
import { IconArrowDirectionLeft } from "../../components/icons";
import { Link } from "react-router-dom";
import DeleteSessionModal from "./DeleteSessionModal";

const Sessions = () => {
  const { data, refetch } = useGetSessionsListQuery();
  const [isShowDeleteSession, setisShowDeleteSession] = useState(false);
  const [deleteSession, setDeleteSession] = useState(523);

  return (
    <div className={styles.sessions}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={0}
        sx={{
          "& a": {
            color: "#fff",
          },
        }}
      >
        <Button LinkComponent={Link} to={"/list"}>
          <IconArrowDirectionLeft />
        </Button>
        <h1>
          Сесії (
          {data ? data?.length : <CircularProgress size={20} color="inherit" />}
          )
        </h1>
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow
              sx={{
                th: {
                  fontSize: 16,
                },
              }}
            >
              <TableCell />
              <TableCell>#</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell align="center">Кількість ігор</TableCell>
              <TableCell align="center">Кількість спроб</TableCell>
              <TableCell align="center">Переможець</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <Row
                key={row.id}
                row={row}
                setDeleteSession={setDeleteSession}
                setisShowDeleteSession={setisShowDeleteSession}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteSessionModal
        open={isShowDeleteSession}
        setOpen={setisShowDeleteSession}
        deleteSession={deleteSession}
        refetch={refetch}
      />
    </div>
  );
};

export default Sessions;
