import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
// @mui
import PreviewIcon from '@mui/icons-material/Preview';
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Button, Stack, IconButton } from '@mui/material';
import moment from "moment";
import { useDispatch } from 'react-redux';
import { kycStatusUpdateRequest } from '../../Actions/kycActions';

// components

// ----------------------------------------------------------------------

KycListTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};





export default function KycListTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, preview }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const updateKycStatus = async (status, userid, e) => {
    e.preventDefault();
    let data = {
      status: status === 'pending' ? 'success' : 'reject'
    }


    await dispatch(kycStatusUpdateRequest(userid, data));
  }



  const { name, userid, createdAt, email, status } = row;

  return (
    <TableRow hover selected={selected}>
      {onSelectRow &&
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      }
      <TableCell align="left">{name}</TableCell>
      <TableCell>{userid}</TableCell>

      <TableCell align="left">{moment(createdAt).format('Y/MM/DD HH:mm:ss')}</TableCell>
      <TableCell align="left">{email}</TableCell>

      <TableCell align="left">
        <Typography
          variant="outlined"
          color={(status === 'success') ? theme.palette.success.dark : theme.palette.error.dark}
          sx={{ textTransform: 'capitalize' }}
        >
          {status !== 'pending' ? ((status === 'success') ? 'Accept' : 'Reject') : "Pending"}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', fontSize: '13px' }}>
          <Button variant="outlined" sx={{ fontSize: '13px' }} onClick={(e) => updateKycStatus(status, userid, e)} color={status !== 'pending' ? 'error' : 'info'}>{status !== 'pending' ? 'Reject' : 'Approve'}</Button>
        </Stack>
      </TableCell>
      <TableCell>
        <IconButton aria-label="edit" component={Link} to={`/kyc/media/${userid}`}>

          <PreviewIcon onClick={() => preview(userid)} />

        </IconButton>
      </TableCell>
    </TableRow>
  );
}
