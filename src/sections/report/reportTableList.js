import React,{ useEffect, useState } from "react";
import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton
} from "@mui/material";

import useTable, { emptyRows } from "../../hooks/useTable";
import Iconify from "../../components/Iconify";
import { TableHeadCustom, TableEmptyRows, TableSelectedActions } from "../../components/table";
import ReportTableListRow from "../report/reportTableListRow";


const headCells = [
  {
    id: 'coin',
    numeric: true,
    disablePadding: false,
    label: 'Coin',
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
    id: 'txid',
    numeric: false,
    disablePadding: true,
    label: 'Tx Id',
  },
  {
    id: 'network',
    numeric: false,
    disablePadding: false,
    label: 'Network',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'walletAddress',
    numeric: true,
    disablePadding: false,
    label: 'Wallet Address',
    align: 'center'
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];


const ReportTableList = (props) => {
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

  function createData(coin, userid, createdAt, txid, network, amount, walletAddress, status) {
    return { coin, userid, createdAt, txid, network, amount, walletAddress, status };
  }

  const createTable=React.useCallback(()=>{
    const rows = [
      createData('Bitcoin', '#12345', '01-02-2022', 'Txn19i89898989iee', "BTC/BitCoin", '1.1524 BTC', '3J98t1WpEZ73CNmQviecrny', 'Pending'),
      createData('Polygon', '#12445', '01-02-2022', 'Txn19i982394839iee', "MATIC/M5", '5.1524 ETH', '3J98t1WpEZ73CNmQviecrny', 'Failed'),
      createData('XRP', '#12555', '01-02-2022', 'Txn19i89743987iee', "XRP/Riple", '7.3454 XRP', '3J98t1WpEZ73CNmQviecrny', 'Success'),
      createData('Binance', '#13345', '01-02-2022', 'Txn1jhiu3iu392u4iee', "BNB/B5", '9.2344 BND', '3J98t1WpEZ73CNmQviecrny', 'Pending'),
      createData('Bitcoin', '#12345', '01-02-2022', 'Txn19i89898989iee', "BTC/BitCoin", '1.1524 BTC', '3J98t1WpEZ73CNmQviecrny', 'Pending'),
      createData('Polygon', '#12445', '01-02-2022', 'Txn19i982394839iee', "MATIC/M5", '5.1524 ETH', '3J98t1WpEZ73CNmQviecrny', 'Failed'),
      createData('XRP', '#12555', '01-02-2022', 'Txn19i89743987iee', "XRP/Riple", '7.3454 XRP', '3J98t1WpEZ73CNmQviecrny', 'Success'),
      createData('Binance', '#13345', '01-02-2022', 'Txn1jhiu3iu392u4iee', "BNB/B5", '9.2344 BND', '3J98t1WpEZ73CNmQviecrny', 'Pending'),
      createData('Bitcoin', '#12345', '01-02-2022', 'Txn19i89898989iee', "BTC/BitCoin", '1.1524 BTC', '3J98t1WpEZ73CNmQviecrny', 'Pending'),
    ];
    setList(rows);
  },[])

  useEffect(() => {
    createTable();
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
          sx={{ flex: '1 1 100%', fontsize: '20px' }}

          id="tableTitle"
          component="div"
        >
          Top Holders
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
              <ReportTableListRow
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

export default ReportTableList;