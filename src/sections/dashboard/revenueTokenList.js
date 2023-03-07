import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination, Card, IconButton, Box
} from "@mui/material";

import useTable, { emptyRows } from "../../hooks/useTable";
import { TableHeadCustom, TableEmptyRows } from "../../components/table";
import RevenueTokenTableRow from "./revenueTokenTableRow";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function createData(name, revenue,change) {
  return { name, revenue,change };
}

const headCells = [
  { id: 'token', label: 'Token', align: 'left', },
  { id: 'revenue', label: 'Revenue', align: 'left', },
  {
    id: 'change',
    label: 'Change',
    align: 'left',
  },
  { id: 'graph', label: 'Graph', align: 'left', },
];

const RevenueTokenList = () => {
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

  const createRevenueTable=React.useCallback(()=>{
    let tokenData = [];
    if(tokenList.all !== undefined){
      for (const token of tokenList.all) {
        tokenData.push(createData(token.FROMSYMBOL, token.PRICE, token.CHANGE24HOUR));
      }
      setList(tokenData);

    }

  },[tokenList])

  useEffect(() => {
    createRevenueTable()
  }, [createRevenueTable])



  return (
    <Grid item xs={8} sm={6} sx={{
      border: '1px solid transparent',
      borderRadius: '20px',
  }}>
      <Card sx={{ borderRadius: '20px',padding:"14px" }}> 
        <TableContainer sx={{ maxHeight: 350, overflowX: 'overflow', justifyContent: 'space-between', fontSize: '20px',borderRadius:"20px" , backgroundImage: 'unset'}}>
        


        <Box sx={{
              display: 'flex'
            }}>
             <Typography
          sx={{ flex: '1 1 100%',margin:"16px 0 0 16px" }}
          variant="h6"
          id="tableMarketOverview"
          component="div"
        >
         High Revenue Token
        </Typography>
             
                <IconButton aria-label="more"  >
                  <MoreHorizIcon />
                </IconButton>
        
            </Box>

        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={headCells}
            rowCount={list.length}
          />

          <TableBody >
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <RevenueTokenTableRow
                key={row.name}
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
      </Card>

      

    </Grid>
  )
}

export default RevenueTokenList;