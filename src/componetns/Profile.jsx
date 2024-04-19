import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useState } from 'react';
import { PagesTwoTone, Pageview, PageviewOutlined, PageviewRounded, PageviewTwoTone } from '@mui/icons-material';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../features/userCreation/userSlice';
import { useStateContext } from '../context/ContextProvider';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange]=useState('')
  const {login, setLogin}=useStateContext()
  const dispatch=useDispatch()
  let userOut=useSelector(state=>state.user)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('this is setanchor1', event.currentTarget.value)
    console.log("this is weekly menu", anchorEl)
    console.log("this dateRange", dateRange)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSingout=(e)=>{
    dispatch(loginUser({loading:false, error:"", data:null}))
    console.log("this is userLogout", userOut)
    setLogin(true)
  }

  const handleMenuItemClick=(value)=>{
    console.log("This is the Value", value)
    setAnchorEl(value)
    setDateRange(value)
    if(value=="logout"){
        handleSingout()
    }
    // console.log("This is the Set Value", anchorEl)
    // handleClose()
  }
  return (
    <React.Fragment >
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="profile">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32 }}><PersonPinIcon/></Avatar>
            </IconButton>
            </Tooltip>
        </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 24,
              height: 24,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>handleMenuItemClick("password")} key="password">
          <Avatar ><LockResetIcon/></Avatar> Change password
        </MenuItem>
        <MenuItem onClick={()=>handleMenuItemClick("logout")} key="logout">
          <Avatar ><Logout/></Avatar>Logout
        </MenuItem>
        {/* <MenuItem onClick={()=>handleMenuItemClick("week3")} key="week3">
          <Avatar ><ContactSupportOutlinedIcon/></Avatar> Week 3
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}














