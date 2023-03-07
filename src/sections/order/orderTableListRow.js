import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography } from '@mui/material';
import moment from "moment";
// components

// ----------------------------------------------------------------------

OrderListTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function OrderListTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, filterData }) {
  const theme = useTheme();

  const { postid, currency, createdAt, order_amount , quantity, price, token, isComplete, isCanceled, inProcess } = row;

  return (
    <TableRow hover selected={selected}>
      {onSelectRow &&
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      }
      <TableCell align="left" sx={{ fontSize: '14px',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>{postid}</TableCell>
      <TableCell align="left">{currency}</TableCell>

      <TableCell align="left" sx={{ fontSize: '12px' }}>{moment(createdAt).format('Y/MM/DD HH:mm:ss')}</TableCell>
      <TableCell align="left" sx={{
        fontSize: '12px',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>{order_amount}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', fontSize: '14px' }}>
        {quantity}
      </TableCell>
      <TableCell align="left" sx={{
        fontSize: '12px',
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {price}
      </TableCell>
     <TableCell>{token}</TableCell>
      <TableCell align="left" sx={{ fontSize: '12px' }}>
        <Typography
          variant="outlined"
          color={(isComplete === true) ? theme.palette.success.dark :  theme.palette.error.dark}
          sx={{ textTransform: 'capitalize', fontSize: '14px' }}
        >
          {isComplete===true?'Success':'Failed'}
        </Typography>
      </TableCell>
      <TableCell align="left" sx={{ fontSize: '12px' }}>
        <Typography
          variant="outlined"
          color={(isCanceled === true) ? theme.palette.success.dark :  theme.palette.error.dark}
          sx={{ textTransform: 'capitalize', fontSize: '14px' }}
        >
          {isCanceled===true?'Canceled':'Failed'}
        </Typography>
      </TableCell>
      <TableCell align="left" sx={{ fontSize: '12px' }}>
        <Typography
          variant="outlined"
          color={(inProcess === true) ? theme.palette.success.dark :  theme.palette.error.dark}
          sx={{ textTransform: 'capitalize', fontSize: '14px' }}
        >
          {inProcess===true?'Pending':'Failed'}
        </Typography>
      </TableCell>

    </TableRow>
  );
}
