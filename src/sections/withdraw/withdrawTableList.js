import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton, Box, Button, Menu, MenuItem
} from "@mui/material";

import useTable, { emptyRows } from "../../hooks/useTable";
import Iconify from "../../components/Iconify";
import { TableHeadCustom, TableEmptyRows, TableSelectedActions } from "../../components/table";
import WithdrawTableListRow from "./withdrawTableListRow";
import FilterListIcon from '@mui/icons-material/FilterList';

function createData(symbol, tokenName, createdAt, tx_hash, requestedAmount, withdraw_wallet, status) {
  return { symbol, tokenName, createdAt, tx_hash, requestedAmount, withdraw_wallet, status };
}

const headCells = [
  {
    id: 'symbol',
    numeric: true,
    disablePadding: false,
    label: 'Coin',
  },
  {
    id: 'tokenName',
    numeric: false,
    disablePadding: true,
    label: 'Network',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'tx_hash',
    numeric: false,
    disablePadding: true,
    label: 'Tx Id',
  },
  {
    id: 'requestedAmount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'withdraw_wallet',
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


const WithdrawTableList = (props) => {
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
  const [coinList, setCoinList] = useState([]);
  const withdrawList = useSelector((state) => state.withdrawList);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const tokenList = useSelector((state) => state.tokenList);

  
  const createWithdrawTable=React.useCallback(()=>{
   let alluser = [];

   let coins = [];

   for (const token of tokenList) {
     coins.push(token.symbol)
   }
   setCoinList(coins)
   for (const withdraw of withdrawList) {
     alluser.push(createData(withdraw.symbol, withdraw.tokenName, withdraw.createdAt, withdraw.tx_hash, withdraw.requestedAmount, withdraw.withdraw_wallet, withdraw.status));
   }
   setList(alluser);
  },[tokenList,withdrawList])


  useEffect(() => {
    createWithdrawTable()
  }, [createWithdrawTable])

  const handleDeleteRows = (selected) => {
    const deleteRows = list.filter((row) => !selected.includes(row.tx_hash));
    setSelected([]);
    setList(deleteRows);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = list.filter((row) => row.id !== id);
    setSelected([]);
    setList(deleteRow);
  };

  const filterData = (e) => {
    if (e === 'All') {
      setList(withdrawList)
      handleClose()
    }
    else {
      const filterRow = withdrawList.filter((row) => (row.symbol === e.e))
      setList(filterRow);
      handleClose()
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                list.map((row) => row.tx_hash)
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
        <Box sx={{
          display: 'flex'
        }}>
          <Typography
            sx={{ flex: '1 1 100%', fontsize: '20px' }}

            id="tableTitle"
            component="div"
          >
            Top Holders
          </Typography>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              startIcon={<FilterListIcon />}
            >
              Coin
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={(e) => { filterData("All") }}>All</MenuItem>
              {
                coinList.map((e) => {
                  return (
                    <MenuItem onClick={() => { filterData({ e }) }}>{e}</MenuItem>
                  )
                })
              }
            </Menu>
          </div>

        </Box>

        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={headCells}
            rowCount={list.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                list.map((row) => row.txid)
              )
            }
          />

          <TableBody>
            
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              
                <WithdrawTableListRow
                key={row.tx_hash}
                row={row}
                selected={selected.includes(row.tx_hash)}
                onSelectRow={() => onSelectRow(row.tx_hash)}
                onDeleteRow={() => handleDeleteRow(row.tx_hash)}
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

export default WithdrawTableList;