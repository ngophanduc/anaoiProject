import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import hatBackground from '../assets/hanhtrinh/hatbackground.png';
import hatBackground2 from '../assets/hanhtrinh/hatbackground2.png';
import hat1 from '../assets/hanhtrinh/hat1.png';
import hat2 from '../assets/hanhtrinh/hat2.png';
import hat3 from '../assets/hanhtrinh/hat3.png';
import hat4 from '../assets/hanhtrinh/hat4.png';
import hat5 from '../assets/hanhtrinh/hat5.png';
import hat6 from '../assets/hanhtrinh/hat6.png';
import hat7 from '../assets/hanhtrinh/hat7.png';

function HatAnimationSection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = đầu section, 1 = cuối section

  // Track scroll progress trong section (200vh)
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const vh = window.innerHeight;
      const sectionHeight = 200 * vh; // 200vh

      // Tính scroll progress: 0 (đầu section) → 1 (cuối section)
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top;
      
      // Khi section vào viewport: sectionTop <= vh
      // Khi section ra khỏi viewport: sectionTop <= -sectionHeight + vh
      // Progress: 0 khi sectionTop = vh, 1 khi sectionTop = -sectionHeight + vh
      const scrolledPastTop = vh - sectionTop;
      const progress = Math.min(1, Math.max(0, scrolledPastTop / sectionHeight));

      setScrollProgress(progress);
    };

    handleScroll(); // sync lần đầu
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Tính translateY cho từng ảnh hat: rơi từ trên xuống
  // progress: 0 = ở trên, 1 = rơi xuống dưới
  // Mỗi ảnh có tốc độ và vị trí bắt đầu khác nhau để tạo hiệu ứng đẹp
  const getHatTransform = (index, progress) => {
    // Vị trí bắt đầu: mỗi ảnh bắt đầu ở trên viewport (từ -100vh đến -200vh)
    const startY = -100 - (index * 15); // hat1: -100vh, hat2: -115vh, ...
    
    // Vị trí kết thúc: rơi xuống dưới (từ 100vh đến 200vh)
    const endY = 100 + (index * 15);
    
    // Tính vị trí Y hiện tại
    const currentY = startY + (endY - startY) * progress;
    
    // Thêm rotation nhẹ để tạo hiệu ứng tự nhiên hơn
    const rotation = progress * (index % 2 === 0 ? 15 : -15);
    
    const transformValue = `translateY(${currentY}vh) rotate(${rotation}deg)`;
    
    return transformValue;
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '200vh',
        overflow: 'hidden',
      }}
    >
      {/* Background container */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        {/* Background layer 1 - Phần trên (0-100vh) */}
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
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        
        {/* Background layer 2 - Phần dưới (100vh-200vh) */}
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
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Các ảnh hat - zIndex từ 2 đến 8, animation rơi từ trên xuống */}
        {[hat1, hat2, hat3, hat4, hat5, hat6, hat7].map((hat, index) => {
          const transformValue = getHatTransform(index, scrollProgress);
          return (
            <Box
              key={index}
              component="img"
              src={hat}
              alt={`Hạt ${index + 1}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: '100vh',
                objectFit: 'contain',
                objectPosition: 'center top',
                pointerEvents: 'none',
                zIndex: index + 2,
                transform: transformValue,
                willChange: 'transform',
                transition: 'none', // Không dùng transition để animation mượt theo scroll
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default HatAnimationSection;

