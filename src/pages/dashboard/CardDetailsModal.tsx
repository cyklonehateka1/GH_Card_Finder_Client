import styled from "styled-components";
import { AddCardData } from "./AddDocumentModal";

interface CardDetailsModalProps {
  modalOpen: (data: boolean) => void;
  cardsData: AddCardData;
}

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({
  modalOpen,
  cardsData,
}) => {
  const toggleModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const parentDiv = e.currentTarget as HTMLElement;
    if (!parentDiv.querySelector("div")?.contains(e.target as Node)) {
      modalOpen(false);
    }
  };
  return (
    <Container onClick={toggleModal}>
      <SubContainer>
        <CardNumberContainer>
          <CardNumber>{cardsData.idNumber}</CardNumber>
          <CloseButton onClick={() => modalOpen(false)}>X</CloseButton>
        </CardNumberContainer>
        <CardImageContainer>
          <CardImage src={cardsData.profileImg} alt="GHA card" />
        </CardImageContainer>
        <CardDetailsTitle>Document details</CardDetailsTitle>
        <CardDetailsContainer>
          <DetailsRow>
            <DetailsLabel>Type</DetailsLabel>
            <CardType>{cardsData.type}</CardType>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>First name</DetailsLabel>
            <DetailsValue>{cardsData.firstName}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Last name</DetailsLabel>
            <DetailsValue>{cardsData.lastName}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Date of Birth</DetailsLabel>
            <DetailsValue>{cardsData.dob}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>ID number</DetailsLabel>
            <DetailsValue>{cardsData.idNumber}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Date reported</DetailsLabel>
            <DetailsValue>{cardsData.dateReported}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Reported by</DetailsLabel>
            <DetailsValue>{cardsData.repoter_name}</DetailsValue>
          </DetailsRow>
          <DetailsRow>
            <DetailsLabel>Reporter's contact </DetailsLabel>
            <DetailsValue>
              {cardsData.repoter_address}, {cardsData.repoter_phone}
            </DetailsValue>
          </DetailsRow>
        </CardDetailsContainer>
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  z-index: 100;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  left: 0;
  top: -3rem;
  background-color: rgba(1, 1, 1, 0.07);
  backdrop-filter: blur(5px);
  padding: 1rem;
`;

const SubContainer = styled.div`
  background-color: white;
  padding: 1.2rem 1.2rem;
  border-radius: 0.5rem;
  width: 22rem;
`;

const CardNumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardNumber = styled.p`
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 0.8rem;
`;

const CloseButton = styled(CardNumber)`
  color: rgba(193, 200, 205, 1);
  cursor: pointer;
`;

const CardImageContainer = styled.div`
  width: 75%;
  height: 9rem;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(232, 236, 239, 1);
  padding: 0.5rem;
`;

const CardDetailsTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: rgba(76, 76, 76, 1);
`;

const CardDetailsContainer = styled.div`
  border: 1px solid rgba(230, 232, 235, 1);
  border-radius: 0.5rem;
`;

const DetailsRow = styled.div`
  display: flex;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid rgba(230, 232, 235, 1);
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const DetailsLabel = styled.p`
  font-size: 0.7rem;
  color: rgba(112, 122, 145, 1);
  font-weight: 500;
`;

const CardType = styled.span`
  background-color: rgba(236, 238, 240, 1);
  font-weight: 500;
  color: rgba(25, 37, 79, 1);
  font-size: 0.6rem;
  padding: 0.2rem 0.5rem;
  border-radius: 2rem;
`;

const DetailsValue = styled.p`
  font-size: 0.7rem;
  font-weight: 500;
  text-align: right;
`;

export default CardDetailsModal;
