import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./views/Welcome";
import Login from "./views/Login";
import Page from "./views/Page";
import Dashboard from "./views/user/Dashboard";
import RedirectRules from "./views/user/Redirect";
import Payment from "./views/user/Payment";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route
          path="/"
          element={
            <Page title="PayGasm">
              <Welcome />
            </Page>
          }
        />
        <Route
          path="/login"
          element={
            <Page title="Login">
              <Login />
            </Page>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Page title="Dashboard">
              <Dashboard />
            </Page>
          }
        />
        <Route
          path="/redirect"
          element={
            <Page title="Redirect">
              <RedirectRules />
            </Page>
          }
        />
        <Route
          path="/payment"
          element={
            <Page title="Payment">
              <Payment />
            </Page>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
