import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// @mui
// import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell} from '@mui/material';
import svgimg from '../../assets/images/graph.svg'
// components

// ----------------------------------------------------------------------

RevenueTokenTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function RevenueTokenTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  // const theme = useTheme();
  // const dispatch = useDispatch();
  const { name, revenue,change } = row;

  return (
    <>
      <TableRow hover selected={selected} >
        
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">${revenue}</TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {change !== undefined && change.toFixed(5)}
        </TableCell>
        <TableCell align="left">
          <img src={svgimg} alt='' />
        </TableCell>
      </TableRow>
    </>
  );

}