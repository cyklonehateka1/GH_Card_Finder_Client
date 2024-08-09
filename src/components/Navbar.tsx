import { Link } from "react-router-dom";
import styled from "styled-components";
import nia_logo from "../assets/NIA_logo.png";
import mglass_black from "../assets/mglass_black.png";
import mglass_white from "../assets/mglass_white.png";

interface NavbarProps {
  modalOpen: (data: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ modalOpen }) => {
  const openModalFindCardModal = () => {
    modalOpen(true);
  };

  return (
    <Container>
      <Left>
        <Link to="/">
          <Logo src={nia_logo} alt="company logo" />
        </Link>
        <NavContainer>
          <MenuLink to="/about">Home</MenuLink>
          <MenuLink to="/products">News</MenuLink>
          <MenuLink to="/contact">About</MenuLink>
        </NavContainer>
      </Left>

      <Right>
        <ReportSearch>
          <SearchIcon src={mglass_black} alt="Search icon" />
          Report a missing ID
        </ReportSearch>
        <FindSearch onClick={openModalFindCardModal}>
          <SearchIcon src={mglass_white} alt="Search icon" />
          Find my card
        </FindSearch>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: fixed;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  font-family: "Montserrat", sans-serif;
`;

const Logo = styled.img`
  margin-right: 1rem;
`;

const MenuLink = styled(Link)`
  margin-right: 1rem;
  color: black;
  text-decoration: none;
  font-weight: 600;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 2rem;
`;

const ReportSearch = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.2rem;
  background-color: white;
  border: 1px solid black;
  height: 2rem;
  width: 11rem;
  justify-content: center;
  border-radius: 0.3rem;
  position: relative;
  font-size: 0.7rem;
  color: black;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

const FindSearch = styled(ReportSearch)`
  background-color: black;
  color: white;
  width: 9rem;
`;

const SearchIcon = styled.img`
  z-index: 2;
  height: 1rem;
`;

export default Navbar;
