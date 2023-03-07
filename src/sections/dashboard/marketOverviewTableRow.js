import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// @mui
// import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell} from '@mui/material';
import svgimg from '../../assets/images/graph.svg'
// components

// ----------------------------------------------------------------------

MarketOverviewTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function MarketOverviewTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  // const theme = useTheme();
  // const dispatch = useDispatch();
  const { name, price, volume, change } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">${price}</TableCell>
        <TableCell align="left">{volume !== undefined && volume.toFixed(5)}</TableCell>
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