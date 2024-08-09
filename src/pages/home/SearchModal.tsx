import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../../utils/axios";
import { CardDetails } from "../../types/cardDetails";
import axios from "axios";

interface SearchModalProps {
  modalOpen: (data: boolean) => void;
}

interface SubmitBtnProps {
  $completed: boolean;
}

interface CustomSearchForm {
  firstName: string;
  lastName: string;
  dob: string;
}

interface ResponseData {
  message: string;
  data: CardDetails[];
}

const SearchModal: React.FC<SearchModalProps> = ({ modalOpen }) => {
  const [searchMode, setSearchMode] = useState<string>("simple");
  const [error, setError] = useState<string>("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [idField, setIdField] = useState<string>("");
  const [responseData, setResponseData] = useState<ResponseData>({
    message: "",
    data: [],
  });
  const [customSearchFormInput, setCustomSearchFormInput] =
    useState<CustomSearchForm>({
      firstName: "",
      lastName: "",
      dob: "",
    });

  useEffect(() => {
    if (searchMode === "custom") {
      if (
        customSearchFormInput.firstName.trim() !== "" &&
        customSearchFormInput.lastName.trim() !== "" &&
        customSearchFormInput.dob.trim() !== ""
      ) {
        setComplete(true);
      } else {
        setComplete(false);
      }
    } else if (searchMode === "simple") {
      if (idField.trim() !== "") {
        setComplete(true);
      } else {
        setComplete(false);
      }
    }
  }, [idField, customSearchFormInput, searchMode]);

  const handleCustomFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;
    setCustomSearchFormInput({ ...customSearchFormInput, [name]: value });
  };

  const toggleModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const parentDiv = e.currentTarget as HTMLElement;
    if (!parentDiv.querySelector("div")?.contains(e.target as Node)) {
      modalOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (searchMode === "simple" && idField.trim() === "") {
      setError("Please enter a document ID number");
      return;
    } else if (
      searchMode === "custom" &&
      (customSearchFormInput.firstName.trim() === "" ||
        customSearchFormInput.lastName.trim() === "" ||
        customSearchFormInput.dob.trim() === "")
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      if (searchMode === "custom") {
        const response = await axiosInstance.get(
          `card/search?firstName=${customSearchFormInput.firstName}&lastName=${customSearchFormInput.lastName}&dob=${customSearchFormInput.dob}`
        );
        setResponseData(response.data);
        setSearchMode("found");
        setLoading(false);
        setIdField(response.data.data[0].idNumber);
        console.log(response);
      } else if (searchMode === "simple") {
        const response = await axiosInstance.get(
          `card/search?idNumber=${idField}`
        );
        setResponseData(response.data);
        setSearchMode("found");
        setLoading(false);
        setIdField(response.data.data[0].idNumber);
        console.log(response);
      }
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "An error occurred while searching for the document"
        );
      } else {
        setError("An unexpected error occurred");
      }

      console.log(error);
    }
  };

  return (
    <Container onClick={toggleModal}>
      <SubContainer>
        <TitleText>Find my document</TitleText>
        <SubText>Enter document’s details below </SubText>
        <Form onSubmit={handleSubmit}>
          {searchMode === "simple" || searchMode === "found" ? (
            <InputField
              type="text"
              placeholder="Document ID number"
              value={idField}
              onChange={(e) => {
                setError(""), setIdField(e.target.value);
              }}
            />
          ) : (
            ""
          )}

          {searchMode === "custom" && (
            <CustomSearchContainer>
              <InputField
                type="text"
                placeholder="First name"
                name="firstName"
                onChange={handleCustomFormChange}
              />
              <InputField
                type="text"
                placeholder="Last name"
                name="lastName"
                onChange={handleCustomFormChange}
              />
              <InputField
                type="text"
                placeholder="Date of Birth"
                name="dob"
                onChange={handleCustomFormChange}
              />
            </CustomSearchContainer>
          )}
        </Form>

        {searchMode === "found" && (
          <FoundTextContainer>
            <FoundTextSpan>Document</FoundTextSpan>
            <FoundText>found in the system</FoundText>
          </FoundTextContainer>
        )}
        {searchMode === "found" && (
          <CardFounCointainer>
            <FoundTextSpan>{responseData.data[0].idNumber}</FoundTextSpan>
            <CardImgContainer>
              <CardImg src={responseData.data[0].profileImg} alt="Ghana card" />
              <ClaimButton>Claim it now</ClaimButton>
            </CardImgContainer>
          </CardFounCointainer>
        )}

        <ErrorMessage>{error}</ErrorMessage>

        <Button type="submit" onClick={handleSubmit} $completed={complete}>
          {loading ? "Searching..." : "Search"}
        </Button>
        {searchMode === "simple" && (
          <CustomText>Don’t remember your document ID?</CustomText>
        )}
        {searchMode === "simple" ? (
          <CustomModalClickable
            onClick={() => {
              setError(""), setSearchMode("custom");
            }}
          >
            Use custom search
          </CustomModalClickable>
        ) : (
          <CustomModalClickable
            onClick={() => {
              setError(""), setSearchMode("simple");
            }}
          >
            Search with ID number instead.
          </CustomModalClickable>
        )}
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  backdrop-filter: blur(5px);
`;

const SubContainer = styled.div`
  background-color: white;
  padding: 1.2rem 1.2rem;
  border-radius: 0.5rem;
  width: 20rem;
`;

const TitleText = styled.h4`
  font-size: 1.6rem;
`;

const SubText = styled.p`
  font-size: 0.6rem;
  font-weight: 600;
`;

const Form = styled.form`
  margin-top: 1rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 0.3rem;
  border: 1px solid #e1e1ef;
  outline: none;
  margin-bottom: 1rem;
`;

const CustomSearchContainer = styled.div`
  width: 100%;
`;

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  color: #ff0048;
  margin-bottom: 0.5rem;
`;

const Button = styled.button<SubmitBtnProps>`
  padding: 0.8rem 0;
  width: 100%;
  background-color: ${(props: SubmitBtnProps) =>
    props.$completed ? "#009205" : "rgba(0, 146, 6, 1)"};
  opacity: ${(props: SubmitBtnProps) => (props.$completed ? "1" : "0.5")};
  color: white;
  border: none;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
`;

const CustomText = styled.p`
  color: #707a91;
  font-size: 0.7rem;
  margin-bottom: 0.4rem;
`;

const CustomModalClickable = styled.p`
  color: #0d7311;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
`;

const FoundTextContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const FoundTextSpan = styled.span`
  font-weight: 600;
  font-size: 0.7rem;
`;

const FoundText = styled.p`
  margin-left: 0.4rem;
  font-size: 0.7rem;
`;

const CardFounCointainer = styled.div`
  border: 1px solid #e1e1ef;
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem;
`;

const CardImgContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const CardImg = styled.img`
  width: 100%;
`;

const ClaimButton = styled.button`
  width: 100%;
  background-color: #009206;
  margin-top: 0.5rem;
  color: white;
  font-size: 0.8rem;
  padding: 0.8rem 0;
`;

export default SearchModal;
