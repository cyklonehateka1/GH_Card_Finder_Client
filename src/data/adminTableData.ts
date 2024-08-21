export interface AdminTableData {
  type: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  status: string;
  statusText: string;
  dateReported: string;
  action: string;
}

export const adminTableData: AdminTableData[] = [
  {
    type: "Ghana card",
    firstName: "John",
    lastName: "Doe",
    idNumber: "GHA - 72790827 1-8",
    statusText: "User unreachable",
    status: "unreachable",
    dateReported: "13 Feb, 2024",
    action: "View",
  },
  {
    type: "Basic",
    firstName: "Jane",
    lastName: "Smith",
    idNumber: "GHA - 72790827 1-7",
    statusText: "User engaged",
    status: "reached",
    dateReported: "13 Feb, 2024",
    action: "View",
  },
  {
    type: "Ghana card",
    firstName: "John",
    lastName: "Doe",
    idNumber: "GHA - 72790827 1-9",
    statusText: "New",
    dateReported: "13 Feb, 2024",
    status: "new",
    action: "View",
  },
];
