import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo/LOGO-03.png'; // Đường dẫn đúng với tên file

const primaryColor = '#F7F3CD'; // Light goldenrod yellow
const bronzeYellow = '#667B00';
const americanYellow = '#EDB500';

const navItems = [
  { label: 'Sản phẩm', path: '/san-pham' },
  { label: 'Hành trình dinh dưỡng', path: '/hanh-trinh-dinh-duong' },
  { label: 'Luôn vui khỏe', path: '/luon-vui-khoe' },
];

function Header({ hidden = false }) {
  const location = useLocation();
  const { getTotalItems, openCart } = useCart();

  return (
    <AppBar
      position="fixed"
      sx={{
        background: primaryColor,
        boxShadow: 'none',
        color: bronzeYellow,
        zIndex: theme => theme.zIndex.appBar + 1,
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        {/* Logo - Left */}
        <Box 
          component={Link}
          to="/"
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <img src={logo} alt="AnaOi Logo" style={{ height: 48 }} />
        </Box>

        {/* Navigation - Center */}
        <Box 
          sx={{ 
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                color: bronzeYellow,
                fontWeight: 400,
                fontSize: 16,
                mx: 1,
                textDecoration: 'none',
                borderBottom: location.pathname === item.path ? '2px solid' : 'none',
                borderColor: bronzeYellow,
                borderRadius: 0,
                fontFamily: "'VNM Sans Std', sans-serif",
                '&:hover': {
                  backgroundColor: 'rgba(102, 123, 0, 0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Icons - Right */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={openCart}
            sx={{
              color: bronzeYellow,
              '&:hover': {
                backgroundColor: 'rgba(102, 123, 0, 0.1)',
              },
            }}
          >
            <Badge 
              badgeContent={getTotalItems()} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: americanYellow,
                  color: '#fff',
                  fontFamily: "'VNM Sans Std', sans-serif",
                  fontWeight: 600,
                },
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
            </Badge>
          </IconButton>
          <IconButton
            component={Link}
            to="/tai-khoan"
            sx={{
              color: bronzeYellow,
              '&:hover': {
                backgroundColor: 'rgba(102, 123, 0, 0.1)',
              },
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
