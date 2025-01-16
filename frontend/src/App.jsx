import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayoutSidebarCollapsed from "./pages/dashboard/DashboardLayoutSidebarCollapsed";
import Home from "./pages/auth/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import UserPrivateComponent from "./components/UserPrivateComponent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <UserPrivateComponent>
                <DashboardLayoutSidebarCollapsed />
              </UserPrivateComponent>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
