import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";

const MuiTable = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getAllUsers", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setAccounts(res.data);
      });
  }, []);

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
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Date created</strong>
              </TableCell>
              <TableCell>
                <strong>Verified</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.role}</TableCell>
                  <TableCell>
                    {new Date(account.date_created).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {account.verified ? "Verified" : "Not verified"}
                  </TableCell>
                </TableRow>
              );
              console.log("asd");
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MuiTable;
