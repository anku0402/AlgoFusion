import React, { useState } from "react";
import "../Stylesheets/SignUp.css";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { connect } from "react-redux";
import { login } from "../Redux/actions/login";
import { useNavigate } from "react-router-dom";
import SignupFunction from "../Utils/SignupFunction";
import loginFunction from "../Utils/loginFunction";

function SignUp({ login }) {
  const navigate = useNavigate();
  const [classList, setClassList] = useState("container");

  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] =
    useState(false);
  const [showComment, setShowComment] = useState({
    password: false,
    confirmPassword: false,
  });

  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    leetcode: "",
    codeforces: "",
    photo: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loginUser, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    setSignUp({ ...signUp, [evt.target.name]: [evt.target.value] });
  };

  const handleLoginChange = (evt) => {
    setLogin({ ...loginUser, [evt.target.name]: [evt.target.value] });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickSignUpShowPassword = () =>
    setShowSignUpPassword((show) => !show);
  const handleClickSignUpConfirmShowPassword = () =>
    setShowSignUpConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div class={classList}>
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Sign in</h2>
            <TextField
              variant="outlined"
              label="Username"
              sx={{ width: "60%" }}
              name="username"
              value={loginUser.username}
              onChange={handleLoginChange}
            />

            <FormControl sx={{ m: 1, width: "60%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={loginUser.password}
                onChange={handleLoginChange}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <input
              type="submit"
              onClick={(evt)=>loginFunction(evt,login,loginUser,navigate)}
              value="Login"
              class="btn solid"
            />
          </form>
          <form action="#" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <TextField
              variant="outlined"
              label="Username"
              sx={{ width: "80%" }}
              name="username"
              value={signUp.username}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="First Name"
              sx={{ width: "80%", marginTop: "10px" }}
              value={signUp.firstName}
              name="firstName"
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="Last Name"
              sx={{ width: "80%", marginTop: "10px" }}
              value={signUp.lastName}
              name="lastName"
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="LeetCode Handle"
              value={signUp.leetcode}
              name="leetcode"
              sx={{ width: "80%", marginTop: "10px" }}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="CodeForces Handle"
              value={signUp.codeforces}
              name="codeforces"
              sx={{ width: "80%", marginTop: "10px" }}
              onChange={handleChange}
              required
            />

            <FormControl sx={{ m: 3, width: "80%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Set Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showSignUpPassword ? "text" : "password"}
                value={signUp.password}
                onChange={handleChange}
                required
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickSignUpShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Set Password"
              />
              {showComment.password && (
                <FormHelperText>
                  Password Must Be Of Minimum length 5
                </FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ m: 1, width: "80%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showSignUpConfirmPassword ? "text" : "password"}
                value={signUp.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickSignUpConfirmShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showSignUpConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              {showComment.confirmPassword && (
                <FormHelperText>
                  Passwords and Confirm Password Didn't Match
                </FormHelperText>
              )}
            </FormControl>
            <input
              type="submit"
              onClick={(evt)=>SignupFunction(evt,signUp,showComment,setShowComment)}
              class="btn"
              value="Sign up"
            />
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New To AlgoFusion ?</h3>
            <p style={{ margin: "20px 0" }}>
              Unlock Your Coding Potential with Algofusion: Where Your Code
              Meets Performance, and Your Stats Tell the Story!
            </p>
            <button
              class="btn transparent"
              onClick={() => setClassList("container sign-up-mode")}
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p style={{ margin: "20px 0" }}>
              Welcome Back to Algofusion! Your Coding Journey Continues Here.
            </p>
            <button
              class="btn transparent"
              id="sign-in-btn"
              onClick={() => setClassList("container")}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ user: state.loginReducer });
const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
