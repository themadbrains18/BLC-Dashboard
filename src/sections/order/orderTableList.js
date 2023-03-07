import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import {
    Typography, Grid, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton, Box, Button, Menu, MenuItem
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import useTable, { emptyRows } from "../../hooks/useTable";
import Iconify from "../../components/Iconify";
import { TableHeadCustom, TableEmptyRows, TableSelectedActions } from "../../components/table";
import OrderTableListRow from "./orderTableListRow";


function createData(postid, currency, createdAt, order_amount, quantity, price, token, isComplete, isCanceled, inProcess) {
    return { postid, currency, createdAt, order_amount, quantity, price, token, isComplete, isCanceled, inProcess };
}


const headCells = [
    {
        id: 'postid',
        numeric: true,
        disablePadding: false,
        label: 'Post Id',
    },
    {
        id: 'currency',
        numeric: false,
        disablePadding: true,
        label: 'Currency',
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: true,
        label: 'Date',
    },
    {
        id: 'order_amount',
        numeric: false,
        disablePadding: true,
        label: 'Order Amount',
    },
    {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price'
    },
    {
        id: 'token',
        numeric: true,
        disablePadding: false,
        label: 'Token',
    },
    {
        id: 'isComplete',
        numeric: true,
        disablePadding: false,
        label: 'Complete',
    },
    {
        id: 'isCanceled',
        numeric: true,
        disablePadding: false,
        label: 'Cancel',
    },
    {
        id: 'inProcess',
        numeric: true,
        disablePadding: false,
        label: 'Process',
    },
];


const OrderTableList = (props) => {
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [anchorEl2, setAnchorEl2] = useState(null);

    const orderList = useSelector((state) => state.orderList);
    const tokenList = useSelector((state) => state.tokenList);

    const createOrderTable = React.useCallback(() => {
        let alluser = [];
        let coins = [];
        setSearchParams('')
       if(tokenList !== '' ) {
        for (const token of tokenList) {
            coins.push(token.coinName)
        }
        setCoinList(coins)
       }
         
        
        for (const order of orderList) {
            alluser.push(createData(order.postid, order.currency, order.createdAt, order.order_amount, order.quantity, order.price, order.token, order.isComplete, order.isCanceled, order.inProcess));
        }
        setList(alluser);
    },[orderList,tokenList])

    useEffect(() => {
        createOrderTable()
    }, [createOrderTable])

    const handleDeleteRows = (selected) => {
        const deleteRows = list.filter((row) => !selected.includes(row.txid));
        setSelected([]);
        setList(deleteRows);
    };

    const handleDeleteRow = (id) => {
        const deleteRow = list.filter((row) => row.id !== id);
        setSelected([]);
        setList(deleteRow);
    };

    const filterData = (status) => {
        let newObj = {}
        for (const [key, value] of searchParams.entries()) {
            if (key === 'status') {
                newObj[key] = status
            }
            else {
                newObj[key] = value
            }

        }
        // console.log("====", searchParams.get('coin') && searchParams.get('status') !== "All" && searchParams.get('coin') !== "All")
        setSearchParams(createSearchParams({ ...newObj, status }));
        if ((status === 'All' && !searchParams.get('coin')) || (status === 'All' && searchParams.get('coin') === "All")) {
            setList(orderList)
        }
        else {
            const filterRow = orderList.filter((row) => {
                console.log(searchParams.get('coin'), status);
                if (status === 'All') {
                    // console.log("===All Status",searchParams.get('coin'))
                    console.log(row.token);
                    return row.token === searchParams.get('coin')
                }
                else if (searchParams.get('coin') && status !== "All" && searchParams.get('coin') !== "All") {
                    // console.log("====jjjj",searchParams.get('coin'),row[status] );
                    return (

                        row[status] === true && row.token === searchParams.get('coin')
                    )
                } else {
                    // console.log("====ppp", row[status])
                    return row[status] === true
                }
            })
            setList(filterRow)
        }
        handleClose()
    }

    const filterDataCoin = (e) => {

        let newObj = {}
        for (const [key, value] of searchParams.entries()) {
            newObj[key] = value
        }
        setSearchParams(createSearchParams({ ...newObj, "coin": e.e }));

        if ((e.e === 'All' && !searchParams.get('status')) || (e.e === 'All' && searchParams.get('status') === "All")) {
            setList(orderList)
        }
        else {

            const filterRow = orderList.filter((row) => {
                if (e.e === 'All') {
                    // console.log("====all",searchParams.get('status'))
                    return row[searchParams.get('status')] === true
                }
                else if (searchParams.get('status') && e.e !== "All" && searchParams.get('status') !== "All") {
                    // console.log("=====",e.e,searchParams.get('status')  )
                    return (row.token === e.e && row[searchParams.get('status')] === true)
                } else {
                    // console.log("====hello", row.token, e.e)
                    return row.token === e.e
                }
            })
            setList(filterRow);
        }
        handleClose()
    }

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null);
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
                                list.map((row) => row.postid)
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
                        Top Orders
                    </Typography>
                    <div>
                        <Button
                            name="el1"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={e => setAnchorEl(e.currentTarget)}
                            startIcon={<FilterListIcon />}
                        >
                            Status
                        </Button>
                        <Menu
                            id="simple-menu"
                            name="el1"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            keepMounted
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}

                        >
                            <MenuItem onClick={(e) => { filterData("All") }} >All</MenuItem>
                            <MenuItem onClick={(e) => { filterData("inProcess") }}>Process</MenuItem>
                            <MenuItem onClick={(e) => { filterData("isComplete") }}>Complete</MenuItem>
                            <MenuItem onClick={(e) => { filterData("isCanceled") }}>Cancel</MenuItem>
                        </Menu>
                    </div>
                    <div>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={e => setAnchorEl2(e.currentTarget)}
                            startIcon={<FilterListIcon />}
                        >
                            Coin
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl2}
                            keepMounted
                            open={Boolean(anchorEl2)}
                            onClose={() => setAnchorEl2(null)}
                        >
                            <MenuItem onClick={(e) => { filterDataCoin({ e: "All" }) }}>All</MenuItem>
                            {
                                coinList.map((e) => {
                                    return (
                                        <MenuItem onClick={() => { filterDataCoin({ e }) }}>{e}</MenuItem>
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
                                list.map((row) => row.postid)
                            )
                        }
                    />

                    <TableBody>
                        {console.log("page * rowsPerPage",page * rowsPerPage)}
                        {console.log("page * rowsPerPage",page * rowsPerPage + rowsPerPage)}
                        {list.length > 0 && list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <OrderTableListRow
                                // key={row.postid}
                                row={row}
                                selected={selected.includes(row.postid)}
                                onSelectRow={() => onSelectRow(row.postid)}
                                onDeleteRow={() => handleDeleteRow(row.postid)}
                            />
                        ))}
                        {/* {list.length === 0 && list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <OrderTableListRow
                                key={row.txid}
                                row={row}
                                selected={selected.includes(row.txid)}
                                onSelectRow={() => onSelectRow(row.txid)}
                                onDeleteRow={() => handleDeleteRow(row.txid)}
                            />
                        ))} */}
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

export default OrderTableList;