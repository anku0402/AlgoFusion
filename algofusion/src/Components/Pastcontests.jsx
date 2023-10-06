import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ContestsCard from "./ContestsCard";
import CodeforcesPastContestQuestions from "../Utils/CodeforcesPastContestQuestions";
import CodeforcesPastContests from "../Utils/CodeforcesPastContests";
import Loader from "./Loader";

export default function Pastcontests() {
  const [search, setSearch] = useState("");
  const [contests, setContests] = useState([]);
  const [showContests, setShowContests] = useState([]);
  const [val, setVal] = useState({ ind: -1, problem: [], contest: {} });
  const [width, setWidth] = useState(100);
  const [showLoader, setShowLoader] = useState(true);

  const fetchProblems = async (ind) => {
    if (ind !== val.ind) {
      setWidth(55);
      setVal({ ...val, ind: -1 });
      const json = await CodeforcesPastContestQuestions(
        ind,
        setVal,
        contests,
        showContests
      );
      if (!json.success) {
        alert("An Error Occured");
        setWidth(100);
      }
    }
  };

  const handleChange = (evt) => {
    if (search === "") {
      const arr = contests;
      const brr = arr.splice(0, 50);
      setShowContests(brr);
    } else {
      const arr = contests.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
      const brr = arr.splice(0, 50);
      setShowContests(brr);
    }
  };

  const handleClose = () => {
    setWidth(100);
    setVal({ ...val, ind: -1 });
  };

  const fetchData = async (c = 1000) => {
    setShowLoader(true);
    const json = await CodeforcesPastContests(c, setContests, setShowContests);
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
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              id="outlined-basic"
              label="Filter Contest By Title"
              variant="outlined"
              sx={{ width: "50%" }}
            />
            <Button
              onClick={handleChange}
              variant="contained"
              size="large"
              sx={{ height: "55px" }}
            >
              Search
            </Button>
          </Stack>

          <Stack
            spacing={1}
            sx={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            direction="row"
          >
            <Stack
              spacing={1}
              sx={{
                width: `${width}%`,
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "500px",
                overflow: "hidden",
                overflowY: "scroll",
              }}
              direction="row"
              elevation={4}
            >
              {showContests.map((p, ind) => (
                <Stack sx={{ padding: "10px" }} key={ind}>
                  <ContestsCard p={p} ind={ind} fetchProblems={fetchProblems} />
                </Stack>
              ))}
              {showContests.length < contests.length && (
                <Stack
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: "30px",
                    marginTop: "50px",
                  }}
                  direction="row"
                >
                  <Button
                    variant="contained"
                    onClick={() =>
                      setShowContests(
                        contests.splice(0, showContests.length + 50)
                      )
                    }
                    sx={{ width: "20%", marginTop: "30px" }}
                  >
                    Load More..
                  </Button>
                </Stack>
              )}
            </Stack>
            <Stack
              spacing={1}
              sx={{
                width: `${98 - width}%`,
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              direction="row"
            >
              {val.ind === -1 && width < 90 && (
                <Stack>
                  <Typography variant="h6" sx={{ fontWeight: "300" }}>
                    Loading...
                  </Typography>
                </Stack>
              )}
              {width < 90 && val.ind !== -1 && (
                <Stack
                  spacing={1}
                  sx={{
                    width: `100%`,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: "500px",
                    overflowY: "scroll",
                    padding: "10px",
                  }}
                  direction="column"
                >
                  <Stack
                    sx={{
                      width: "100%",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      paddingBottom: "20px",
                    }}
                  >
                    <Stack
                      sx={{
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#00337C",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderRadius: "5px",
                      }}
                      direction="row"
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          width: "100%",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {val.contest.name}
                      </Typography>
                    </Stack>
                  </Stack>
                  {val.problem.map((p, ind) => (
                    <Stack
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Accordion
                        sx={{ width: "100%", backgroundColor: "#5BC0F8" }}
                        elevation={4}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography variant="h5" sx={{ textAlign: "center" }}>
                            {p.name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: "#B9E9FC" }}>
                          <Stack
                            sx={{
                              justifyContent: "space-evenly",
                              alignItems: "flex-start",
                              flexWrap: "wrap",
                            }}
                            width="100%"
                            direction="column"
                          >
                            {p.points && (
                              <Typography variant="data1" gutterBottom>
                                ({p.points} points Question)
                              </Typography>
                            )}
                            <Stack
                              sx={{
                                width: "80%",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                              direction="row"
                            >
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: "200" }}
                              >
                                Index :{" "}
                                <Typography variant="data1">
                                  {p.index}
                                </Typography>
                              </Typography>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: "200" }}
                              >
                                Rating :{" "}
                                <Typography variant="data5">
                                  {p.rating}
                                </Typography>
                              </Typography>
                            </Stack>
                            <Typography variant="h6" sx={{ fontWeight: "200" }}>
                              Related Topics :{" "}
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
                            <Stack>
                              <Typography variant="h6">
                                Problem Link :{" "}
                              </Typography>
                              <Link
                                href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`}
                                target="_blank"
                              >
                                <Button>Go To Problem</Button>
                              </Link>
                            </Stack>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    </Stack>
                  ))}

                  <Stack
                    sx={{
                      paddingTop: "20px",
                      width: "100%",
                      paddingBottom: "50px",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      color="error"
                      onClick={handleClose}
                    >
                      Close Problems
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
}
