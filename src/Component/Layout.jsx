// Layout.jsx
import React, { useEffect } from 'react';
import { styled,useTheme } from '@mui/material/styles';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Layout = () => {
  const theme = useTheme();

  const isLargeScreen = useMediaQuery('(min-width:769px)');
  const [open, setOpen] = React.useState(isLargeScreen);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isLargeScreen);
  },[isLargeScreen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar 
        open={open} 
        handleDrawerClose={handleDrawerClose} 
        theme={theme} 
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3}} style={{backgroundColor:'#F7F7F7'}}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;