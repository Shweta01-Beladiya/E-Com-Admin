// Sidebar.jsx
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import './sidebar.css';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer as MuiDrawer,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { CgArrowsShrinkH } from 'react-icons/cg';
import { AiFillHome, AiFillInfoCircle, AiFillMessage } from 'react-icons/ai';
import { FaListUl, FaUser, FaUserSlash } from 'react-icons/fa';
import { IoBagCheck, IoGrid, IoHelpCircleSharp } from 'react-icons/io5';
import { BiSolidCategory, BiSolidDiscount, BiSolidMessage, BiSolidPurchaseTag } from 'react-icons/bi';
import { PiPackageBold } from 'react-icons/pi';
import { BsArrowRepeat, BsBoxes, BsBoxSeamFill } from 'react-icons/bs';
import { GiStarsStack } from 'react-icons/gi';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { HiGiftTop } from 'react-icons/hi2';

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const menuItems = [
  { text: 'Dashboard', icon: <AiFillHome size={20} />, path: '/dashboard' },
  { text: 'User', icon: <FaUser size={20} />, path: '/dashboard/users' },
  { text: 'Main Category', icon: <BiSolidCategory size={20} />, path: '/dashboard/maincategory' },
  { text: 'Category', icon: <FaListUl size={20} />, path: '/dashboard/category' },
  { text: 'Sub Category', icon: <IoGrid size={20} />, path: '/dashboard/subcategory' },
  { text: 'Products', icon: <PiPackageBold size={20} />, path: '/' },
  { text: 'Unit', icon: <IoBagCheck size={20} />, path: '/' },
  { text: 'Size', icon: <CgArrowsShrinkH size={20} />, path: '/' },
  { text: 'Stock', icon: <BsBoxSeamFill size={20} />, path: '/' },
  { text: 'Order', icon: <BsBoxes size={20} />, path: '/' },
  { text: 'Review', icon: <GiStarsStack size={20} />, path: '/' },
  { text: 'Coupen', icon: <BiSolidDiscount size={20} />, path: '/' },
  {
    text: 'Offers',
    icon: <RiDiscountPercentFill size={20} />,
    dropdown: true,
    children: [
      { text: 'Product Offer', path: '/' },
      { text: 'Offer', path: '/' },
    ],
  },
  { text: 'Return Order', icon: <BsArrowRepeat  size={20} />, path: '/' },
  { text: 'Cancel Order', icon: <BsBoxSeamFill  size={20} />, path: '/' },
  { text: 'Reason for Cancellation', icon: <BsBoxSeamFill  size={20} />, path: '/' },
  { text: 'Terms & Conditions', icon: <BsBoxSeamFill  size={20} />, path: '/' },
  { text: 'FAQ', icon: <BiSolidMessage size={20} />, path: '/' },
  { text: 'Account Policy', icon: <BiSolidMessage size={20} />, path: '/' },
  { text: 'Deactivated Account', icon: <FaUserSlash  size={20} />, path: '/' },
  { text: 'Help', icon: <IoHelpCircleSharp  size={20} />, path: '/' },
  { text: 'Contect Us', icon: <AiFillMessage  size={20} />, path: '/' },
  { text: 'About Us', icon: <AiFillInfoCircle  size={20} />, path: '/' },
  { text: 'Card', icon: <HiGiftTop  size={20} />, path: '/' },
  { text: 'Popular Brands', icon: <BiSolidPurchaseTag  size={20} />, path: '/' },
];

const Sidebar = ({ open, handleDrawerClose, theme }) => {
  const navigate = useNavigate();
  const [offersOpen, setOffersOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleOffersDropdown = () => {
    setOffersOpen(!offersOpen);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader className='bg-[#2B221E]'>
        <h1 className='text-3xl pe-5 text-white'>LOGO</h1>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ?
            <FiChevronRight className='text-white w-6 h-6' /> :
            <FiChevronLeft className='text-white w-6 h-6' />
          }
        </IconButton>
      </DrawerHeader>
      <List className='bg-[#2B221E] h-full'>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={item.dropdown ? toggleOffersDropdown : () => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                className='text-white hover:bg-[#3f322d] transition-colors duration-200'
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                  className='text-white'
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: 'white',
                  }}
                />
                {item.dropdown && (
                  <IconButton
                    sx={{
                      color: 'white',
                      marginLeft: open ? 'auto' : 0,
                      display: open ? 'block' : 'none',
                      transition: 'transform 0.3s ease',
                      transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
                    }}
                  >
                    {offersOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </IconButton>
                )}
              </ListItemButton>
            </ListItem>
            {item.dropdown && offersOpen && item.children.map((child) => (
              <ListItem
                key={child.id || child.text}
                disablePadding
                sx={{ display: 'block', pl: 4, color: 'white', position: 'relative' }}
              >
                <ListItemButton
                  onClick={() => handleNavigation(child.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    // '&:hover': {
                    //   backgroundColor: '#3f322d',
                    // },
                  }}
                  className='text-white  before:content-["•"] before:absolute before:text-white'
                >
                  <ListItemText
                    primary={child.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: 'inherit', 
                      paddingLeft:'20px'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;