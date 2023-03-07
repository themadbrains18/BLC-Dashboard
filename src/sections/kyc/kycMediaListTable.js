import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell } from '@mui/material';

// components

// ----------------------------------------------------------------------

KycMediaListTable.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};





export default function KycMediaListTable({ row, selected, onEditRow, onSelectRow, onDeleteRow }){
  const theme = useTheme();

  const { name,  email, document,documentnum, front,back, pdf} = row;

  return (
    <TableRow hover selected={selected}>
      {onSelectRow && 
        <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      }
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {document}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {documentnum}
      </TableCell>
      <TableCell component="a" href="/dashboard" align="left" sx={{ textTransform: 'capitalize',
     maxWidth: '180px',
     whiteSpace: 'nowrap',
     overflow: 'hidden',
     textOverflow: 'ellipsis',
     textDecoration:'none',
     color:theme.palette.info.dark }}>
        {front}
      </TableCell>
      <TableCell component="a" href="/dashboard" align="left" sx={{ textTransform: 'capitalize',
     maxWidth: '180px',
     whiteSpace: 'nowrap',
     overflow: 'hidden',
     textOverflow: 'ellipsis',
     textDecoration:'none',
     color:theme.palette.info.dark }}>
        {back}
      </TableCell>
      <TableCell component="a" href="/dashboard" align="left" sx={{ textTransform: 'capitalize',
     maxWidth: '180px',
     whiteSpace: 'nowrap',
     overflow: 'hidden',
     textOverflow: 'ellipsis',
     textDecoration:'none',
     color:theme.palette.info.dark }}>
        {pdf}
      </TableCell>
      
    </TableRow>
  );
}
