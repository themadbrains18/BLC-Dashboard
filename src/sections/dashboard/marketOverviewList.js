import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination
} from "@mui/material";

import useTable, { emptyRows } from "../../hooks/useTable";
import { TableHeadCustom, TableEmptyRows } from "../../components/table";
import MarketOverviewTableRow from "./marketOverviewTableRow";

function createData(name, price, volume, change) {
  return { name, price, volume, change };
}

const headCells = [
  { id: 'token', label: 'Token', align: 'left', },
  { id: 'price', label: 'Price', align: 'left', },
  {
    id: 'volume',
    label: 'Volume',
    align: 'left',
  },
  {
    id: 'twentyFourh',
    label: '24h',
    align: 'left',
  },
  {
    id: 'graph',
    label: 'Graph Active',
    align: 'left',

  },
];

const MarketOverviewList = () => {
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

  const tokenList = useSelector((state) => state.marketCoinList);

  const createMarketTable =  React.useCallback(() => {
    let tokenData = [];
    if(tokenList.all!==undefined){
   for (const token of tokenList.all) {
      tokenData.push(createData(token.FROMSYMBOL, token.PRICE, token.VOLUME24HOUR, token.CHANGE24HOUR));
    }
    setList(tokenData);
  }
  },[tokenList])

  useEffect(() => {

    createMarketTable();
  }, [createMarketTable])


  return (
    <Grid item xs={8} sm={8} sx={{
      border: '1px solid transparent',
      borderRadius: '10px'
    }}>

      <TableContainer sx={{
        maxHeight: 350, overflowX: 'overflow', justifyContent: 'space-between', fontSize: '20px', backgroundColor: (theme) => theme.palette.bgGray.dark, borderRadius: '20px',
        padding: '30px'
      }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableMarketOverview"
          component="div"
        >
          Market Overview
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
              <MarketOverviewTableRow
                key={row.id}
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

export default MarketOverviewList;