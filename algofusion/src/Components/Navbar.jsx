import React, { useState } from "react";
import CodeIcon from "@mui/icons-material/Code";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../Redux/actions/login";
import LoginToken from "../Utils/LoginToken";

function Navbar({ user, login, logout }) {
  const navigate = useNavigate();
  const redirectTo = (url) => {
    navigate(url);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
  };
  const handleClick2 = (evt) => {
    setAnchorEl2(evt.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    localStorage.removeItem("AlgoFusionLoginToken");
  };
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          onClick={() => redirectTo("/")}
          color="inherit"
        >
          <CodeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AlgoFusion
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => redirectTo("/leetcode")}>
            Leetcode
          </Button>
          <Button
            sx={{
              display: {
                xs: "none",
                sm: "none",
                medium: "none",
                lg: "block",
              },
            }}
            color="inherit"
            onClick={() => redirectTo("/codeforces/pastcontests")}
          >
            Previous Contests
          </Button>
          <Button
            sx={{
              display: {
                xs: "none",
                sm: "none",
                medium: "none",
                lg: "block",
              },
            }}
            color="inherit"
            onClick={() => redirectTo("/codeforces/problemset")}
          >
            Problems
          </Button>
          <Button
            sx={{
              display: {
                xs: "none",
                sm: "none",
                medium: "none",
                lg: "block",
              },
            }}
            color="inherit"
            onClick={() => redirectTo("/codeforces/searchuser")}
          >
            Search User
          </Button>
          <Button
            sx={{
              display: {
                xs: "none",
                sm: "none",
                medium: "none",
                lg: "block",
              },
            }}
            color="inherit"
            onClick={() => redirectTo("/codeforces/upcomingcontests")}
          >
            Upcoming Contests
          </Button>
          <Button
            sx={{
              display: {
                xs: "block",
                lg: "none",
              },
            }}
            color="inherit"
            id="resources-button"
            onClick={handleClick}
            aria-controls={open ? "resources-menu" : undefined}
          >
            CodeForces
          </Button>
          {user.firstName.length > 0 ? (
            <Avatar
              id="avatar-button"
              onClick={handleClick2}
              style={{ cursor: "pointer" }}
              aria-controls={open2 ? "avatar-menu" : undefined}
              {...stringAvatar(user.firstName)}
            />
          ) : (
            <Avatar
              alt="U"
              id="avatar-button"
              onClick={handleClick2}
              style={{ cursor: "pointer" }}
              aria-controls={open2 ? "avatar-menu" : undefined}
              src="https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284796-stock-illustration-person-gray-photo-placeholder-man.jpg"
            />
          )}
        </Stack>
        <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            "aria-labelledby": "resources-button",
          }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClose={handleClose}>Previous Contests</MenuItem>
          <MenuItem onClose={handleClose}>Problems</MenuItem>
          <MenuItem onClose={handleClose}>Search User</MenuItem>
          <MenuItem onClose={handleClose}>Upcoming Contests</MenuItem>
        </Menu>
        {user.isLoggedIn ? (
          <Menu
            id="avatar-menu"
            anchorEl={anchorEl2}
            open={open2}
            MenuListProps={{
              "aria-labelledby": "avatar-button",
            }}
            onClose={handleClose2}
          >
            <MenuItem onClose={handleClose2}>Edit Profile</MenuItem>
            <MenuItem onClose={handleClose2} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            id="avatar-menu"
            anchorEl={anchorEl2}
            open={open2}
            MenuListProps={{
              "aria-labelledby": "avatar-button",
            }}
            onClose={handleClose2}
          >
            <MenuItem
              onClose={handleClose2}
              sx={{ width: "100px" }}
              onClick={() => LoginToken(login, navigate)}
            >
              Login
            </MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({ user: state.loginReducer });
const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  logout: (user) => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
