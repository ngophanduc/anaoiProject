import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import logo from '../assets/logo/LOGO-03.png'; // Đường dẫn đúng với tên file

const primaryColor = '#F7F3CD'; // Light goldenrod yellow
const bronzeYellow = '#667B00';
const americanYellow = '#EDB500';

const navItems = [
  'Sản phẩm',
  'Hành trình dinh dưỡng',
  'Luôn vui khỏe',
  'Giỏ hàng',
];

function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: primaryColor,
        boxShadow: 'none',
        color: bronzeYellow,
        zIndex: theme => theme.zIndex.appBar + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Box sx={{ position: 'absolute', left: 16, display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="AnaOi Logo" style={{ height: 48 }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {navItems.map((item, idx) => (
            <Button key={item} sx={{ color: bronzeYellow, fontWeight: 'bold', fontSize: 16, mx: 1 }}>
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
