import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography } from '@mui/material';
import moment from "moment";
// components

// ----------------------------------------------------------------------

ReportListTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ReportListTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }){
  const theme = useTheme();

  const { coin, userid, created,  txid , network, amount,walletAddress, status } = row;

  return (
    <TableRow hover selected={selected}>
      {onSelectRow && 
        <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      }
      <TableCell align="left" sx={{fontSize:'14px'}}>{coin}</TableCell>
      <TableCell>{userid}</TableCell>
      
      <TableCell align="left" sx={{fontSize:'12px'}}>{moment(created).format('Y/MM/DD HH:mm:ss')}</TableCell>
      <TableCell align="left" sx={{fontSize:'12px'}}>{txid}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize',fontSize:'14px' }}>
        {network}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', fontSize:'14px' }}>
        {amount}
      </TableCell>
      <TableCell align="left" sx={{fontSize:'12px'}}>
          {walletAddress}
      </TableCell>
      <TableCell align="left" sx={{fontSize:'12px'}}>
        <Typography 
          variant="outlined"
          color={(status === 'Success') ? theme.palette.success.dark : (status === 'Pending')?theme.palette.info.dark: theme.palette.error.dark}
          sx={{ textTransform: 'capitalize', fontSize:'14px'}}
        >
          {status}
        </Typography>
      </TableCell>
      
    </TableRow>
  );
}
