import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EmployeeTable = (props) => {
  const employeeData = props.data;

  const firstTable = [
    { em: "EmployeeID", pr: "ProjectID", start: "StarDate", end: "EndDate" },
  ];
  const finalTable = [
    {
      em1: "EmployeeID",
      em2: "EmployeeID",
      pr: "ProjectID",
      pair: "Days worked",
    },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {employeeData.length >= 5
              ? firstTable.map((el) => (
                  <TableRow>
                    <TableCell>{el.em}</TableCell>
                    <TableCell align="right">{el.pr}</TableCell>
                    <TableCell align="right">{el.start}</TableCell>
                    <TableCell align="right">{el.end}</TableCell>
                  </TableRow>
                ))
              : finalTable.map((el) => (
                  <TableRow>
                    <TableCell>{el.em1}</TableCell>
                    <TableCell align="right">{el.em2}</TableCell>
                    <TableCell align="right">{el.pr}</TableCell>
                    <TableCell align="right">{el.pair}</TableCell>
                  </TableRow>
                ))}
          </TableHead>
          <TableBody>
            {employeeData.length > 4
              ? employeeData.map((row) => (
                  <TableRow
                    key={Math.random()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row[0]}
                    </TableCell>
                    <TableCell align="right">{row[1]}</TableCell>
                    <TableCell align="right">{row[2]}</TableCell>
                    <TableCell align="right">{row[3]}</TableCell>
                  </TableRow>
                ))
              : employeeData.map((row) => (
                  <TableRow
                    key={Math.random()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row[0]}
                    </TableCell>
                    <TableCell align="right">{row[1]}</TableCell>
                    <TableCell align="right">{row[2]}</TableCell>
                    <TableCell align="right">{row[3]}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeTable;
