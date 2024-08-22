import styled from "styled-components";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// import arrow_down from "../../assets/arrow_down.svg";

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
  justify-content: flex-end;
  display: flex;
  align-items: center;
  width: 13rem;
  cursor: pointer;
`;

const LogoutText = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
`;

const NavProfile = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

// const NavPhoto = styled.div`
//   width: 2rem;
//   height: 2rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 0.2rem;
//   color: white;
//   font-weight: 700;
//   background-color: rgba(0, 74, 3, 1);
//   margin-right: 1rem;
// `;

// const UserName = styled.p`
//   font-weight: 500;
// `;

// const NavArrow = styled.img``;

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/admin/login");
  };
  return (
    <Container>
      <LogoText>LOST & FOUND</LogoText>
      <Right>
        <NavProfile>
          <LogoutText onClick={handleLogout}>Logout</LogoutText>
        </NavProfile>
        {/* <NavArrow src={arrow_down} alt="arrow" /> */}
      </Right>
    </Container>
  );
};

export default Topbar;
