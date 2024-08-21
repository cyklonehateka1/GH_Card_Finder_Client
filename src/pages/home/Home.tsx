import styled from "styled-components";
import homebg from "../../assets/homebg.png";
import home_woman from "../../assets/home_woman.png";
import SearchModal from "./SearchModal";
import nia_logo from "../../assets/NIA_logo.png";
import mglass_black from "../../assets/mglass_black.png";
import mglass_white from "../../assets/mglass_white.png";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ModalContainerProps {
  $hidden: boolean;
}

const Home = () => {
  const [findModalOpen, setFindModalOpen] = useState(false);

  const handleFindModalOpen = (data: boolean) => {
    setFindModalOpen(data);
  };

  return (
    <Container>
      <NavbarContainer>
        <NavLeft>
          <Link to="/">
            <Logo src={nia_logo} alt="company logo" />
          </Link>
        </NavLeft>

        <Right>
          <ReportSearch>
            <SearchIcon src={mglass_black} alt="Search icon" />
            Report a missing ID
          </ReportSearch>
          <FindSearch
            onClick={() =>
              findModalOpen ? setFindModalOpen(false) : setFindModalOpen(true)
            }
          >
            <SearchIcon src={mglass_white} alt="Search icon" />
            Find my card
          </FindSearch>
        </Right>
      </NavbarContainer>

      <ModalContainer $hidden={findModalOpen}>
        <SearchModal modalOpen={handleFindModalOpen} />
      </ModalContainer>

      <Main>
        <Left>
          <Heading>Lost your IDENTITY DOCUMENT?</Heading>
          <SubHeading>SEARCH FOR IT IN OUR LOST AND FOUND DATABASE</SubHeading>
          <HeroButton
            onClick={() =>
              findModalOpen ? setFindModalOpen(false) : setFindModalOpen(true)
            }
          >
            <HomeSearchIcon src={mglass_white} alt="Search icon" />
            Find my card
          </HeroButton>
        </Left>
        <HeroImg src={home_woman} alt="Woman holding Ghana Card" />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const NavbarContainer = styled.div`
  width: 100%;
  position: fixed;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const Logo = styled.img`
  margin-right: 1rem;
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

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 5rem 2rem 0 6rem;
  background: url(${homebg}), #025800;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Left = styled.div`
  width: 40%;
  /* border: 1px solid red; */
`;

const Heading = styled.h1`
  font-size: 4rem;
  color: white;
  font-family: "Montserrat", sans-serif;
`;

const SubHeading = styled.h5`
  font-size: 0.8rem;
  color: #ffd600;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 0.5rem;
`;

const HeroButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.2rem;
  background-color: black;
  border: 1px solid black;
  height: 2rem;
  width: 11rem;
  justify-content: center;
  border-radius: 0.3rem;
  position: relative;
  font-size: 0.7rem;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

const HomeSearchIcon = styled.img`
  z-index: 2;
  height: 1rem;
`;

const HeroImg = styled.img`
  width: 55%;
  margin-top: 2rem;
  position: relative;
  top: 1rem;
`;

const ModalContainer = styled.div<ModalContainerProps>`
  display: ${(props: ModalContainerProps) =>
    props.$hidden ? "block" : "none"};
`;

export default Home;
