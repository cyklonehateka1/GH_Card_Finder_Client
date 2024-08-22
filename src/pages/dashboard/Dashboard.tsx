import styled from "styled-components";
import Topbar from "./Topbar";
import search_icon from "../../assets/search_icon_grey.svg";
import filter_icon from "../../assets/filter_icon.svg";
import Table from "./Table";
import AddDocumentModal, { AddCardData } from "./AddDocumentModal";
import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../../utils/axios";
import Cookies from "js-cookie";
import _ from "lodash"; // Import lodash for debouncing
import { useNavigate } from "react-router-dom";

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
  display: flex;
  justify-content: center;
`;

const LoadingText = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
`;

const ModalContainer = styled.div<ModalContainerProps>`
  display: ${(props: ModalContainerProps) =>
    props.$hidden ? "block" : "none"};
`;

interface ModalContainerProps {
  $hidden: boolean;
}

const Dashboard = () => {
  const [findModalOpen, setFindModalOpen] = useState(false);
  const [newCard, setNewCard] = useState<AddCardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState({
    search: "",
  });
  const [cardsData, setCardsData] = useState<AddCardData[]>([]);

  const authToken = Cookies.get("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("authToken");
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getCards = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/card/get-all", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setLoading(false);
        setCardsData(response.data);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch cards data", error);
      }
    };

    getCards();
  }, [authToken, newCard]);

  const handleFormSubmit = (formData: AddCardData) => {
    console.log("Form data received from child:", formData);
    setNewCard(formData);
  };

  const handleFindModalOpen = (data: boolean) => {
    setFindModalOpen(data);
  };

  const fetchSearchResults = async () => {
    try {
      const { search } = searchParams;
      const queryString = new URLSearchParams({
        search: encodeURIComponent(search),
      }).toString();

      const response = await axiosInstance.get(
        `/card/admin/search?${queryString}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setCardsData(response.data);
    } catch (error) {
      console.error("Failed to search cards", error);
      setCardsData([]); // Clear the table if no results found or if there's an error
    }
  };

  const debouncedFetchSearchResults = useCallback(
    _.debounce(() => fetchSearchResults(), 300),
    [searchParams]
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  useEffect(() => {
    debouncedFetchSearchResults();
  }, [searchParams, debouncedFetchSearchResults]);

  return (
    <Container>
      <Topbar />
      <Main>
        <SearchFilterContainer>
          <SearchContainer>
            <SearchIcon src={search_icon} />
            <SearchInput
              placeholder="Search by ID, First or Last Name"
              name="search"
              value={searchParams.search}
              onChange={handleSearchInputChange}
            />
          </SearchContainer>
          <Right>
            <Filters>
              <Filter>
                <FilterIcon src={filter_icon} />
                All
              </Filter>
              <FiltersNumber>{cardsData.length}</FiltersNumber>
            </Filters>
            <AddNewCardBtn
              onClick={() =>
                findModalOpen ? setFindModalOpen(false) : setFindModalOpen(true)
              }
            >
              Add new card +
            </AddNewCardBtn>
          </Right>
        </SearchFilterContainer>
        <TableContainer>
          {loading ? (
            <LoadingText>Loading...</LoadingText>
          ) : (
            <Table cardsData={cardsData} />
          )}
        </TableContainer>
      </Main>
      <ModalContainer $hidden={findModalOpen}>
        <AddDocumentModal
          modalOpen={handleFindModalOpen}
          onSubmit={handleFormSubmit}
        />
      </ModalContainer>
    </Container>
  );
};

export default Dashboard;
