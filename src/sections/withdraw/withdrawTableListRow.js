import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography } from '@mui/material';
import moment from "moment";
// components

// ----------------------------------------------------------------------

WithdrawListTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function WithdrawListTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { symbol, tokenName, createdAt, tx_hash, requestedAmount, withdraw_wallet, status } = row;


  return (
    <TableRow hover selected={selected}>
      {onSelectRow &&
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      }
      <TableCell align="left" sx={{ fontSize: '14px' }}>{symbol}</TableCell>
      <TableCell>{tokenName}</TableCell>

      <TableCell align="left" sx={{ fontSize: '12px' }}>{moment(createdAt).format('Y/MM/DD HH:mm:ss')}</TableCell>
      <TableCell align="left" sx={{
        fontSize: '12px',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>{tx_hash}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', fontSize: '14px' }}>
        {requestedAmount}
      </TableCell>
      <TableCell align="left" sx={{
        fontSize: '12px',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign:'center'
      }}>
        {withdraw_wallet !== undefined && withdraw_wallet}
      </TableCell>
      <TableCell align="left" sx={{ fontSize: '12px' }}>
        <Typography
          variant="outlined"
          color={(status === 'success') ? theme.palette.success.dark :  theme.palette.error.dark}
          sx={{ textTransform: 'capitalize', fontSize: '14px' }}
        >
          {status==='success'?'Success' : (status === 'pending' ? 'Pending':'Failed')}
        </Typography>
      </TableCell>

    </TableRow>
  );
}
