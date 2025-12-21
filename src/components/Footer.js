import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, IconButton } from '@mui/material';
import { LocationOn, Phone, Email, Facebook, YouTube, MusicNote } from '@mui/icons-material';
import logo from '../assets/logo/LOGO-03.png';

const primaryColor = '#F7F3CD'; // Màu của header
const bronzeYellow = '#667B00'; // Màu chữ của header

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form ở đây
    console.log('Form submitted:', formData);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '400px',
        backgroundColor: primaryColor, // Sử dụng màu của header
        display: 'block',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          py: 4,
          pb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 4,
          }}
        >
          {/* Phần 1: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="AnaOi Logo"
              sx={{
                height: { xs: 60, sm: 70, md: 80, lg: 90 },
              }}
            />
          </Box>

          {/* Phần 2: Công ty TNHH AnaOi */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#EDB500',
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem', lg: '1.5rem', xl: '1.6rem' },
                mb: 1,
              }}
            >
              Công ty TNHH AnaOi
            </Typography>

            {/* Thông tin liên hệ */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOn sx={{ color: '#EDB500', fontSize: 20 }} />
                <Typography sx={{ fontWeight: 400, color: bronzeYellow, fontSize: '0.9rem' }}>
                  Thôn 6, xã Ia Le, tỉnh Gia Lai, Việt Nam
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone sx={{ color: '#EDB500', fontSize: 20 }} />
                <Typography sx={{ fontWeight: 400, color: bronzeYellow, fontSize: '0.9rem' }}>
                  0901949426
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ color: '#EDB500', fontSize: 20 }} />
                <Typography sx={{ fontWeight: 400, color: bronzeYellow, fontSize: '0.9rem' }}>
                  anaoi.tn@gmail.com
                </Typography>
              </Box>
            </Box>

            {/* Social media */}
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontWeight: 400, color: bronzeYellow, mb: 1, fontSize: '0.9rem' }}>
                Liên hệ qua Facebook, Youtube, Tiktok
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  component="a"
                  href="https://www.facebook.com/people/AnaOi-Vietnam/61577576992252/?mibextid=wwXIfr&rdid=CaducwBfUmsTPWIp&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17xmyoSniE%2F%3Fmibextid%3DwwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: 'rgba(102, 123, 0, 0.1)',
                    color: bronzeYellow,
                    '&:hover': { backgroundColor: 'rgba(102, 123, 0, 0.2)' },
                  }}
                  size="small"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.youtube.com/@anaoivietnam?si=qUIGxBVoW3GOslQV"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: 'rgba(102, 123, 0, 0.1)',
                    color: bronzeYellow,
                    '&:hover': { backgroundColor: 'rgba(102, 123, 0, 0.2)' },
                  }}
                  size="small"
                >
                  <YouTube />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.tiktok.com/@anaoi_vietnam?_r=1&_t=ZS-92PUIDj7gaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: 'rgba(102, 123, 0, 0.1)',
                    color: bronzeYellow,
                    '&:hover': { backgroundColor: 'rgba(102, 123, 0, 0.2)' },
                  }}
                  size="small"
                >
                  <MusicNote />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Phần 3: Form - Cập nhật thông tin từ AnaOi */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: bronzeYellow,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem', lg: '1.4rem', xl: '1.5rem' },
                }}
              >
                Cập nhật thông tin từ AnaOi
              </Typography>

              {/* Họ và tên */}
              <TextField
                name="name"
                label="Họ và tên"
                required
                fullWidth
                value={formData.name}
                onChange={handleChange}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#EDB500',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#EDB500',
                    },
                  },
                  '& .MuiInputLabel-root': {
                  },
                }}
              />

              {/* Email và Số điện thoại */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  sx={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EDB500',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EDB500',
                      },
                    },
                    '& .MuiInputLabel-root': {
                    },
                  }}
                />
                <TextField
                  name="phone"
                  label="Số điện thoại"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  sx={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EDB500',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EDB500',
                      },
                    },
                    '& .MuiInputLabel-root': {
                    },
                  }}
                />
              </Box>

              {/* Lời nhắn gửi */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  alignItems: 'flex-start',
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <TextField
                  name="message"
                  label="Lời nhắn gửi"
                  multiline
                  rows={1}
                  value={formData.message}
                  onChange={handleChange}
                  sx={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f5f5f5',
                      borderRadius: 1,
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: '#EDB500',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#EDB500',
                      },
                    },
                    '& .MuiInputLabel-root': {
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#EDB500',
                    color: '#000',
                    fontWeight: 400,
                    px: 4,
                    py: 1.5,
                    minWidth: '100px',
                    height: 'fit-content',
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: '#d4a000',
                    },
                  }}
                >
                  Gửi
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;

