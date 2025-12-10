import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import usp1 from '../assets/homepage/usp/1.png';
import usp2 from '../assets/homepage/usp/2.png';
import usp3 from '../assets/homepage/usp/3.png';

function HomePage() {
  const contentRef = useRef(null);
  const [contentActive, setContentActive] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const uspImages = [usp1, usp2, usp3];
  const uspTexts = [
    'Chuẩn nguyên liệu bản địa, với tiêu chuẩn canh tác khắt khe.',
    'Chuẩn minh bạch nguồn gốc, với cam kết truy xuất nguồn gốc.',
    'Chuẩn tiên phong dầu ép lạnh, với dầu hỗn hợp dinh dưỡng cao.',
  ];

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

  // Auto-slide carousel cho ảnh USP (tự động đổi khi không tương tác)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % uspImages.length);
    }, 5000); // đổi ảnh mỗi 5 giây

    return () => clearInterval(interval);
  }, [uspImages.length]);

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & passed threshold -> hide header
        setHeaderHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show header
        setHeaderHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + uspImages.length) % uspImages.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % uspImages.length);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: '#020617', // màu nền chính của trang
      }}
    >
      <Header hidden={headerHidden} />
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
          pt: { xs: 4, md: 6 },   // khoảng cách nhưng vẫn cùng màu với content
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
                fontWeight: 700,
                fontSize: { xs: '1.6rem', md: '2.1rem' },
                lineHeight: 1.3,
                color: '#B45309',
                fontFamily: "'VNM Sans Display', sans-serif",
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
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 400,
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

      {/* SPACER: Khoảng cách giữa content và USP với màu nền */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: '128px', md: '224px' }, // 16 * 8px = 128px, 28 * 8px = 224px
          background: 'linear-gradient(180deg, #FDF4C8 0%, #F7F3CD 50%, #FFF9E6 100%)',
          flexShrink: 0,
        }}
      />

      {/* PHẦN USP: CAROUSEL 3D ẢNH */}
      <Box
        sx={{
          width: '100%',
          minHeight: '600px',
          flexShrink: 0,
          position: 'relative',
          zIndex: 6,
          background: 'linear-gradient(180deg, #FDF4C8 0%, #F7F3CD 50%, #FFF9E6 100%)',
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '1400px',
            minHeight: { xs: '300px', md: '400px' },
            perspective: '1200px',
            perspectiveOrigin: 'center center',
          }}
        >
          {/* Container cho 3 ảnh + text */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {uspImages.map((img, index) => {
              // Tính offset với wrap-around
              let offset = index - currentImageIndex;
              if (offset > 1) offset -= uspImages.length;
              if (offset < -1) offset += uspImages.length;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isHidden = Math.abs(offset) > 1;

              return (
                <Box
                  key={index}
                  onClick={isLeft ? handleNext : isRight ? handlePrev : undefined}
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: isCenter ? { xs: '50%', md: '40%' } : { xs: '35%', md: '28%' },
                    cursor: isCenter ? 'default' : isHidden ? 'default' : 'pointer',
                    opacity: isHidden ? 0 : isCenter ? 1 : 0.6,
                    zIndex: isCenter ? 5 : isLeft ? 1 : isRight ? 2 : 0,
                    transform: isCenter
                      ? 'translateX(0) scale(1.05)'
                      : isLeft
                      ? 'translateX(-100%) scale(0.75)'
                      : isRight
                      ? 'translateX(100%) scale(0.75)'
                      : 'translateX(0) scale(0)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isHidden ? 'none' : 'auto',
                    '&:hover': {
                      opacity: isCenter ? 1 : isHidden ? 0 : 0.75,
                    },
                  }}
                >
                  {/* Ảnh */}
                  <Box
                    component="img"
                    src={img}
                    alt={`USP ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      borderRadius: 3,
                      boxShadow: isCenter
                        ? '0 40px 100px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)'
                        : '0 15px 40px rgba(0,0,0,0.25)',
                      mb: 1.5,
                      filter: isCenter ? 'none' : 'brightness(0.85)',
                    }}
                  />
                  {/* Text bên dưới */}
                  <Box
                    sx={{
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '0.85rem', md: '1rem' },
                        lineHeight: 1.6,
                        fontWeight: 400,
                        color: '#4B5563',
                        fontFamily: "'VNM Sans Std', sans-serif",
                      }}
                    >
                      {uspTexts[index]}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Nút điều hướng */}
          <Box
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: { xs: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              width: { xs: 48, md: 64 },
              height: { xs: 48, md: 64 },
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 10,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,1)',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '&::before': {
                content: '"←"',
                fontSize: { xs: '24px', md: '32px' },
                color: '#B45309',
                fontWeight: 'bold',
              },
            }}
          />
          <Box
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: { xs: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              width: { xs: 48, md: 64 },
              height: { xs: 48, md: 64 },
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 10,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,1)',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '&::before': {
                content: '"→"',
                fontSize: { xs: '24px', md: '32px' },
                color: '#B45309',
                fontWeight: 'bold',
              },
            }}
          />
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
