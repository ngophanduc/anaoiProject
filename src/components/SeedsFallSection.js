import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import hatBackground from '../assets/hanhtrinh/hatbackground.png';
import hatBackground2 from '../assets/hanhtrinh/hatbackground2.png';
import hat1 from '../assets/hanhtrinh/hat1.png';
import hat2 from '../assets/hanhtrinh/hat2.png';
import hat3 from '../assets/hanhtrinh/hat3.png';
import hat4 from '../assets/hanhtrinh/hat4.png';
import hat5 from '../assets/hanhtrinh/hat5.png';
import hat6 from '../assets/hanhtrinh/hat6.png';
import hat7 from '../assets/hanhtrinh/hat7.png';

function SeedsFallSection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 (đầu section) → 1 (cuối section 200vh)

  // Track scroll progress trong section (0-200vh)
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionHeight = 200 * vh; // 200vh

      // Tính scroll progress: 0 (đầu section) → 1 (cuối section)
      // Khi section bắt đầu vào viewport (rect.top <= vh và rect.bottom >= 0)
      // Tính khoảng cách đã scroll trong section
      const windowScroll = window.scrollY;
      const sectionOffsetTop = el.offsetTop;
      const scrolled = Math.max(0, windowScroll - sectionOffsetTop);
      const progress = Math.min(1, scrolled / sectionHeight);

      setScrollProgress(progress);
    };

    handleScroll(); // sync lần đầu
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '200vh', // kéo dài section
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        perspective: 1200, // thêm perspective để tạo độ sâu
        perspectiveOrigin: 'center center',
      }}
    >
      {/* Background layer 1 - Lấp đầy phần trên (0-100vh) */}
      <Box
        component="img"
        src={hatBackground}
        alt="Hạt background"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      
      {/* Background layer 2 - Lấp đầy phần dưới (100vh-200vh) */}
      <Box
        component="img"
        src={hatBackground2}
        alt="Hạt background 2"
        sx={{
          position: 'absolute',
          top: '100vh',
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Container với transform 3D */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* BACKGROUND trong sticky container - Full 16:9 với chiều sâu */}
        <Box
          component="img"
          src={hatBackground}
          alt="Hạt background"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            zIndex: 0,
            pointerEvents: 'none',
            transform: 'translateZ(-200px) scale(1.3)', // đẩy nền sâu vào trong
          }}
        />

        {/* Các lớp hạt PNG – rơi từ trên xuống với chiều sâu khác nhau */}
        <Box
          component="img"
          src={hat1}
          alt="Hạt 1"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 1,
            transform: 'translateZ(-60px)',
            transformOrigin: '50% 0%',
            marginTop: 0,
          }}
        />
        <Box
          component="img"
          src={hat2}
          alt="Hạt 2"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 2,
            transform: 'translateZ(-40px)',
            transformOrigin: '40% 0%',
            marginTop: 0,
          }}
        />
        <Box
          component="img"
          src={hat3}
          alt="Hạt 3"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 2,
            transform: 'translateZ(-20px)',
            transformOrigin: '60% 0%',
            marginTop: 0,
          }}
        />
        <Box
          component="img"
          src={hat4}
          alt="Hạt 4"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 3,
            transform: 'translateZ(0px)',
            transformOrigin: '30% 50%',
            marginTop: 0,
          }}
        />
        <Box
          component="img"
          src={hat5}
          alt="Hạt 5"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 3,
            transform: 'translateZ(20px)',
            transformOrigin: '50% 50%',
            marginTop: 0,
          }}
        />
        <Box
          component="img"
          src={hat6}
          alt="Hạt 6"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 4,
            transform: 'translateZ(40px)',
            transformOrigin: '70% 40%',
            marginTop: 0,
          }}
        />
        <Box
          component="img"
          src={hat7}
          alt="Hạt 7"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 4,
            transform: 'translateZ(60px)',
            transformOrigin: '50% 100%',
            marginTop: 0,
          }}
        />

        {/* Text Content - Center màn hình */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 999, // zIndex cao nhất để text luôn hiện trên các hạt
            textAlign: 'center',
            pointerEvents: 'none',
            width: '100%',
            maxWidth: '90%',
          }}
        >
          {/* Dòng 1: Hiện khi scroll đến 50vh (scrollProgress >= 0.25) */}
          <Typography
            sx={{
              fontFamily: "'VNM Sans Display', sans-serif",
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              color: '#FFF7E6',
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.7)',
              lineHeight: 1.3,
              mb: 2,
              opacity: scrollProgress >= 0.25 ? 1 : 0,
              transform: scrollProgress >= 0.25 
                ? 'translateY(0) scale(1)' 
                : 'translateY(20px) scale(0.95)',
              filter: scrollProgress >= 0.25 ? 'blur(0px)' : 'blur(4px)',
              transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Khi vừa độ, các sản phẩm được chính tay của bà con thu hái tỉ mỉ.
          </Typography>

          {/* Dòng 2: Hiện khi scroll đến 100vh (scrollProgress >= 0.5) */}
          <Typography
            sx={{
              fontFamily: "'VNM Sans Display', sans-serif",
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              color: '#FFF7E6',
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.7)',
              lineHeight: 1.3,
              opacity: scrollProgress >= 0.5 ? 1 : 0,
              transform: scrollProgress >= 0.5 
                ? 'translateY(0) scale(1)' 
                : 'translateY(20px) scale(0.95)',
              filter: scrollProgress >= 0.5 ? 'blur(0px)' : 'blur(4px)',
              transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Hạnh phúc từ những điều nguyên bản và tinh túy nhất.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SeedsFallSection;


