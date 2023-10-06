import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

export default function ContestsCard({ p, ind , fetchProblems }) {
    const getTime = (t) => {
        return t / 3600;
      };
      const getDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
    
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      };
      const getRelativeTime = (timestamp) => {
        const hours = Math.floor(timestamp/3600)
        timestamp = timestamp%3600
        const minutes = Math.floor(timestamp/60)
        timestamp = timestamp%60
        const sec =timestamp;
        const str = `${hours} Hrs ${minutes} min ${sec} seconds`
        return str
      }
    //   console.log(p)
  return (
    <Card variant="outlined" sx={{ width: "350px", margin: "10px" , backgroundColor: (ind%2===0) ? '#AEE2FF' : "#B9F3E4" }} key={ind}>
      <CardContent>
        <Typography variant="h6" component="div">
          {p.name}
        </Typography>
        <Stack
          spacing={4}
          direction="row"
          width="100%"
          sx={{ justifyContent: "flex-start", marginTop: "10px" }}
        >
          <Stack direction="row">
            <Typography variant="data2" sx={{ fontWeight: "600" }}>
              ContestId:{" "}
            </Typography>
            <Typography variant="data1">{p.id}</Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="data2" sx={{ fontWeight: "600" }}>
              Type:{" "}
            </Typography>
            <Typography variant="data1"> {p.type}</Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={4}
          direction="row"
          width="100%"
          sx={{ justifyContent: "flex-start", marginTop: "10px" }}
        >
          <Stack direction="row">
            <Typography variant="data2" sx={{ fontWeight: "600" }}>
              Duration:{" "}
            </Typography>
            <Typography sx={{ marginLeft: "5px" }} variant="data1">
              {" "}
              {getTime(p.durationSeconds)} Hours
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="data2" sx={{ fontWeight: "600" }}>
              Date:{" "}
            </Typography>
            <Typography sx={{ marginLeft: "5px" }} variant="data1">
              {" "}
              {getDate(p.startTimeSeconds)}
            </Typography>
          </Stack>
        </Stack>
        {p.phase==='BEFORE' && <Stack
          spacing={4}
          direction="row"
          width="100%"
          sx={{ justifyContent: "flex-start", marginTop: "10px" }}
        >
          <Stack direction="row">
            <Typography variant="data2" sx={{ fontWeight: "600" }}>
              Time Remaining:{" "}
            </Typography>
            <Typography sx={{ marginLeft: "5px" }} variant="data1">
              {" "}
              {getRelativeTime(-1 * p.relativeTimeSeconds)}
            </Typography>
          </Stack>
        </Stack>}
      </CardContent>
      <CardActions>
        <Button sx={{color: '#D80032'}} href={p.phase==='BEFORE' ? `https://codeforces.com/contests` : `https://codeforces.com/contestRegistration/${p.id}/virtual/true`} target="_blank">
          {p.phase==='BEFORE' ? `Register To Contest` : `Virtually Participate`}
        </Button>
      </CardActions>
      <CardActions>

        {p.phase!=='BEFORE' && <Button sx={{color: '#6C3428'}} onClick={()=>fetchProblems(ind)}>Get Problems</Button>}
      </CardActions>
    </Card>
  );
}
