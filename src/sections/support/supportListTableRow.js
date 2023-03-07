import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography,Button,Stack } from '@mui/material';
import moment from "moment";
// components

// ----------------------------------------------------------------------

SupportListTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};





export default function SupportListTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }){
  const theme = useTheme();

  const { name, userid, created, email, subject, issue, status ,priority } = row;

  return (
    <TableRow hover selected={selected}>
      {onSelectRow && 
        <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      }
      <TableCell align="left">{name}</TableCell>
      <TableCell>{userid}</TableCell>
      
      <TableCell align="left">{moment(created).format('Y/MM/DD HH:mm:ss')}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {subject}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {issue}
      </TableCell>
      <TableCell align="left">
        <Typography 
          variant="outlined"
          color={(status === 'Active') ? theme.palette.success.dark : theme.palette.error.dark}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Typography>
        </TableCell>
        <TableCell align="left">
        <Typography 
          variant="outlined"
          color={(status === 'High') ? theme.palette.success.dark : theme.palette.info.dark}
          sx={{ textTransform: 'capitalize' }}
        >
          {priority}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Stack direction="row" spacing={2} sx={{justifyContent:'center', fontSize:'13px'}}>
        <Button variant="outlined" sx={{fontSize:'13px'}} color='info'>{status === 'Approve' ? 'Pending' : 'Approve'}</Button>
        <Button variant="outlined" sx={{fontSize:'13px'}} color="error">Reject</Button></Stack>
      </TableCell>
    </TableRow>
  );
}
