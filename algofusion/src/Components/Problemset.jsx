import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ProblemList from "../Utils/ProblemList";
import Loader from "./Loader";

export default function Problemset() {
  const userIds = [
    "brute force",
    "greedy",
    "math",
    "dfs and similar",
    "dsu",
    "graphs",
    "implementation",
    "binary search",
    "bitmasks",
    "data structures",
    "dp",
    "number theory",
    "greedy",
    "geometry",
    "shortest paths",
    "constructive algorithms",
    "trees",
    "combinatorics",
    "divide and conquer",
    "two pointers",
    "flows",
    "sortings",
    "matrices",
    "games",
    "probabilities",
    "strings",
    "hashing",
    "ternary search",
  ];
  const [problems, setProblems] = useState({ problems: [], submissions: [] });
  const [show, setShow] = useState({ problems: [], submissions: [] });
  const [tags, setTags] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const handleClick = () => {
    const n = show.problems.length;
    const arr = problems.problems.slice(0, n + 50);
    const brr = problems.submissions.slice(0, n + 50);
    setShow({ problems: arr, submissions: brr });
  };
  const fetchData = async () => {
    setShowLoader(true);
    let str = "";
    tags.map((t, ind) => {
      if (ind > 0) {
        str += ";";
      }
      str += t;
    });
    const json = await ProblemList(str, setProblems, setShow);
    if (!json.success) {
      alert("An Error Occured");
    } else {
      setShowLoader(false);
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
          <Autocomplete
            multiple
            options={userIds}
            sx={{ width: "45%" }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Tags To See The Results" />
            )}
            value={tags}
            onChange={(evt, newValue) => {
              setTags(newValue);
            }}
          />
          <Button
            onClick={() => fetchData()}
            variant="contained"
            size="large"
            sx={{ height: "70%" }}
          >
            Search Questions
          </Button>
        </Stack>
        <Stack
          spacing={1}
          sx={{
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          direction="row"
        >
          {show.problems.map((p, ind) => (
            <Stack sx={{ padding: "10px" }} key={ind}>
              <Card
                variant="outlined"
                elevation={4}
                sx={{
                  width: "350px",
                  margin: "10px",
                  backgroundColor: ind % 2 === 0 ? "#AEE2FF" : "#B9F3E4",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {p.name}
                  </Typography>
                  <Typography variant="data2" component="div">
                    {" "}
                    ( {p.points} points)
                  </Typography>
                  <Stack
                    spacing={1}
                    direction="row"
                    width="100%"
                    sx={{ justifyContent: "space-between", marginTop: "10px" }}
                  >
                    <Stack direction="row">
                      <Typography variant="data2" sx={{ fontWeight: "600" }}>
                        ContestId:{" "}
                      </Typography>
                      <Typography variant="data1">{p.contestId}</Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography variant="data2" sx={{ fontWeight: "600" }}>
                        Index:{" "}
                      </Typography>
                      <Typography variant="data1"> {p.index}</Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="h6" sx={{ marginTop: "5px" }}>
                    Realted Topics :{" "}
                  </Typography>
                  <Stack
                    spacing={1}
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                    width="100%"
                    direction="row"
                  >
                    {p.tags.map((t, l) => (
                      <Typography>
                        {l === 0 && "["} {t}{" "}
                        {l === p.tags.length - 1 ? "]" : ","}
                      </Typography>
                    ))}
                  </Stack>
                  <Stack direction="row">
                    <Typography variant="data2" sx={{ fontWeight: "600" }}>
                      Number Of Submissions:{" "}
                    </Typography>
                    <Typography sx={{ marginLeft: "15px" }} variant="data1">
                      {" "}
                      {show.submissions[ind].solvedCount}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button
                    href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`}
                    target="_blank"
                    sx={{ color: "#D80032" }}
                  >
                    Go To Problem
                  </Button>
                </CardActions>
              </Card>
            </Stack>
          ))}
        </Stack>
        <Stack
          sx={{
            width: "100%",
            justifyContent: "center",
            marginBottom: "50px",
            alignItems: "center",
          }}
        >
          {problems.problems.length > show.problems.length && (
            <Button variant="outlined" size="large" onClick={handleClick}>
              Load More
            </Button>
          )}
        </Stack>
      </>}
    </div>
  );
}
