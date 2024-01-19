import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { IconArrowUp, IconArrowDown } from "../../components/icons";
import dayjs from "dayjs";

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  const gamesCount = useMemo(() => row?.attempts?.length || 0, [row]);
  const attemptsCount = useMemo(
    () =>
      row?.attempts?.reduce(
        (previousValue, currentValue) =>
          previousValue + (currentValue?.memberSelects?.length || 0),
        0
      ),
    [row]
  );

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <IconArrowUp /> : <IconArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <p>{row.number}</p>
        </TableCell>
        <TableCell>
          <Typography fontSize={13} fontWeight={700}>
            {dayjs(row.startTime).format("DD.MM.YYYY HH:MM")}
            {!!row.finishTime &&
              ` - ${dayjs(row.finishTime).format("DD.MM.YYYY HH:MM")}`}
          </Typography>
        </TableCell>
        <TableCell align="center">{gamesCount}</TableCell>
        <TableCell align="center">{attemptsCount}</TableCell>
        <TableCell
          align="center"
          sx={{
            color: "success.main",
          }}
        >
          <b>{row?.winMember?.name || "-"}</b>
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          backgroundColor: "#f8f8f8",
        }}
      >
        <TableCell
          sx={{
            pt: open ? 2 : 0,
            pb: open ? 2 : 0,
            pl: 4,
            pr: 4,
            boxShadow: open
              ? "inset 0px 0px 6px 0 rgba(0, 0, 0, 0.05)"
              : "inset 0px 0px 0 0 rgba(0, 0, 0, 0)",
            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography
                variant="h6"
                gutterBottom
                component="div"
                fontSize={16}
              >
                Розіграш #{row.number} ({row?.memberSelects?.length || 0})
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Спроба </TableCell>
                    <TableCell>Імʼя</TableCell>
                    <TableCell>Телефон</TableCell>
                    <TableCell>Кількість спроб</TableCell>
                    <TableCell>Номери</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.attempts?.map((attemp, index) => (
                    <TableRow
                      key={`key-game-${attemp.id}`}
                      sx={{
                        "& > td": {
                          border: "none",
                        },
                        "&:nth-child(odd) > td": {
                          backgroundColor: "#e6e7e7",
                        },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{attemp?.member?.name}</TableCell>
                      <TableCell>
                        <a href={`tel:${attemp?.member?.phone}`}>
                          {attemp?.member?.phone}
                        </a>
                      </TableCell>
                      <TableCell>
                        {attemp?.memberSelects?.length || 0}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction={"row"} spacing={0.5} mb={-1}>
                          {attemp?.memberSelects?.map((n) => (
                            <Chip
                              key={`key-game-${n.id}`}
                              size="small"
                              label={n.selectPosition}
                              color={n.win ? "success" : "info"}
                              sx={{
                                fontWeight: 600,
                                mb: 1,
                              }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
