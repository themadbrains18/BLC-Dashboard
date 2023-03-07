import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography,Avatar } from '@mui/material';
// import Label from '../../components/Label';
// components

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const {  userid, email,dial_code, number, UID } = row;

  function stringAvatar(name) {
    console.log(name)
    return {
      sx: {
        bgcolor: '#fff',
      },
      children: name.substring(0, 2),
    };
  }

  return (
    <TableRow hover selected={selected}>
      {onSelectRow && 
        <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      }
      
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar variant="rounded" alt={userid} {...stringAvatar(email)} sx={{ mr: 2, background:'#3faf86' }} />
        <Typography variant="subtitle2" noWrap>
          {userid}
        </Typography>
      </TableCell>
      <TableCell align="left">{dial_code}</TableCell>
      <TableCell align="left">{email}</TableCell>

      <TableCell align="left">
        {number}
      </TableCell>
      <TableCell align="left" >
        {UID}
      </TableCell>

    </TableRow>
 
  );
}
