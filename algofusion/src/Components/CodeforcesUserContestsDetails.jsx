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
  { id: "name", label: "Contest Name", minWidth: 100, align: "center" },
  { id: "oldRating", label: "Old Rating", minWidth: 100, align: "center" }, // Corrected column ID
  { id: "newRating", label: "New Rating", minWidth: 100, align: "center" },
  { id: "rank", label: "Rank", minWidth: 100, align: "center" },
  { id: "date", label: "Rating Update Time", minWidth: 100, align: "center" },
];

function createData(name, oldRating, newRating, rank, date) { // Corrected parameter names
    return { name, oldRating, newRating, rank, date }; // Corrected property names
  }


export default function CodeforcesUserContestsDetails({ contests }) {
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
    for (let i = contests.length-1; i >= 0; i--) {
        console.log(contests[i].oldRating)
      newarray.push(createData(contests[i].contestName,contests[i].oldRating,contests[i].newRating,contests[i].rank,formatDateFromTimestamp(contests[i].ratingUpdateTimeSeconds)));
    }
    setRows(newarray)
  }, []);
  return (
    <Paper sx={{ width: "80%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5} sx={{minWidth: columns[0].width,backgroundColor: '#191D88',color: '#fff',fontSize: 'x-large'}}>
                User Contests Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column,ind) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor: '#2192FF',color: '#fff',fontSize: 'larger',borderRight: ind!==4 ? '1px solid #fff': '' }}
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
                          { value}
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
