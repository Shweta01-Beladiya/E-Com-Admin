// Header.jsx
import React from 'react';
import './header.css';
import { styled } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from 'react-bootstrap/Modal';

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const Header = ({ open, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Modal
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar className='bg-white text-black'>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <FiMenu className='text-[#2B221E] w-6 h-6' />
        </IconButton>
        <Typography variant="h6" noWrap component="div" >
          E Commerce
        </Typography>
        {/* <div className='ml-auto'>
       <img src={require('../s_img/loginUser.png')} alt=""  />
       </div> */}
        <div className='ml-auto'>
          <Button
            id="basic-button"
            aria-controls={isMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : undefined}
            onClick={handleClick}
          >
            <img src={require('../s_img/loginUser.png')} alt="" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <div className='flex'>
                <div>
                  <img src={require('../s_img/loginUser.png')} alt="" className='w-30 h-30 me-2' />
                </div>
                <div>
                  <p><b>John Patel</b></p>
                  <p className='text-[#7D7D7D]'>example@gmail.com</p>
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() => { handleClose(); setModalShow(true); }}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>

      {/* Logout Modal */}
      <Modal className='mv_logout_dialog' show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className='text-center mv_logout'>
          <h5 className='mb-2'>Logout?</h5>
          <p>Are you sure you want to<br /> Logout?</p>
          <div className='mv_logout_Model_button d-flex align-items-center justify-content-center'>
            <div className="mv_logout_cancel">
              <button onClick={() => setModalShow(false)}>Cancel</button>
            </div>
            <div className="mv_logout_button">
              <button>Logout</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </AppBar>
  );
};

export default Header;