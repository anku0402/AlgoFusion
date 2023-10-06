import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from "./Components/SignUp";
import HomePage from "./Components/HomePage";
import { Provider } from "react-redux";
import store from "./Redux/store";
import PrivateRoutes from "./PrivateRoutes";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/signin' element={<SignUp />} />
          <Route exact path='/leetcode' element={<PrivateRoutes path="/leetcode" />} />
          <Route exact path='/codeforces/pastcontests' element={<PrivateRoutes path="/codeforces/pastcontests" />} />
          <Route exact path='/codeforces/problemset' element={<PrivateRoutes path="/codeforces/problemset" />} />
          <Route exact path="/codeforces/searchuser" element={<PrivateRoutes path="/codeforces/searchuser" />} />
          <Route exact path="/codeforces/upcomingcontests" element={<PrivateRoutes path="/codeforces/upcomingcontests" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
