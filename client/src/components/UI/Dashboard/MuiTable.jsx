import React, { useEffect, useState, useContext } from "react";
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
import { useSnackbar } from "notistack";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const MuiTable = () => {
  const [accounts, setAccounts] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const authContext = useContext(AuthContext);
  /*
   * Fetches the accounts from the database
   */

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
              {authContext.role === "admin" ? (
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
              ) : null}
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Date created</strong>
              </TableCell>
              <TableCell>
                <strong>Verified</strong>
              </TableCell>
              {authContext.role === "admin" ? (
                <TableCell>
                  <strong>Delete</strong>
                </TableCell>
              ) : null}
              {authContext.role === "admin" ? (
                <TableCell>
                  <strong>Promote</strong>
                </TableCell>
              ) : null}
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
                  {authContext.role === "admin" ? (
                    <TableCell>{account.email}</TableCell>
                  ) : null}
                  <TableCell>{account.role}</TableCell>
                  <TableCell>
                    {new Date(account.date_created).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {account.verified ? "Verified" : "Not verified"}
                  </TableCell>
                  {authContext.role === "admin" ? (
                    <TableCell>
                      <BsFillTrashFill
                        className="text-red text-xl hover:cursor-pointer"
                        onClick={() => {
                          /*
                           * Deletes the account from the database
                           * and updates the state
                           */
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
                                enqueueSnackbar("User has admin privileges", {
                                  variant: "error",
                                });
                                sleep(5000).then(() => {
                                  closeSnackbar();
                                });
                              }
                            });
                        }}
                      />
                    </TableCell>
                  ) : null}
                  {authContext.role === "admin" ? (
                    <TableCell>
                      <FaCrown
                        className="text-[#d6d675] hover:cursor-pointer"
                        onClick={() => {
                          /*
                           * Promotes the account to admin
                           * and updates the state
                           */
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
                                enqueueSnackbar("User has admin privileges", {
                                  variant: "error",
                                });
                                sleep(5000).then(() => {
                                  closeSnackbar();
                                });
                              }
                            });
                        }}
                      />
                    </TableCell>
                  ) : null}
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
