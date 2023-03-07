import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// @mui
// import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell} from '@mui/material';
import moment from "moment";
// components

// ----------------------------------------------------------------------

RecentlyAddedTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function RecentlyAddedTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  // const theme = useTheme();
  // const dispatch = useDispatch();
  const { name, price,added } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">
          
          ${price.length>0? price:'0' }</TableCell>
        <TableCell align="left">{moment(added).format('MM/DD/Y HH:mm:ss')}</TableCell>
      </TableRow>
    </>
  );

}