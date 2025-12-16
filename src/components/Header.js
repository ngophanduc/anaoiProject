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
          <Box
            component="img"
            src={logo}
            alt="AnaOi Logo"
            sx={{
              height: { xs: 40, sm: 44, md: 48, lg: 52 },
            }}
          />
        </Box>

        {/* Navigation - Center */}
        <Box 
          sx={{ 
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', sm: 'flex' }, // Ẩn navigation trên mobile
            justifyContent: 'center', 
            alignItems: 'center',
            gap: { sm: 0.5, md: 1, lg: 1.5 },
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
                fontSize: { sm: 14, md: 15, lg: 16, xl: 17 },
                mx: { sm: 0.5, md: 1, lg: 1.5 },
                px: { sm: 1, md: 1.5, lg: 2 },
                textDecoration: 'none',
                borderBottom: location.pathname === item.path ? '2px solid' : 'none',
                borderColor: bronzeYellow,
                borderRadius: 0,
                fontFamily: "'VNM Sans Std', sans-serif",
                whiteSpace: 'nowrap',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1, md: 1.5 } }}>
          <IconButton
            onClick={openCart}
            size="small"
            sx={{
              color: bronzeYellow,
              padding: { xs: 0.75, sm: 1 },
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
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 16, sm: 18, md: 20 },
                  height: { xs: 16, sm: 18, md: 20 },
                },
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: { xs: 24, sm: 26, md: 28, lg: 30 } }} />
            </Badge>
          </IconButton>
          <IconButton
            component={Link}
            to="/tai-khoan"
            size="small"
            sx={{
              color: bronzeYellow,
              padding: { xs: 0.75, sm: 1 },
              '&:hover': {
                backgroundColor: 'rgba(102, 123, 0, 0.1)',
              },
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: { xs: 24, sm: 26, md: 28, lg: 30 } }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
