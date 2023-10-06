import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Stack, Typography } from "@mui/material";
import ContestsCard from "./ContestsCard";
import UpcomingContestsRoute from "../Utils/UpcomingContestsRoute";
import Loader from "./Loader";

export default function UpcomingContests() {
  const [contests, setContests] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  const fetchData = async () => {
    setShowLoader(true);
    const json = await UpcomingContestsRoute(setContests);
    if (json.success) setShowLoader(false);
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
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              margin: "15px 0",
            }}
            direction="row"
          >
            <Typography variant="h3">Lists Of Upcoming Contests</Typography>
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
            {contests.map((p, ind) => (
              <Stack sx={{ padding: "10px" }} key={ind}>
                <ContestsCard p={p} ind={ind} />
              </Stack>
            ))}
          </Stack>
        </>
      )}
    </div>
  );
}
