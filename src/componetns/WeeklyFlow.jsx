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

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange]=useState('')
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick=(value)=>{
    setAnchorEl(value)
    setDateRange(value)
  }
  return (
    <React.Fragment >
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Filter week">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32 }}><MoreHorizOutlinedIcon/></Avatar>
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
        <MenuItem onClick={()=>handleMenuItemClick("week1")} key="week1">
          <Avatar ><ContactSupportOutlinedIcon/></Avatar> Week 1
        </MenuItem>
        <MenuItem onClick={()=>handleMenuItemClick("week2")} key="week2">
          <Avatar ><ContactSupportOutlinedIcon/></Avatar>Week 2
        </MenuItem>
        <MenuItem onClick={()=>handleMenuItemClick("week3")} key="week3">
          <Avatar ><ContactSupportOutlinedIcon/></Avatar> Week 3
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}



















// import React, { useState } from 'react';
// import { Menu, MenuItem, Avatar } from '@mui/material';
// import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';

// const MyMenu = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedValue, setSelectedValue] = useState('');

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (value) => {
//     setSelectedValue(value);
//     handleClose(); // Close the menu after selecting a value
//     // You can perform any additional actions here based on the selected value
//     console.log('Selected Value:', value);
//   };

//   return (
//     <div>
//       <Avatar onClick={handleClick} />
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         PaperProps={{
//           elevation: 0,
//           // Your PaperProps styles here
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem onClick={() => handleMenuItemClick('week1')} key="week1">
//           <Avatar>
//             <ContactSupportOutlinedIcon />
//           </Avatar>
//           Week 1
//         </MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick('week2')} key="week2">
//           <Avatar>
//             <ContactSupportOutlinedIcon />
//           </Avatar>
//           Week 2
//         </MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick('week3')} key="week3">
//           <Avatar>
//             <ContactSupportOutlinedIcon />
//           </Avatar>
//           Week 3
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default MyMenu;
