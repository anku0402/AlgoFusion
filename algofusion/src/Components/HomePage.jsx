import React from "react";
import Navbar from "./Navbar";
import "../Stylesheets/HomePage.css";
import TypingEffect from "./TypingEffect";
import { Button, Paper, Stack } from "@mui/material";
import HomePageFeaturesCard from "./HomePageFeaturesCard";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const quotes = [
    "Coding is the closest thing we have to a superpower. Don't stop honing your skills.",
    "Every line of code you write is a step closer to changing the world.",
    "The best way to predict the future is to code it.",
    "Coding is the art of turning ideas into reality, one line at a time.",
    "Embrace the bugs, for they are the stepping stones to success in coding.",
    "The only way to do great work is to love what you code.",
    "Coding is a journey, not a destination. Keep exploring.",
    "Success in coding comes to those who persevere through the toughest errors.",
    "Coding is not just about building software; it's about building a better future.",
    "Challenge yourself with new coding problems every day, and you'll become unstoppable.",
    "Your code can change the world. Keep coding, keep dreaming.",
    "Mistakes in coding are the portals to discovery. Keep making them.",
    "Coding is like art. The more you create, the more you learn, and the better you become.",
    "Coding is not a sprint; it's a marathon. Stay persistent.",
    "The future belongs to those who code it. Keep coding, and you'll shape the world.",
    "Coding is a puzzle, and you're the one solving it. Keep unlocking your potential.",
    "Don't be afraid to dream big and code even bigger.",
    "Coding is the language of the future. Don't miss out on the conversation.",
    "Coding is not about being the best; it's about being better than you were yesterday.",
    "The code you write today is the legacy you leave for tomorrow.",
  ];
  const navigate = useNavigate();
  const redirectTo = (url)=>{
    navigate(url)
  }
  return (
    <div>
      <Navbar />
      <div className="homeTop">
        <div className="MainContent">
          <div className="MainContentHeader">
            Start You'r Coding Journey Today!! <br /> With AlgoFusion
          </div>
          <div className="MainContentDescription">
            Let Algofusion be your compass on the coding journey, tracking your
            Codeforces and LeetCode progress to guide you towards programming
            excellence.
          </div>
        </div>
        <div className="ImageHomeTopCon">
          <img
            src="https://img.freepik.com/premium-photo/young-student-wearing-headphone-desk-monitor-modern-character-design-generated-ai_275780-229.jpg"
            alt=""
          />
        </div>
        <div className="MainContentTypingEffect">
          <TypingEffect
            words={quotes}
            styles={{
              color: "#3F2305",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "95%",
              height: "80px",
              fontSize: "30px",
              backgroundColor: "#E8F9FD",
              border: "7px solid #13005A",
              padding: "10px",
              borderRadius: "20px",
              margin: "5px",
            }}
          />
        </div>
      </div>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            marginTop: "50px",
            paddingBottom: '20px',
            width: "95%",
            backgroundColor: "#B9E9FC",
            flexWrap: "wrap",
          }}
        >
          <div className="HomePageFeatures">Features Offered : -</div>

          <Stack
            sx={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            direction="row"
          >
            <HomePageFeaturesCard
              img="https://leetcode.com/static/images/LeetCode_Sharing.png"
              title="Leetcode Profile Analysis"
              description="Algofusion Allows Users To View Their Progress On leetcode's Platform"
            />
            <HomePageFeaturesCard
              img="https://repository-images.githubusercontent.com/390296311/0f6c1240-462e-47ff-870d-e2d0ebb181f1"
              title="Codeforces Profile"
              description="Algofusion Allows Users To View Their Progress On Codeforces' Platform"
            />
            <HomePageFeaturesCard
              img="https://pbs.twimg.com/media/E6eV2NnUYAEZv5E.jpg"
              title="Upcoming Contests"
              description="Through AlgoFusion users can track the upcoming contests on CodeForces"
            />
          </Stack>
          <Stack
            sx={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: "20px",
            }}
            direction="row"
          >
            <HomePageFeaturesCard
              img="https://play-lh.googleusercontent.com/WsR_f03nbqW3qZjCZeXUYmnmhSWXo3hQhLX9hgl9QHydCgbXQi_VJeAwnmtuIgTHKdQ"
              title="Previous Contests"
              description="Through AlgoFusion users can See All The PastContests and Go To the problems"
            />
            <HomePageFeaturesCard
              img="https://cf.kira924age.com/ogp.png"
              title="Problemsets"
              description="Through AlgoFusion users can solve the problems of codeforces"
            />
          </Stack>
        </Paper>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#78C1F3",
          height: "400px",
          marginBottom: "20px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        direction="row"
      >
        <img
          className="mainpagefeaturesimages"
          src="https://i.redd.it/nvxfhhyss7s91.png"
          alt=""
        />
        <div className="mainpagefeaturesdes">
          <div className="mainpagefeaturesdestitle">
            Every solved problem on LeetCode is a building block of your coding
            expertise. Keep stacking them, and you'll reach new heights.
          </div>
          <div className="mainpagefeaturesdesmain">
            <div className="head">Facilities Offered :- </div>
            <ul>
              <li className="mainpagefeaturesdesli">
                Track number of problems solved on Leetcode
              </li>
              <li className="mainpagefeaturesdesli">
                Track the tag wise problem solved on leetcode
              </li>
              <li className="mainpagefeaturesdesli">
                Track the number of submissions done everyday
              </li>
              <li className="mainpagefeaturesdesli">
                Search Your Friend's Profile To track their progress also
              </li>
            </ul>
          </div>
          <Button variant="contained" onClick={()=>redirectTo('/leetcode')} size="large">
            Go To Leetcode Page
          </Button>
        </div>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#78C1F3",
          height: "400px",
          marginBottom: "20px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        direction="row"
      >
        <div className="mainpagefeaturesdes">
          <div className="mainpagefeaturesdestitle">
            Tracking your Codeforces ID is like keeping a diary of your coding
            conquests. Each entry is a testament to your growth.
          </div>
          <div className="mainpagefeaturesdesmain">
            <div className="head">Facilities Offered :- </div>
            <ul>
              <li className="mainpagefeaturesdesli">
                Track your ratings and rank on codeforces.
              </li>
              <li className="mainpagefeaturesdesli">
                Track the contests given by you and analyze the rating changes.
              </li>
              <li className="mainpagefeaturesdesli">
                Search users registered on codeforces and compare yourself with
                them.
              </li>
            </ul>
          </div>
          <Button variant="contained" onClick={()=>redirectTo('/codeforces/searchuser')} size="large">
            Go To Search User's Page
          </Button>
        </div>
        <img
          className="mainpagefeaturesimages"
          src="https://codeforces.com/predownloaded/15/77/15773944ee6b5f6e17b9a0debc10188ea5494d93.png"
          alt=""
        />
      </Stack>
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#78C1F3",
          height: "400px",
          marginBottom: "20px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        direction="row"
      >
        <img
          className="mainpagefeaturesimages"
          src="https://codeforces.com/predownloaded/07/6a/076a643ef3eaa6f4229421ccab757c1a63cad09e.jpg"
          alt=""
        />
        <div className="mainpagefeaturesdes">
          <div className="mainpagefeaturesdestitle">
            Codeforces contests are not just competitions; they are
            opportunities to test your skills, learn, and grow.
          </div>
          <div className="mainpagefeaturesdesmain">
            <div className="head">Facilities Offered :- </div>
            <ul>
              <li className="mainpagefeaturesdesli">
                See The Lists Of Upcoming Contests, and plan accordingly.
              </li>
              <li className="mainpagefeaturesdesli">
                Track The Time Left Before any contest starts.
              </li>
              <li className="mainpagefeaturesdesli">
                Register To the contest To test your coding skills.
              </li>
            </ul>
          </div>
          <Button variant="contained" onClick={()=>redirectTo('/codeforces/upcomingcontests')} size="large">
            Go To Upcoming Contest's Page
          </Button>
        </div>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#78C1F3",
          height: "400px",
          marginBottom: "20px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        direction="row"
      >
        <div className="mainpagefeaturesdes">
          <div className="mainpagefeaturesdestitle">
            Each unsolved problem from the past is a puzzle waiting to be
            conquered. Dive in, and let your code be the key.
          </div>
          <div className="mainpagefeaturesdesmain">
            <div className="head">Facilities Offered :- </div>
            <ul>
              <li className="mainpagefeaturesdesli">
                Get A List Of Previous Contests Held On Codeforces platform.
              </li>
              <li className="mainpagefeaturesdesli">
                Search The Contests You Want Based On Your Skills.
              </li>
              <li className="mainpagefeaturesdesli">
                An Opportunity To Participate Virtually In the contest.
              </li>
              <li className="mainpagefeaturesdesli">
                Get Problems Which came in each contest, Along With thier
                related topics.
              </li>
            </ul>
          </div>
          <Button variant="contained" onClick={()=>redirectTo('/codeforces/pastcontests')} size="large">
            Go To Previous Contest's Page
          </Button>
        </div>
        <img
          className="mainpagefeaturesimages"
          src="https://codeforces.com/predownloaded/a0/f3/a0f3d2e70ee0c30a18083eaf5513df399c7f6875.png"
          alt=""
        />
      </Stack>
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#78C1F3",
          height: "400px",
          marginBottom: "20px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        direction="row"
      >
        <img
          className="mainpagefeaturesimages"
          src="https://lh3.googleusercontent.com/Q9y399bg9_H3UrMt6BwJKUDLBBpiVpVXAj3dVl0M7lcudD3-Q-3cYYsmorgithABt_1NGZwx=w640-h400-e365"
          alt=""
        />
        <div className="mainpagefeaturesdes">
          <div className="mainpagefeaturesdestitle">
            In the world of coding, every problem solved on Codeforces is a step
            closer to becoming a coding virtuoso.
          </div>
          <div className="mainpagefeaturesdesmain">
            <div className="head">Facilities Offered :- </div>
            <ul>
              <li className="mainpagefeaturesdesli">
                Get the list of all problems present on Codeforces.
              </li>
              <li className="mainpagefeaturesdesli">
                Sort The Problems Based On Topics Which You Want To Practice.
              </li>
              <li className="mainpagefeaturesdesli">
                The Difficulty of the problems are also shown to help you to be motivated.
              </li>
            </ul>
          </div>
          <Button variant="contained" onClick={()=>redirectTo('/codeforces/problemset')} size="large">
            Go To Problem's Page
          </Button>
        </div>
      </Stack>
    </div>
  );
}
