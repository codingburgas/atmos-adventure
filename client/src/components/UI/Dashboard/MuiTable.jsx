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
import { BsFillTrashFill } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
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
              <TableCell>
                <strong>Delete</strong>
              </TableCell>
              <TableCell>
                <strong>Promote</strong>
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
                  <TableCell>
                    <BsFillTrashFill
                      className="text-red text-xl hover:cursor-pointer"
                      onClick={() => {
                        axios
                          .get(
                            `http://localhost:3001/api/deleteUserByUUID/${account.uuid}`,
                            {
                              withCredentials: true,
                            }
                          )
                          .then((res) => {
                            if (res.data.message === "User deleted") {
                              window.location.reload();
                            } else {
                              alert(res.data.message);
                            }
                          });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <FaCrown
                      className="text-[#d6d675] hover:cursor-pointer"
                      onClick={() => {
                        axios
                          .get(
                            `http://localhost:3001/api/promoteUserByUUID/${account.uuid}`,
                            {
                              withCredentials: true,
                            }
                          )
                          .then((res) => {
                            if (res.data.message === "User promoted") {
                              window.location.reload();
                            } else {
                              alert(res.data.message);
                            }
                          });
                      }}
                    />
                  </TableCell>
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
