import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination
} from "@mui/material";

import useTable, { emptyRows } from "../../hooks/useTable";
import { TableHeadCustom, TableEmptyRows } from "../../components/table";
import UserTableRow from "./userTableRow";

function createData(userid, email, dial_code, number, UID, kycstatus) {
  return { userid, email, dial_code, number, UID, kycstatus };
}

const headCells = [
  {
    id: 'userid',
    numeric: false,
    disablePadding: true,
    label: 'user ID',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'dial_code',
    numeric: false,
    disablePadding: true,
    label: 'Dial Code',
  },
  {
    id: 'number',
    numeric: false,
    disablePadding: true,
    label: 'Number',
  },
  {
    id: 'UID',
    numeric: true,
    disablePadding: false,
    label: 'UID',
  },
 
];

const ActiveUserList = () => {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [list, setList] = useState([]);

  const userList = useSelector((state) => state.userList);

  const createTable = React.useCallback(() => {
    let userData = [];
    let activeUser = userList.filter((item) => {
      return item.kycstatus === 'success'
    })
    for (const user of activeUser) {
      userData.push(createData(user.id, user.email,user.dial_code, user.number,user.UID));
    }
    setList(userData);
  }, [userList])

  useEffect(() => {
    createTable()
  }, [createTable])


  return (
    <Grid item xs={12} sm={6}>

      <TableContainer sx={{ minWidth: 450, position: 'relative', background: (theme) => theme.palette.bgGray.dark, borderRadius: "20px", padding: "20px", }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Active Users
        </Typography>

        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={headCells}
            rowCount={list.length}
          />

          <TableBody>
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <UserTableRow
                key={row.userid}
                row={row}
              />
            ))}
            <TableEmptyRows height={72} emptyRows={emptyRows(page, rowsPerPage, list.length)} />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />

    </Grid>
  )
}

export default ActiveUserList;