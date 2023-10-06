import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { connect } from "react-redux";
import LeetcodeRoute from "../Utils/LeetcodeRoute";
import Submissions from "./Submissions";
import Loader from "./Loader"

function Leetcode({ user }) {
  const [data, setData] = useState({
    username: "",
    totalSolve: 0,
    totalQues: 0,
    easyS: 0,
    totalEasy: 0,
    mediumS: 0,
    totalMed: 0,
    hardS: 0,
    totalHard: 0,
    acceptance: 0,
    rank: 0,
    date: [],
    submissions: [],
  });
  const [username, setUsername] = useState(user.leetcodeHandle);
  const [showLoader, setShowLoader] = useState(true);

  const fetchData = async (u = username) => {
    setShowLoader(true)
    setData({ ...data, date: [] });
    const json = await LeetcodeRoute(u, setData);
    if (!json.success) {
      alert("An Error Occured");
    }else{
      setShowLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <Stack
            spacing={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: "80px",
            }}
            my={2}
            width="100%"
            direction="row"
          >
            <TextField
              id="outlined-basic"
              label="Enter Username Of To Show Details"
              sx={{
                width: "45%",
              }}
              value={username}
              onChange={(evt) => {
                setUsername(evt.target.value);
              }}
              variant="outlined"
            />
            <Button
              onClick={() => fetchData(username)}
              variant="contained"
              size="large"
              sx={{ height: "70%" }}
            >
              Show Details
            </Button>
          </Stack>
          <Stack
            spacing={1}
            sx={{ justifyContent: "center", alignItems: "center" }}
            my={4}
            width="100%"
            direction="row"
          >
            <Paper
              sx={{ padding: "10px", width: "80%", backgroundColor: "#F3FDE8" }}
              elevation={4}
            >
              <Stack
                spacing={1}
                sx={{
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
                width="100%"
                direction="row"
                my={2}
              >
                <Stack
                  spacing={1}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingBottom: "20px",
                    paddingTop: "15px",
                  }}
                  width="45%"
                  direction="row"
                  my={5}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: "#321E1E" }}
                    gutterBottom
                  >
                    Username :{" "}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#321E1E" }}>
                    {data.username}
                  </Typography>
                </Stack>
                <Stack
                  spacing={1}
                  sx={{ alignItems: "center" }}
                  width="45%"
                  direction="row"
                  my={2}
                >
                  <Typography variant="h6"></Typography>
                  <Typography></Typography>
                </Stack>
                <Stack
                  spacing={1}
                  sx={{ justifyContent: "flex-start", alignItems: "center" }}
                  width="45%"
                  direction="row"
                  my={2}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "400", paddingBottom: "20px" }}
                  >
                    Total Questions Solved :{" "}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ paddingBottom: "20px", paddingLeft: "10px" }}
                  >
                    {data.totalSolve}/{data.totalQues}
                  </Typography>
                </Stack>
                <Stack
                  spacing={1}
                  sx={{ justifyContent: "flex-start", alignItems: "center" }}
                  width="45%"
                  direction="row"
                  my={2}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "400", paddingBottom: "20px" }}
                  >
                    Easy Questions Solved :{" "}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ paddingBottom: "20px", paddingLeft: "10px" }}
                  >
                    {data.easyS}/{data.totalEasy}
                  </Typography>
                </Stack>
                <Stack
                  spacing={1}
                  sx={{ justifyContent: "flex-start", alignItems: "center" }}
                  width="45%"
                  direction="row"
                  my={2}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "400", paddingBottom: "20px" }}
                  >
                    Medium Questions Solved :{" "}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ paddingBottom: "20px", paddingLeft: "10px" }}
                  >
                    {data.mediumS}/{data.totalMed}
                  </Typography>
                </Stack>
                <Stack
                  spacing={1}
                  sx={{ justifyContent: "flex-start", alignItems: "center" }}
                  width="45%"
                  direction="row"
                  my={2}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "400", paddingBottom: "20px" }}
                  >
                    Rank :{" "}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ paddingBottom: "20px", paddingLeft: "10px" }}
                  >
                    {data.rank}
                  </Typography>
                </Stack>
                <Stack
                  spacing={1}
                  sx={{ justifyContent: "flex-start", alignItems: "center" }}
                  width="45%"
                  direction="row"
                  my={2}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "400", paddingBottom: "20px" }}
                  >
                    Acceptance Rate :{" "}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ paddingBottom: "20px", paddingLeft: "10px" }}
                  >
                    {data.acceptance}
                  </Typography>
                </Stack>
                <Stack
                  spacing={1}
                  sx={{ justifyContent: "flex-start", alignItems: "center" }}
                  width="45%"
                  direction="row"
                  my={2}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "400", paddingBottom: "20px" }}
                  >
                    Hard Questions Solved :{" "}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ paddingBottom: "20px", paddingLeft: "10px" }}
                  >
                    {data.hardS}/{data.totalHard}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
          <Stack
            spacing={1}
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
            width="100%"
            direction="row"
          >
            {data.date.length > 0 && (
              <Submissions date={data.date} sub={data.submissions} />
            )}
          </Stack>
          <div style={{ width: "100%", height: "10px" }}></div>
        </>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({ user: state.loginReducer });
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Leetcode);
