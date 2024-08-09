import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: flex-start;
  position: relative;
`;

const UserLayout = () => {
  return (
    <Container>
      <div className="">
        <Outlet />
      </div>
    </Container>
  );
};

export default UserLayout;
