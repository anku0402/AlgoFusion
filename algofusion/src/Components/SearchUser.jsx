import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

import { connect } from "react-redux";
import CodeforcesSearchUsers from "../Utils/CodeforcesSearchUsers";
import CodeforcesUserContestHistory from "../Utils/CodeforcesUserContestHistory";
import CodeforcesUserContestsDetails from "./CodeforcesUserContestsDetails";
import Loader from "./Loader";

function SearchUser({ user }) {
  const [handle, setHandle] = useState(user.codeforcesHandle);
  const [userInfo, setUserInfo] = useState({
    rating: 0,
    maxRating: 0,
    titlePhoto: "",
    rank: "",
    handle: "",
    avatar: "",
    maxRank: "",
    friends: 0,
    contribution: 0,
    registered: "",
    lastOnline: "",
  });
  const [contests, setContests] = useState([]);
  const [showContests, setShowContests] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const fetchData2 = async () => {
    CodeforcesUserContestHistory(handle, setContests);
  };
  const handleShowContests = () => {
    setShowContests(!showContests);
    if (contests.length === 0) fetchData2();
  };

  const fetchData = async () => {
    setShowLoader(true);
    contests.length = 0;
    setShowContests(false);
    const json = await CodeforcesSearchUsers(handle, setUserInfo);
    if (!json.success) {
      alert("An Error Occured");
    }else{
      setShowLoader(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      {showLoader ? <Loader/> : 
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
            value={handle}
            onChange={(evt) => {
              setHandle(evt.target.value);
            }}
            variant="outlined"
          />
          <Button
            onClick={() => fetchData()}
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
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
                width="45%"
                direction="row"
                my={5}
              >
                <Typography variant="h5" gutterBottom>
                  Username :{" "}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ textDecoration: "underline", fontSize: "x-large" }}
                >
                  {userInfo.handle}
                </Typography>
              </Stack>
              <Stack
                spacing={1}
                sx={{ alignItems: "center", justifyContent: "center" }}
                width="45%"
                direction="row"
                my={2}
              >
                <img
                  src={userInfo.titlePhoto}
                  style={{
                    height: "150px",
                    width: "150px",
                    border: "1px solid black",
                    padding: "10px",
                  }}
                />
              </Stack>
              <Stack
                spacing={1}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
                width="45%"
                direction="row"
                my={2}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "400" }}
                >
                  Rating :{" "}
                </Typography>
                <Typography variant="subtitle2">{userInfo.rating}</Typography>
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
                  sx={{ fontWeight: "400" }}
                >
                  Max-Rating :{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {userInfo.maxRating}
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
                  sx={{ fontWeight: "400" }}
                >
                  Rank :{" "}
                </Typography>
                <Typography variant="subtitle2">{userInfo.rank}</Typography>
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
                  sx={{ fontWeight: "400" }}
                >
                  Max-Rank :{" "}
                </Typography>
                <Typography variant="subtitle2">{userInfo.maxRank}</Typography>
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
                  sx={{ fontWeight: "400" }}
                >
                  Friends Of :{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {userInfo.friends} users
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
                  sx={{ fontWeight: "400" }}
                >
                  Contributions :{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {userInfo.contribution}
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
                  sx={{ fontWeight: "400" }}
                >
                  Registered :{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {userInfo.registered} Moths Earlier
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
                  sx={{ fontWeight: "400" }}
                >
                  Last Seen :{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {userInfo.lastOnline}
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
          }}
          width="100%"
          direction="column"
          my={2}
        >
          {showContests && contests.length === 0 && (
            <Typography sx={{ paddingBottom: "20px" }}>Loading...</Typography>
          )}
          {showContests && contests.length > 0 && (
            <CodeforcesUserContestsDetails contests={contests} />
          )}
          <Button
            sx={{ width: "200px", height: "50px", color: "#3D0C11" }}
            onClick={handleShowContests}
          >
            {!showContests ? "See Contest Details" : "Hide Contest Details"}
          </Button>
        </Stack>
      </>}
    </div>
  );
}

const mapStateToProps = (state) => ({ user: state.loginReducer });
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
