import styled from "styled-components";
import arrow_down from "../../assets/arrow_down.svg";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 5rem;
  align-items: center;
  background-color: white;
  position: fixed;
`;

const LogoText = styled.h2`
  font-weight: 900;
`;

const Right = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 13rem;
  cursor: pointer;
`;

const NavProfile = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const NavPhoto = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  color: white;
  font-weight: 700;
  background-color: rgba(0, 74, 3, 1);
  margin-right: 1rem;
`;

const UserName = styled.p`
  font-weight: 500;
`;

const NavArrow = styled.img``;

const Topbar = () => {
  return (
    <Container>
      <LogoText>LOST & FOUND</LogoText>
      <Right>
        <NavProfile>
          <NavPhoto>D</NavPhoto>
          <UserName>John Doe</UserName>
        </NavProfile>
        <NavArrow src={arrow_down} alt="arrow" />
      </Right>
    </Container>
  );
};

export default Topbar;
