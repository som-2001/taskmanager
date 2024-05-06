import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { changeTodo } from '@/redux/slice';
import { useDispatch, useSelector } from 'react-redux';

const drawerWidth = 60;

function SideBar(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const { body,value } = useSelector(state => state.notes);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box >
      <Toolbar />
      <List>
        {['Dashboard', 'Trash', 'Spam','Account'].map((text, index) => (
          <ListItem key={text}  disablePadding>
            <ListItemButton >
              <ListItemIcon style={{color:"black"}}>
                {index === 0 ? <SpaceDashboardIcon titleAccess='Todo' style={{fontSize:"1.9rem"}} onClick={(e)=>dispatch(changeTodo('Todo'))}/> : null}
                {index === 1 ? <SyncIcon titleAccess='In Progress' style={{fontSize:"1.9rem"}} onClick={(e)=>dispatch(changeTodo('In Progress'))}/> : null}
                {index === 2 ? <CheckCircleIcon titleAccess='Complete' style={{fontSize:"1.9rem"}} onClick={(e)=>dispatch(changeTodo('Complete'))}/> : null}
                {index === 3 ? <AccountCircleIcon titleAccess='Account' style={{position:"fixed",bottom:"5%",left:"0.7%",fontSize:"2.2rem"}}/> : null}
              </ListItemIcon>
            
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex',
   
      '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper':{
          
          backgroundColor:"whitesmoke",
          overflow:"hidden",
          
      },
      '& .css-hyum1k-MuiToolbar-root':{
        minHeight:'250px',
        padding:'20px'
      },
      '& .css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root':{
         paddingTop:"15px",
         paddingBottom:"25px"
      }
    }}
    >
      <CssBaseline />
    
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
            
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default SideBar;
