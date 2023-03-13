import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, IconButton, Stack, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { tokenStatusUpdateRequest } from '../../Actions/tokenActions';

// components

// ----------------------------------------------------------------------

TokenListTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};


const coins = {
  BNB: "BinanceIcon.svg",
  TRX: "tronicon.svg",
  ETH:"ethereum-eth.svg",
  
}


export default function TokenListTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, abc }) {
  const theme = useTheme();
  const dispatch = useDispatch()
  const updatetokenStatus = async (status, id, e) => {
    e.preventDefault();
    let data = {
      tokenid: id,
      status: status === true ? false : true
    }
    await dispatch(tokenStatusUpdateRequest(data));
  }
  const { name, fullName, networks, tokenType, image, status, id } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        {onSelectRow &&
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
        }
        <TableCell align="left">{name}</TableCell>
        <TableCell>{fullName}</TableCell>
        {/* <TableCell align="left">
          {(networks!==undefined)&&networks.map((network)=>{
            return (
                <Box
                  component="img"
                  sx={{
                    height: 23,
                    width: 35,
                    maxHeight: { xs: 50, md: 30 },
                    maxWidth: { xs: 50, md: 30 },
                  }}
                  alt="Binance Coin."
                  src={require(`../../assets/images/${coins[network.networkName]}`)}
                />
              )
          })}

        </TableCell> */}
        <TableCell align="left">{tokenType} </TableCell>
        <TableCell component="a" href={image} align="left"
          sx={{
            textTransform: 'capitalize',
            maxWidth: '180px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textDecoration: 'none',
            color: theme.palette.info.dark
          }}>Document</TableCell>
        <TableCell align="left" sx={{ fontSize: '12px' }}>
          <Typography
            variant="outlined"
            color={(status === true) ? theme.palette.success.dark : theme.palette.error.dark}
            sx={{ textTransform: 'capitalize', fontSize: '14px' }}
          >
            {status === true ? 'Active' : 'InActive'}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={2} sx={{ fontSize: '13px' }}>
            <Button variant="outlined" sx={{ fontSize: '13px' }} onClick={(e) => updatetokenStatus(status, id, e)} color={status === true ? 'error' : 'info'}>{status === true ? 'Block' : 'Un BLock'}</Button>
          </Stack>
        </TableCell>

        <TableCell padding="checkbox">
          <IconButton aria-label="edit" onClick={() => abc(true, id)} >
            <EditIcon />
          </IconButton>

        </TableCell>



      </TableRow>
    </>
  );
}
