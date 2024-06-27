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
import BookingDetail from "./pages/nanny/BookingDetail";
import FBookingDetail from "./pages/family/FBookingDetail";
import NannyPage from "./pages/family/BookNanny/NannyPage";
import MessagingPage from "./components/MessagingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FamiliyDetail from "./pages/admin/FamiliyDetail";
import NannyDetail from "./pages/admin/NannyDetail";
import ComplainDetail from "./pages/admin/ComplainDetail";

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
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/signup_nanny" element={<NannySignupPage />} />
          <Route exact path="/dashboard" element={<FamilyDashboard />} />
          <Route
            exact
            path="/dashboard/requests/:id"
            element={<FBookingDetail />}
          />
          <Route
            exact
            path="/dashboard/booknanny/:id"
            element={<NannyPage />}
          />
          <Route
            exact
            path="/dashboard/chats/:id"
            element={<MessagingPage />}
          />
          <Route
            exact
            path="/dashboard/:pagename"
            element={<FamilyDashboard />}
          />
          <Route exact path="/dashboard_nanny" element={<NannyDashBoard />} />
          <Route
            exact
            path="/dashboard_nanny/requests/:id"
            element={<BookingDetail />}
          />
          <Route
            exact
            path="/dashboard_nanny/chats/:id"
            element={<MessagingPage />}
          />
          <Route
            exact
            path="/dashboard_nanny/:pagename"
            element={<NannyDashBoard />}
          />
          <Route exact path="/dashboard_admin" element={<AdminDashboard />} />
          <Route
            exact
            path="/dashboard_admin/families/:username"
            element={<FamiliyDetail />}
          />
          <Route
            exact
            path="/dashboard_admin/nannies/:id"
            element={<NannyDetail />}
          />
          <Route
            exact
            path="/dashboard_admin/complaints/:id"
            element={<ComplainDetail />}
          />
          <Route
            exact
            path="/dashboard_admin/:pagename"
            element={<AdminDashboard />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
