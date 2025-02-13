import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidth = 280; 

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Layout = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width: 769px)');
  const [open, setOpen] = useState(isLargeScreen);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        sx={{
          position: isLargeScreen ? 'relative' : 'absolute',
          zIndex: isLargeScreen ? 'auto' : 1300,
        }}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#F7F7F7',
          transition: 'margin 0.3s ease-in-out',
          // marginLeft: isLargeScreen ? (open ? `${drawerWidth}px` : '0px') : '0px', 
          width: isLargeScreen ? `calc(100% - ${open ? drawerWidth : 0}px)` : '100%', 
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;