import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./views/Welcome";
import Login from "./views/Login";
import Page from "./views/Page";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
