// Layout.jsx
import React, { useEffect } from 'react';
import { styled,useTheme } from '@mui/material/styles';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100vh', 
      display: 'block',
      width: '100%', 
      marginLeft: 0,
    },
  })
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Layout = () => {
  const theme = useTheme();

  const isLargeScreen = useMediaQuery('(min-width:600px)');
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
      <Main open={open} style={{ backgroundColor: '#F7F7F7' }}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Layout;