import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const tableData = [
  {
    id: 1,
    first_name: "Aldous",
    last_name: "Labbett",
    email: "alabbett0@wufoo.com",
    gender: "Male",
    ip_address: "182.67.250.133",
  },
  {
    id: 2,
    first_name: "Sharyl",
    last_name: "Schanke",
    email: "sschanke1@typepad.com",
    gender: "Female",
    ip_address: "17.113.104.239",
  },
  {
    id: 3,
    first_name: "Roselle",
    last_name: "Haxley",
    email: "rhaxley2@wufoo.com",
    gender: "Female",
    ip_address: "45.59.17.63",
  },
  {
    id: 4,
    first_name: "Gladys",
    last_name: "Uc",
    email: "guc3@diigo.com",
    gender: "Female",
    ip_address: "192.212.11.201",
  },
  {
    id: 5,
    first_name: "Janey",
    last_name: "O'Noland",
    email: "jonoland4@xing.com",
    gender: "Female",
    ip_address: "71.146.145.211",
  },
  {
    id: 6,
    first_name: "Verney",
    last_name: "Laterza",
    email: "vlaterza5@github.com",
    gender: "Male",
    ip_address: "30.70.85.233",
  },
  {
    id: 7,
    first_name: "Flint",
    last_name: "Belitz",
    email: "fbelitz6@deviantart.com",
    gender: "Male",
    ip_address: "133.16.17.215",
  },
  {
    id: 8,
    first_name: "Adrien",
    last_name: "Baudesson",
    email: "abaudesson7@indiegogo.com",
    gender: "Male",
    ip_address: "59.21.244.32",
  },
  {
    id: 9,
    first_name: "Giacomo",
    last_name: "Robben",
    email: "grobben8@skyrock.com",
    gender: "Male",
    ip_address: "58.231.95.7",
  },
  {
    id: 10,
    first_name: "Lynette",
    last_name: "Greville",
    email: "lgreville9@delicious.com",
    gender: "Female",
    ip_address: "72.205.6.184",
  },
];
const MuiTable = () => {
  return (
    <div className="z-0">
      <TableContainer component={Paper} sx={{ maxHeight: "50vh" }}>
        <Table aria-label="users" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>First Name</strong>
              </TableCell>
              <TableCell>
                <strong>Last Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    // delete row.id;
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MuiTable;
