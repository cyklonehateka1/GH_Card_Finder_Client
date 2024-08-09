import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const AdminDashboardLayouts = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default AdminDashboardLayouts;
