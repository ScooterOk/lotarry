import React, { useState } from "react";
import styles from "./style.module.scss";
import { useGetSessionsListQuery } from "../../core/services/data/dataApi";
import {
  Backdrop,
  Button,
  CircularProgress,
  Pagination,
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
  const [options, setOptions] = useState({
    page: 0,
    size: 10,
  });

  const {
    data: sessionsList,
    refetch,
    isFetching,
  } = useGetSessionsListQuery(options);
  const [isShowDeleteSession, setisShowDeleteSession] = useState(false);
  const [deleteSession, setDeleteSession] = useState(523);

  const handlePageChange = (_, page) => {
    setOptions((prev) => ({
      ...prev,
      page: page - 1,
    }));
  };

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
          {sessionsList ? (
            sessionsList?.totalItems
          ) : (
            <CircularProgress size={20} color="inherit" />
          )}
          )
        </h1>
      </Stack>
      {sessionsList?.totalPages > 1 && (
        <Pagination
          count={sessionsList?.totalPages}
          page={options.page + 1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          sx={{
            mt: 2,
            mb: 2,
            pr: 4,
            "& .MuiPagination-ul": {
              justifyContent: "flex-end",
              li: {
                "& *": {
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: "600",
                },
                "& .Mui-selected": {
                  backgroundColor: "#fff",
                  color: "#000",
                },
              },
            },
          }}
        />
      )}

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
            {sessionsList?.data?.map((row) => (
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
      {sessionsList?.totalPages > 1 && (
        <Pagination
          count={sessionsList?.totalPages}
          page={options.page + 1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          sx={{
            mt: 2,
            mb: 2,
            pr: 4,
            "& .MuiPagination-ul": {
              justifyContent: "flex-end",
              li: {
                "& *": {
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: "600",
                },
                "& .Mui-selected": {
                  backgroundColor: "#fff",
                  color: "#000",
                },
              },
            },
          }}
        />
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
