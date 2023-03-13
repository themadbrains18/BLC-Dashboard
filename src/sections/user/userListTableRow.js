// import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
// import { useDispatch } from 'react-redux';
// import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Avatar } from '@mui/material';
import moment from "moment";

// import Label from '../../components/Label';
// components

// ----------------------------------------------------------------------

UserListTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserListTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  // const theme = useTheme();
  // const dispatch = useDispatch();
  const { userid, email,dial_code , number, UID, kycstatus,created } = row;

  // const [open, setOpen] = useState('');

  function stringAvatar(name) {
    console.log(name)
    return {
      sx: {
        bgcolor: '#fff',
      },
      children: name.substring(0, 2),
    };
  }

  // const updateUserStatus = async (status, userid, e) => {
  //   e.preventDefault();
  //   let data = {
  //     userid: userid,
  //     status: status === 'Active' ? 'On Hold' : 'Active'
  //   }
  //   await dispatch(userStatusUpdateRequest(data));
  // }

  // console.log(open)

  return (
    <>
      <TableRow hover selected={selected}>
        {onSelectRow &&
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
        }
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar variant="rounded" alt={userid} {...stringAvatar(email)} sx={{ mr: 2, background: '#3faf86' }} />
          <Typography>{userid}</Typography>

        </TableCell>
        <TableCell align="left">{email}</TableCell>
        <TableCell align="left">{dial_code}</TableCell>
        <TableCell align="left">{number}</TableCell>
        <TableCell align="left">
          {UID}
        </TableCell>
        <TableCell align="left">
          {kycstatus!=='NA'?(kycstatus!== 'pending' ? (kycstatus === 'reject'?'Reject' : "Success"): 'Pending'):'Not Applied'}
        </TableCell>
        <TableCell align="left">{moment(created).format('Y/MM/DD HH:mm:ss')}</TableCell>
       
      
 
        {/* <TableCell align="center">
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <Button variant="outlined" onClick={(e) => updateUserStatus(status, userid, e)}>{status === 'Active' ? 'Hold' : 'Active'}</Button>
            <Button variant="outlined" color="error" onClick={() => setOpen('center')}>{status === 'Block' ? 'Unblock' : 'Block'}</Button></Stack>
        </TableCell> */}

       
      </TableRow>


      {/* <Modal open={!!open} onClose={() => setOpen('')}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          layout={open || undefined}
        >
          <ModalClose />
          <Typography
            id="layout-modal-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Modal Dialog
          </Typography>
          <Typography id="layout-modal-description" textColor="text.tertiary">
            This is a <code>{open}</code> modal dialog. Press <code>esc</code> to
            close it.
          </Typography>
        </ModalDialog>
      </Modal> */}

    </>
  );
}
