import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import formatDateFromTimestamp from "../Utils/formatDateFromTimeStamp";
import { useEffect } from "react";
import { useState } from "react";

const columns = [
  { id: "date", label: "Date", minWidth: 170, align: "center" },
  { id: "sub", label: "Submissions", minWidth: 100, align: "center" },
];

function createData(date, sub) {
  return { date, sub };
}


export default function Submissions({ date, sub }) {
    const [rows,setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const newarray = [];
    for (let i = 0; i < date.length; i++) {
      newarray.push(createData(formatDateFromTimestamp(date[i]), sub[i]));
    }
    setRows(newarray)
  }, []);
  return (
    <Paper sx={{ width: "80%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2} sx={{minWidth: columns[0].width,backgroundColor: '#191D88',color: '#fff',fontSize: 'x-large'}}>
                Submission Counts
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column,ind) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor: '#2192FF',color: '#fff',fontSize: 'larger',borderRight: ind===0 ? '1px solid #fff': '' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,ind) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{backgroundColor: ind%2===0 ? '#fff': '#F3FDE8',color: '#3D0C11'}}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
