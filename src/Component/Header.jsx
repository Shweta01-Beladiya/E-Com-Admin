// Header.jsx
import React, { useEffect, useState } from 'react';
import './header.css';
import { styled } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { FaPowerOff, FaUser } from 'react-icons/fa';
import axios from 'axios';

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
  [theme.breakpoints.down('sm')]: {
    transition: 'none',
    marginLeft: 0,
    width: '100%',
  },
}));


const Header = ({ open, handleDrawerOpen }) => {

  const isSmallScreen = useMediaQuery('(max-width:601px)');

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const token = localStorage.getItem('token');

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [data,setData] = useState({});

  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setModalShow(false);
    setTimeout(() => {
      navigate('/');
    }, (200));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/getUser`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log("Response", response.data);
        // console.log("Response", response.data.user);
        setData(response.data.user);
      } catch (error) {
        console.error('Data Fetching Error:', error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar position="fixed" disableTransition={isSmallScreen} open={open} sx={{ paddingRight: '0 !important' }}>
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
        {/* <div> */}
        <Button
          id="basic-button"
          aria-controls={isMenuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? 'true' : undefined}
          onClick={handleClick}
          sx={{ marginLeft: 'auto' }}
        >
          <img src={`${BaseUrl}/${data.image}`} alt="" style={{width:'50px', height:'50px', borderRadius:'50%'}} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          className='p-3'
        >
          <MenuItem onClick={handleClose}>
            <div className='d-flex'>
              <div>
                <img src={`${BaseUrl}/${data.image}`} alt="" style={{width:'50px', height:'50px', borderRadius:'50%'}} className='me-3' />
              </div>
              <div>
                <p className='mb-0'><b>{data.name}</b></p>
                <p className='text-[#7D7D7D] mb-0'>{data.email ? data.email : ''}</p>
              </div>
            </div>
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.8)' }} />
          <Link to='/view_profile' className='text-decoration-none text-dark'>
            <MenuItem onClick={handleClose}><FaUser className='me-3' /> My Profile</MenuItem>
          </Link>
          <MenuItem onClick={() => { handleClose(); setModalShow(true); }}><FaPowerOff className='me-3' />Logout</MenuItem>
        </Menu>
        {/* </div> */}
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
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </AppBar>
  );
};

export default Header;