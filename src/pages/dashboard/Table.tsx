import styled from "styled-components";
import { useState } from "react";
import CardDetailsModal from "./CardDetailsModal";
import { AddCardData } from "./AddDocumentModal";

interface ModalContainerProps {
  $hidden: boolean;
}

interface TableProps {
  cardsData: AddCardData[];
}

const Table = ({ cardsData }: TableProps) => {
  const [viewCard, setViewCard] = useState<AddCardData | null>(null);
  const [findModalOpen, setFindModalOpen] = useState(false);

  const headingData: string[] = [
    "Card type",
    "First name",
    "Last name",
    "ID number",
    "Date reported",
    "Action",
  ];

  const formatDate = (date: string | Date): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = parsedDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleCardView = (card: AddCardData) => {
    setViewCard(card);
    setFindModalOpen(true);
  };

  const handleFindModalOpen = (data: boolean) => {
    setFindModalOpen(data);
    if (!data) setViewCard(null); // Reset viewCard when closing modal
  };

  return (
    <Wrapper>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {headingData.map((item) => (
                <TableHeading key={item}>{item}</TableHeading>
              ))}
            </tr>
          </thead>
          <tbody>
            {cardsData &&
              cardsData.map((item) => (
                <TableRow key={item.idNumber}>
                  <TableCell>
                    <CardType>{item.type}</CardType>
                  </TableCell>
                  <TableCell>
                    <OtherCellData>{item.firstName}</OtherCellData>
                  </TableCell>
                  <TableCell>
                    <OtherCellData>{item.lastName}</OtherCellData>
                  </TableCell>
                  <TableCell>
                    <OtherCellData>{item.idNumber}</OtherCellData>
                  </TableCell>
                  <TableCell>
                    <OtherCellData>
                      {formatDate(item.dateReported)}
                    </OtherCellData>
                  </TableCell>
                  <ActionCell>
                    <ActionText onClick={() => handleCardView(item)}>
                      View
                    </ActionText>
                  </ActionCell>
                </TableRow>
              ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      {viewCard && (
        <ModalContainer $hidden={findModalOpen}>
          <CardDetailsModal
            modalOpen={handleFindModalOpen}
            cardsData={viewCard}
          />
        </ModalContainer>
      )}
    </Wrapper>
  );
};

// Define the styled components (unchanged)
const Wrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow-y: auto;
  max-height: 90vh;

  @media (min-width: 768px) {
    max-height: 100vh;
  }
`;

const ModalContainer = styled.div<ModalContainerProps>`
  display: ${(props: ModalContainerProps) =>
    props.$hidden ? "block" : "none"};
`;

const TableContainer = styled.div``;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const TableHeading = styled.th`
  padding: 10px;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 7px;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (min-width: 768px) {
    font-size: 11px;
  }

  &.text-left {
    text-align: left;
    padding-left: 1rem;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TableCell = styled.td`
  padding: 1.2rem 0;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 8px;

  @media (min-width: 480px) {
    font-size: 9px;
  }

  @media (min-width: 640px) {
    font-size: 10px;
  }

  @media (min-width: 768px) {
    font-size: 12px;
  }

  &.text-left {
    text-align: left;
    padding-left: 1rem;
  }
`;

const ActionCell = styled(TableCell)`
  cursor: pointer;
`;

const ActionText = styled.span`
  padding: 0.4rem 0.6rem;
  border: 1px solid rgba(209, 209, 214, 1);
  font-size: 0.6rem;
  font-weight: 500;
  border-radius: 0.3rem;

  @media (min-width: 640px) {
    width: 17px;
  }

  @media (min-width: 1024px) {
    width: 20px;
  }
`;

const CardType = styled.span`
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 500;
  background-color: rgba(244, 244, 245, 1);
  border-radius: 50px;
`;

const OtherCellData = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
`;

export default Table;
