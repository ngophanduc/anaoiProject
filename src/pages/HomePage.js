import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

function HomePage() {
  const contentRef = useRef(null);
  const [contentActive, setContentActive] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setContentActive(true);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '-80px 0px -80px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <Header />
      <Box 
        sx={{ 
          width: '100%', 
          height: '100vh', 
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <HeroSection />
      </Box>
      {/* PHẦN CONTENT: HÀNH TRÌNH + VIDEO */}
      <Box 
        sx={{ 
          width: '100%',
          minHeight: '500px',
          flexShrink: 0,
          position: 'relative',
          zIndex: 5,
          background: 'linear-gradient(180deg, #F7F3CD 0%, #FFF9E6 60%, #FDF4C8 100%)',
          display: 'flex',
          justifyContent: 'center',
          pb: { xs: 6, md: 8 },
        }}
        ref={contentRef}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 4, md: 6 },
            px: { xs: 3, md: 4 },
            alignItems: 'center',
          }}
        >
          {/* Text ở trên */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#374151',
              maxWidth: 700,
              textAlign: 'center',
              transform: contentActive ? 'scale(1)' : 'scale(1.08)',
              transformOrigin: 'center',
              opacity: contentActive ? 1 : 0.85,
              transition: 'transform 0.9s ease-out, opacity 0.9s ease-out',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mt: 1,
                fontWeight: 800,
                fontSize: { xs: '1.6rem', md: '2.1rem' },
                lineHeight: 1.3,
                color: '#B45309',
                fontFamily: "'Dancing Script', cursive",
                whiteSpace: 'nowrap',
              }}
            >
              HÀNH TRÌNH NUÔI DƯỠNG HẠNH PHÚC
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 3,
                fontSize: { xs: '0.98rem', md: '1.05rem' },
                lineHeight: 1.8,
                color: '#4B5563',
              }}
            >
              Tâm huyết của AnaOi là mang đến "sản phẩm chất lượng" từ chính vùng đất Tây Nguyên trù phú. Chúng tôi chắt chiu từng hạt, tuyển chọn mỗi trái bơ đảm bảo tất cả đều được vun trồng theo tiêu chuẩn nghiêm ngặt, minh bạch nguồn gốc. AnaOi tự hào kiểm soát trọn vẹn hành trình "từ nông trại đến bàn ăn", để mỗi sản phẩm trao tay bạn đều là niềm tự hào thuần khiết của nông sản Việt.
            </Typography>
          </Box>

          {/* Video bên dưới */}
          <Box
            sx={{
              position: 'relative',
              width: contentActive ? '100%' : { xs: 180, md: 220 },
              maxWidth: contentActive ? '100%' : 'none',
              borderRadius: contentActive ? { xs: 0, md: 16 } : '999px',
              overflow: 'hidden',
              boxShadow: contentActive
                ? '0 30px 80px rgba(0,0,0,0.75)'
                : '0 18px 45px rgba(0,0,0,0.65)',
              backgroundColor: '#FFF7E0',
              transition:
                'width 2s cubic-bezier(0.19,1,0.22,1), border-radius 2s cubic-bezier(0.19,1,0.22,1), box-shadow 2s ease-out, transform 2s ease-out',
              transform: contentActive ? 'translateY(0)' : 'translateY(30px)',
              alignSelf: 'stretch',
              '&::before': contentActive
                ? {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: { xs: 0, md: 16 },
                    border: '1px solid rgba(217,119,6,0.35)',
                    pointerEvents: 'none',
                  }
                : {},
            }}
          >
            <Box
              sx={{
                position: 'relative',
                paddingTop: contentActive ? '56.25%' : '100%', // 16:9 khi active, trước đó là hình tròn
                transition: 'padding-top 2s cubic-bezier(0.19,1,0.22,1)',
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/eHRkvB2_iRY?start=2"
                title="Hành trình nuôi dưỡng hạnh phúc - AnaOi"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box 
        sx={{ 
          flexShrink: 0, 
          position: 'relative', 
          zIndex: 10,
          width: '100%',
          display: 'block',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default HomePage;
