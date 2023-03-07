import React, { useEffect, useState } from "react";import { useSelector } from "react-redux";
import {
  Typography, Grid, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import useTable, { emptyRows } from "../../hooks/useTable";
import Iconify from "../../components/Iconify";
import { TableHeadCustom, TableEmptyRows,TableSelectedActions } from "../../components/table";
import KycListTableRow from "./kycListTableRow";
import EditModal from "../../Modal/editModal";
import KycMediaList from "./kycMediaList";


function createData(name, userid, createdAt,  email, status) {
  return { name, userid, createdAt, email,  status };
}

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
    id: 'createdAt',
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
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'isAction',
    numeric: true,
    disablePadding: false,
    label: 'Action',
    align : 'center'
  },
  {
    id: 'preview',
    disablePadding: false,
    label: 'View',
    
  },
];


const KycUsersList = (props) => {
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
  const [showLogin,setShowLogin] = useState(false)
  const [open, setOpen] = useState(false)
  const [mediaid, setMediaid]= useState();


  const kycList = useSelector((state) => state.kycList); 
  console.log("==========kycList",kycList)
  const createKycTable=React.useCallback(()=>{
    let alluser = [];
    for (const kyc of kycList) {
      
      alluser.push(createData(kyc.name, kyc.user_id, kyc.createdAt, kyc.email, kyc.status));
    }
    setList(alluser);
  },[kycList])
 
  useEffect(() => {
    createKycTable();
  }, [createKycTable])
 

  const preview = (status, userid) => {
    setOpen(status);
    setMediaid(userid)
  }

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
    <>
    {
      !open &&
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
          All KYC Users
        </Typography>
        {/* <IconButton aria-label="edit" onClick={() => setShowLogin(true)}>
                  <EditIcon />
                  
                </IconButton>
        <EditModal show={showLogin} close={() => setShowLogin(false)} /> */}
        
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
              <KycListTableRow
                key={row.userid}
                row={row}
                selected={selected.includes(row.userid)}
                onSelectRow={() => onSelectRow(row.userid)}
                onDeleteRow={() => handleDeleteRow(row.userid)}
                preview={preview}
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
     }
     {open &&
        <KycMediaList preview={preview} mediaid={mediaid} />
      }
     </>
    )
           
}

export default KycUsersList;