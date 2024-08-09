import styled from "styled-components";
import Topbar from "./Topbar";
import search_icon from "../../assets/search_icon_grey.svg";
import filter_icon from "../../assets/filter_icon.svg";
import Table from "./Table";
import { adminTableData } from "../../data/adminTableData";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(248, 248, 248, 1);
  padding-left: 2px;
`;

const Main = styled.main`
  padding: 0 5rem;
  position: relative;
  top: 3rem;
`;

const SearchFilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 1rem 0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 0.3rem;
  width: 15rem;
  border: 1px solid rgba(232, 236, 239, 1);
`;

const SearchIcon = styled.img`
  width: 1.1rem;
  height: 1.1rem;
`;

const SearchInput = styled.input`
  width: 20rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  border: none;
  outline: none;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Filters = styled.div`
  display: flex;
  border: 1px solid rgba(232, 236, 239, 1);
  background-color: white;
  overflow: hidden;
  border-radius: 0.4rem;
  margin-right: 0.3rem;
`;

const Filter = styled.div`
  border-right: 1px solid rgba(232, 236, 239, 1);
  padding: 0.7rem 1.1rem;
  &:hover {
    background-color: rgb(236, 236, 236);
    cursor: pointer;
  }
`;

const FilterIcon = styled.img`
  margin-right: 0.5rem;
`;

const FiltersNumber = styled.h4`
  padding: 0.7rem 1.1rem;
  text-align: center;
  &:hover {
    background-color: rgb(236, 236, 236);
    cursor: pointer;
  }
`;

const AddNewCardBtn = styled.button`
  background-color: rgba(0, 146, 6, 1);
  padding: 0.85rem 1.1rem;
  color: white;
  font-size: 0.8rem;
`;

const TableContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 73vh;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const Dashboard = () => {
  return (
    <Container>
      <Topbar />
      <Main>
        <SearchFilterContainer>
          <SearchContainer>
            <SearchIcon src={search_icon} />
            <SearchInput placeholder="Search for card" />
          </SearchContainer>
          <Right>
            <Filters>
              <Filter>
                <FilterIcon src={filter_icon} />
                All
              </Filter>
              <FiltersNumber>4</FiltersNumber>
            </Filters>
            <AddNewCardBtn>Add new card +</AddNewCardBtn>
          </Right>
        </SearchFilterContainer>
        <TableContainer>
          <Table data={adminTableData} />{" "}
          {/* Replace with your own Table component */}
        </TableContainer>
      </Main>
    </Container>
  );
};

export default Dashboard;
