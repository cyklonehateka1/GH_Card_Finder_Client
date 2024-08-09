import styled from "styled-components";
import { AdminTableData } from "../../data/adminTableData";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import Cookies from "js-cookie";

interface Data {
  data: AdminTableData[];
}

interface StatusCellProps {
  $status: string;
}

// Usage
const Table: React.FC<Data> = () => {
  const [cardsData, setCardsData] = useState<AdminTableData[]>();

  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const getCards = async () => {
      const response = await axiosInstance.get("/card/get-all", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCardsData(response.data);
      console.log(response.data);
    };

    getCards();
  }, [authToken]);

  const headingData: string[] = [
    "Card type",
    "First name",
    "Last name",
    "ID number",
    "Status",
    "Date reported",
    "Action",
  ];

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
                    <CardType>{item.cardType}</CardType>
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
                    <StatusCellData $status={item.status}>
                      <StatusDot $status={item.status}></StatusDot>
                      {item.statusText}
                    </StatusCellData>
                  </TableCell>
                  <TableCell>
                    <OtherCellData>{item.date}</OtherCellData>
                  </TableCell>
                  <ActionCell>
                    <ActionText>{item.cardType}</ActionText>
                  </ActionCell>
                </TableRow>
              ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Wrapper>
  );
};

// Define the styled components
const Wrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow-y: auto;
  max-height: 90vh;

  @media (min-width: 768px) {
    max-height: 100vh;
  }
`;

const TableContainer = styled.div``;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const TableHeading = styled.th`
  padding: 10px;
  color: #333; /* text-primaryText */
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
  border-bottom: 1px solid #f0f0f0; /* border-light-ash */
  border-top: 1px solid #f0f0f0; /* border-light-ash */
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f0f0f0; /* hover:bg-light-ash */
  }
`;

const TableCell = styled.td`
  padding: 1.2rem 0;
  color: #333; /* text-primaryText */
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

const StatusCellData = styled.span<StatusCellProps>`
  margin: 0 auto;
  padding: 0.2rem 0.4rem;
  font-size: 0.6rem;
  font-weight: 500;
  display: flex;
  width: auto;
  max-width: 7rem;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${(props: StatusCellProps) =>
    props.$status === "unreachable".toLocaleLowerCase()
      ? "rgba(255, 250, 235, 1)"
      : props.$status === "reached".toLocaleLowerCase()
      ? "rgba(1, 181, 51, 0.07)"
      : "rgba(244, 244, 245, 1)"};

  color: ${(props: StatusCellProps) =>
    props.$status === "unreachable".toLocaleLowerCase()
      ? "rgba(181, 71, 8, 1)"
      : props.$status === "reached".toLocaleLowerCase()
      ? "rgba(0, 146, 6, 1)"
      : "black"};
`;

const StatusDot = styled.span<StatusCellProps>`
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50px;
  margin-right: 0.4rem;
  background-color: ${(props: StatusCellProps) =>
    props.$status === "unreachable".toLocaleLowerCase()
      ? "rgba(181, 71, 8, 1)"
      : props.$status === "reached".toLocaleLowerCase()
      ? "rgba(0, 146, 6, 1)"
      : "black"};
`;

export default Table;
