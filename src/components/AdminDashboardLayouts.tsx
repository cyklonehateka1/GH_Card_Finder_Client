import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const AdminDashboardLayouts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = Cookies.get("authToken");
    if (!userToken) {
      navigate("admin/login");
    }
  });
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default AdminDashboardLayouts;
