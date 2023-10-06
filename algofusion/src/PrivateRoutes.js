import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Leetcode from './Components/Leetcode';
import LoginToken from './Utils/LoginToken';
import {login} from "./Redux/actions/login"
import Pastcontests from './Components/Pastcontests';
import Problemset from './Components/Problemset';
import SearchUser from './Components/SearchUser';
import UpcomingContests from './Components/UpcomingContests';

function PrivateRoutes({ user,login,path,component }) {
  const navigate = useNavigate();

  const authenTicate = user.isLoggedIn
  useEffect(() => {
      if(!authenTicate){
        LoginToken(login,navigate,path)
    }
  }, [])
  return (
    <div>
        {authenTicate && path==="/leetcode" && <Leetcode/>}
        {authenTicate && path==="/codeforces/pastcontests" && <Pastcontests/>}
        {authenTicate && path==="/codeforces/problemset" && <Problemset/>}
        {authenTicate && path==="/codeforces/searchuser" && <SearchUser/>}
        {authenTicate && path==="/codeforces/upcomingcontests" && <UpcomingContests/>}
    </div>
  );
}

const mapStateToProps = (state) => ({ user: state.loginReducer });
const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);
