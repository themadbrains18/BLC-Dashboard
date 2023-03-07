import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddCardIcon from '@mui/icons-material/AddCard';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WithdrawalIcon from '@mui/icons-material/IosShare';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BuildIcon from '@mui/icons-material/Build';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function MainListItems(props) {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    switch (props.location) {
      case "/dashboard":
        setSelectedIndex(0)
        break
      case "/user":
        setSelectedIndex(1)
        break
      case "/token":
        setSelectedIndex(2)
        break
      case "/kyc":
        setSelectedIndex(3)
        break
      case "/wallet":
        setSelectedIndex(1)
        break
      case "/deposit":
        setSelectedIndex(5)
        break
      case "/withdraw":
        setSelectedIndex(6)
        break
      case "/order":
        setSelectedIndex(7)
        break
      case "/payment":
        setSelectedIndex(8)
        break
      case "/report":
        setSelectedIndex(9)
        break
      case "/support":
        setSelectedIndex(10)
        break
      default:
        break
    }
  }, [])

  return (
    <>
      <ListItemButton component={Link} to='/dashboard'
        selected={selectedIndex === 0}
        // onClick={() =>  setSelectedIndex(0)}
      >
        <ListItemIcon sx={{ color: "white" }}>
          <AnalyticsIcon />
        </ListItemIcon>
        <ListItemText primary="Analysis" />
      </ListItemButton>
      {/* <ListItemButton>
      <ListItemIcon sx={{ color: "white" }}>
        <Inventory2Icon />
      </ListItemIcon>
      <ListItemText primary="Sub Admin" />
    </ListItemButton> */}
      <ListItemButton component={Link} to='/user' 
      selected={selectedIndex === 1}
        // onClick={() =>  setSelectedIndex(1)}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton component={Link} to='/token'
       selected={selectedIndex === 2}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <CurrencyExchangeIcon />
        </ListItemIcon>
        <ListItemText primary="Token" />
      </ListItemButton>
      <ListItemButton component={Link} to='/kyc' 
      selected={selectedIndex === 3}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="KYC" />
      </ListItemButton>
      <ListItemButton 
      selected={selectedIndex === 4}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Wallet" />
      </ListItemButton>
      <ListItemButton component={Link} to='/deposit' 
      selected={selectedIndex === 5}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <SaveAltIcon />
        </ListItemIcon>
        <ListItemText primary="Deposits" />
      </ListItemButton>
      <ListItemButton component={Link} to='/withdraw' 
      selected={selectedIndex === 6}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <WithdrawalIcon />
        </ListItemIcon>
        <ListItemText primary="Withdrawals" />
      </ListItemButton>
      <ListItemButton component={Link} to='/order' 
      selected={selectedIndex === 7}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <StorefrontIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton component={Link} to='/payment' 
      selected={selectedIndex === 8}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <AddCardIcon />
        </ListItemIcon>
        <ListItemText primary="Payment" />
      </ListItemButton>
      <ListItemButton component={Link} to='/report' 
      selected={selectedIndex === 9}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <TextSnippetIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton component={Link} to='/support' 
      selected={selectedIndex === 10}
        >
        <ListItemIcon sx={{ color: "white" }}>
          <HelpCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
    </>
  )
};

