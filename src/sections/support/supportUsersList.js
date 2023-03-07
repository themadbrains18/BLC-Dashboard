import React, { useEffect, useState } from "react";
import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton
} from "@mui/material";

import useTable, { emptyRows } from "../../hooks/useTable";
import Iconify from "../../components/Iconify";
import { TableHeadCustom, TableEmptyRows,TableSelectedActions } from "../../components/table";
import SupportListTableRow from "../support/supportListTableRow";


// function createData(userid, name, created, token, btc, usdt, status) {
//   return { userid, name, created, token, btc, usdt, status };
// }

const headCells = [
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'FullName',
  },
  {
    id: 'userid',
    numeric: false,
    disablePadding: true,
    label: 'User ID',
  },
  {
    id: 'created',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'subject',
    numeric: false,
    disablePadding: false,
    label: 'Subject',
  },
  {
    id: 'issue',
    numeric: true,
    disablePadding: false,
    label: 'Issue',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'priority',
    numeric: true,
    disablePadding: false,
    label: 'Priority',
  },
  {
    id: 'isAction',
    numeric: true,
    disablePadding: false,
    label: 'Action',
    align : 'center'
  },
];


const SupportUsersList = (props) => {
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

  function createData(name, userid, createdAt,  email, subject, issue, status,priority) {
    return { name, userid, createdAt, email, subject, issue, status ,priority};
  }

  const createTable=React.useCallback(()=>{
    const rows = [
      createData('Shane', '#12345','01-02-2022', 'abc@gmail.com',"abcjdsjhdjhfjdh", 'Doc', 'Pending','High'),
    createData('Cameron', '#12445', '01-02-2022','xyz@gmail.com',"abcjdsjhdjhfjdh", 'Doc','Pending', 'Medium'),
    createData('Kristin', '#12555','01-02-2022', 'aaa@gmail.com',"abcjdsjhdjhfjdh", 'Doc','Pending', 'Low'),
    createData('Victoria', '#13345', '01-02-2022','ojc@gmail.com',"abcjdsjhdjhfjdh", 'Doc','Pending','High'),
  ];

  setList(rows);
  },[])

  useEffect(() => {
      createTable()
  }, [createTable])
 




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
      <TableContainer sx={{ minWidth: 335, position: 'relative' }}>
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
          sx={{ flex: '1 1 100%', fontsize:'20px' }}
          
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
              <SupportListTableRow
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

export default SupportUsersList;