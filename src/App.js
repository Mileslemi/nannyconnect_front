import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import NannySignupPage from "./pages/signup/NannySignUpPage";
import NavigationBar from "./components/NavigationBar";
import NannyDashBoard from "./pages/nanny/NannyDashBoard";
import FamilyDashboard from "./pages/family/FamilyDashboard";
import { useEffect } from "react";
import { checkIsAuthenticated } from "./store/user/UserActions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsAuthenticated());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup_nanny" element={<NannySignupPage />} />
          <Route path="/dashboard" element={<FamilyDashboard />} />
          <Route path="/dashboard/:pagename" element={<FamilyDashboard />} />
          <Route path="/dashboard_nanny" element={<NannyDashBoard />} />
          <Route
            path="/dashboard_nanny/:pagename"
            element={<NannyDashBoard />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
