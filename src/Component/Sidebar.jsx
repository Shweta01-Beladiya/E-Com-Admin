// Sidebar.jsx
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer as MuiDrawer,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
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

// Constants
const drawerWidth = 280;

// Styled components
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
  position: 'sticky',
  top: 0,
  left: 0,
  width: drawerWidth,
  backgroundColor: '#2B221E',
  zIndex: 1100,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
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

const StyledListItemButton = styled(ListItemButton)(({ theme, isActive,open }) => ({
  minHeight: 48,
  justifyContent: 'initial',
  borderRadius: isActive ? '7px' : 'none',
  position: 'relative',
  padding: '10px',
  margin: open ? '0 8px 0 20px' : '',
  color: 'white',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '#1F1511',
    borderRadius: '7px',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: open ?'-8%' :'0',
      width: open ? '5px': '2px',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: '5px',
    }
  },

  ...(isActive && {
    backgroundColor: '#1F1511',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: open ?'-8%' :'0',
      width: open ? '5px': '2px',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: '5px',
    }
  })
}));

// Menu Items Configuration
const menuItems = [
  { text: 'Dashboard', icon: <AiFillHome size={20} />, path: '/dashboard' },
  { text: 'User', icon: <FaUser size={20} />, path: '/users' },
  { text: 'Main Category', icon: <BiSolidCategory size={20} />, path: '/maincategory' },
  { text: 'Category', icon: <FaListUl size={20} />, path: '/category' },
  { text: 'Sub Category', icon: <IoGrid size={20} />, path: '/subcategory' },
  { text: 'Products', icon: <PiPackageBold size={20} />, path: '/product' },
  { text: 'Unit', icon: <IoBagCheck size={20} />, path: '/unit' },
  { text: 'Size', icon: <CgArrowsShrinkH size={20} />, path: '/size' },
  { text: 'Stock', icon: <BsBoxSeamFill size={20} />, path: '/stock' },
  { text: 'Order', icon: <BsBoxes size={20} />, path: '' },
  { text: 'Review', icon: <GiStarsStack size={20} />, path: '' },
  { text: 'Coupen', icon: <BiSolidDiscount size={20} />, path: '' },
  {
    text: 'Offers',
    icon: <RiDiscountPercentFill size={20} />,
    dropdown: true,
    children: [
      { text: 'Product Offer', path: '' },
      { text: 'Offer', path: '' },
    ],
  },
  { text: 'Return Order', icon: <BsArrowRepeat size={20} />, path: '' },
  { text: 'Cancel Order', icon: <BsBoxSeamFill size={20} />, path: '' },
  { text: 'Reason for Cancellation', icon: <BsBoxSeamFill size={20} />, path: '' },
  { text: 'Terms & Conditions', icon: <BsBoxSeamFill size={20} />, path: '' },
  { text: 'FAQ', icon: <BiSolidMessage size={20} />, path: '' },
  { text: 'Account Policy', icon: <BiSolidMessage size={20} />, path: '' },
  { text: 'Deactivated Account', icon: <FaUserSlash size={20} />, path: '/DeactivateAccount' },
  { text: 'Help', icon: <IoHelpCircleSharp size={20} />, path: '/help' },
  { text: 'Contact Us', icon: <AiFillMessage size={20} />, path: '/ContactUs' },
  { text: 'About Us', icon: <AiFillInfoCircle size={20} />, path: '' },
  { text: 'Card', icon: <HiGiftTop size={20} />, path: '' },
  { text: 'Popular Brands', icon: <BiSolidPurchaseTag size={20} />, path: '' },
];

// Main Component
const Sidebar = ({ open, handleDrawerClose, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [offersOpen, setOffersOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleOffersDropdown = () => {
    setOffersOpen(!offersOpen);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <h2 className="pe-5 text-white">LOGO</h2>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <FiChevronRight className="text-white w-6 h-6" />
          ) : (
            <FiChevronLeft className="text-white w-6 h-6" />
          )}
        </IconButton>
      </DrawerHeader>

      <List className="bg-[#2B221E] h-full">
        {menuItems.map((item, index) => {
      const isActive = location.pathname === item.path || (item.path === "/dashboard" && location.pathname.startsWith("/view_profile"));

          return (
            <React.Fragment key={item.text || index}>
              <ListItem disablePadding>
                <StyledListItemButton
                  isActive={isActive}
                  open={open} 
                  onClick={item.dropdown ? toggleOffersDropdown : () => handleNavigation(item.path)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'white',
                    }}
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
                  {item.dropdown && open && (
                    <IconButton
                      sx={{
                        color: 'white',
                        padding: '0',
                        marginLeft: 'auto',
                      }}
                    >
                      {offersOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </IconButton>
                  )}
                </StyledListItemButton>
              </ListItem>

              {item.dropdown && offersOpen && item.children.map((child, childIndex) => (
                <ListItem
                  key={child.text || childIndex}
                  disablePadding
                  sx={{ pl: 4, color: 'white' }}
                >
                  <StyledListItemButton
                    isActive={location.pathname === child.path}
                    onClick={() => handleNavigation(child.path)}
                  >
                    <span className="absolute left-2">•</span>
                    <ListItemText
                      primary={child.text}
                      sx={{
                        opacity: open ? 1 : 0,
                        paddingLeft: '20px'
                      }}
                    />
                  </StyledListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;