import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/admin-login/Login";

function App() {
  return (
    <Container>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </Router>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
`;

export default App;
