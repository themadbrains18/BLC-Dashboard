import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination,Box, IconButton
} from "@mui/material";

import useTable, { emptyRows } from "../../hooks/useTable";
import { TableHeadCustom, TableEmptyRows } from "../../components/table";
import RecentlyAddedTableRow from "./recentlyAddedTableRow";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function createData(name, price, added) {
  return { name, price,added };
}

const headCells = [
  { id: 'token', label: 'Token', align: 'left', },
  { id: 'price', label: 'Price', align: 'left', },
  {
    id: 'added',
    label: 'Added',
    align: 'left',
  }
];

const RecentlyAddedTokenList = () => {
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
  
  const createRecentTable= React.useCallback(()=>{
    let tokenData = [];
  if(tokenList.recent!==undefined){

    for (const token of tokenList.recent) {
      const price = token.price;

     let a= (price && price.map((e)=>{
        return  e.price;
      }))
      tokenData.push(createData(token.coinName, a, token.createdAt));
    }
    setList(tokenData);
  }
  },[tokenList])
 
  useEffect(() => {
    createRecentTable();

  }, [createRecentTable])



  return (
    <Grid item xs={8} sm={4} sx={{
      border: '1px solid transparent',
      borderRadius: '20px',
      marginBottom:"30px",
      
    }}>

      <TableContainer sx={{ maxHeight: 350, overflowX: 'overflow', justifyContent: 'space-between', fontSize: '20px',backgroundColor:(theme)=> theme.palette.bgGray.dark,
      borderRadius: '20px',
      padding: '30px' }}>

<Box sx={{
              display: 'flex'
            }}>
              <Typography
                sx={{ flex: '1 1 100%', fontsize: '20px' }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Recently Added Coin
              </Typography>
             
                <IconButton aria-label="more"  >
                  <MoreHorizIcon />
                </IconButton>
        
            </Box>

      

        <Table size={dense ? 'small' : 'medium'} sx={{ padding:"24px"}}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={headCells}
            rowCount={list.length}
          />

          <TableBody>
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <RecentlyAddedTableRow
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

export default RecentlyAddedTokenList;