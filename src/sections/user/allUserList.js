import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton
} from "@mui/material";

import useTable, { emptyRows } from "../../hooks/useTable";
import Iconify from "../../components/Iconify";
import { TableHeadCustom, TableEmptyRows,TableSelectedActions } from "../../components/table";
import UserListTableRow from "./userListTableRow";


function createData(userid, email,dial_code , number, UID, kycstatus,created) {
  return { userid, email,dial_code , number, UID, kycstatus,created };
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
  {
    id: 'kycstatus',
    numeric: true,
    disablePadding: false,
    label: 'KYC Status',
  },
  {
    id: 'created',
    numeric: false,
    disablePadding: true,
    label: 'Created',
  }
  // {
  //   id: 'isAction',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Action',
  //   align : 'center'
  // },
];


const AllUserList = () => {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    // onSort,
    // onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [list, setList] = useState([]);

  const userList = useSelector((state) => state.userList);
  const createUserTable= React.useCallback(()=>{
    let alluser = [];
    for (const user of userList) {
      alluser.push(createData(user.id, user.email,user.dial_code, user.number,user.UID, user.kycstatus, user.createdAt));
    }
    setList(alluser);
    
  },[userList])
  useEffect(() => {
  
    createUserTable();
  }, [createUserTable])
 



  const handleDeleteRows = (selected) => {
    const deleteRows = list.filter((row) => !selected.includes(row.userid));
    setSelected([]);
    setList(deleteRows);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = list.filter((row) => row.id !== id);
    setSelected([]);
    setList(deleteRow);
  };

  return (
    <Grid item xs={12}>
      <TableContainer sx={{ minWidth: 800, position: 'relative', background:(theme)=>theme.palette.bgGray.dark , borderRadius:"20px",padding:"20px", }}>
        {selected.length > 0 && (
          <TableSelectedActions
            dense={dense}
            numSelected={selected.length}
            rowCount={list.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                list.map((row) => row.id)
              )
            }
            actions={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            }
          />
        )}
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All Users
        </Typography>

        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={headCells}
            rowCount={list.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                list.map((row) => row.userid)
              )
            }
          />

          <TableBody>
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <UserListTableRow
                key={row.userid}
                row={row}
                selected={selected.includes(row.userid)}
                onSelectRow={() => onSelectRow(row.userid)}
                onDeleteRow={() => handleDeleteRow(row.userid)}
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
    </Grid>)
}

export default AllUserList;