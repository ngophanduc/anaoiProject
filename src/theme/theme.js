import { createTheme } from '@mui/material/styles';

// Custom breakpoints cho multi-screen support
const customBreakpoints = {
  values: {
    xs: 0,      // Mobile: 0px - 599px
    sm: 600,    // Tablet nhỏ: 600px - 959px
    md: 960,    // Tablet/Desktop nhỏ: 960px - 1279px
    lg: 1280,   // Desktop lớn: 1280px - 1919px
    xl: 1920,   // Màn hình rất lớn: 1920px+
  },
};

// Tạo theme với breakpoints tùy chỉnh
const theme = createTheme({
  breakpoints: customBreakpoints,
  palette: {
    primary: {
      main: '#F7F3CD', // Light goldenrod yellow
    },
    secondary: {
      main: '#667B00', // Bronze yellow
    },
    warning: {
      main: '#EDB500', // American yellow
    },
  },
  typography: {
    fontFamily: "'VNM Sans Std', sans-serif",
  },
});

export default theme;

