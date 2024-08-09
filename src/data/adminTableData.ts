export interface AdminTableData {
  type: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  status: string;
  statusText: string;
  date: string;
  action: string;
}

export const adminTableData: AdminTableData[] = [
  {
    cardType: "Ghana card",
    firstName: "John",
    lastName: "Doe",
    idNumber: "GHA - 72790827 1-7",
    statusText: "User unreachable",
    status: "unreachable",
    date: "13 Feb, 2024",
    action: "View",
  },
  {
    cardType: "Basic",
    firstName: "Jane",
    lastName: "Smith",
    idNumber: "GHA - 72790827 1-7",
    statusText: "User engaged",
    status: "reached",
    date: "13 Feb, 2024",
    action: "View",
  },
  {
    cardType: "Ghana card",
    firstName: "John",
    lastName: "Doe",
    idNumber: "GHA - 72790827 1-7",
    statusText: "New",
    date: "13 Feb, 2024",
    status: "new",
    action: "View",
  },
];
