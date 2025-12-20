import React from 'react';
import { Box } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import img1 from '../assets/nguongoc/6o/1.png';
import img22 from '../assets/nguongoc/6o/22.png';
import img23 from '../assets/nguongoc/6o/23.png';
import img24 from '../assets/nguongoc/6o/24.png';
import img25 from '../assets/nguongoc/6o/25.png';
import img26 from '../assets/nguongoc/6o/26.png';
import img27 from '../assets/nguongoc/6o/27.png';
import img28 from '../assets/nguongoc/6o/28.png';
import img29 from '../assets/nguongoc/6o/29.png';
import img30 from '../assets/nguongoc/6o/30.png';
import img31 from '../assets/nguongoc/6o/31.png';
import img32 from '../assets/nguongoc/6o/32.png';
import img33 from '../assets/nguongoc/6o/33.png';

const images = [
  img1,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
];

// Component wrapper cho từng ảnh với animation
function AnimatedImage({ src, alt, index, delay = 0 }) {
  const { elementRef, animationStyles } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    delay: delay,
  });

  return (
    <Box
      ref={elementRef}
      component="img"
      src={src}
      alt={alt}
      sx={{
        position: 'absolute',
        inset: 0,
        margin: 'auto',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        ...animationStyles,
      }}
    />
  );
}

function SixOSection() {
  const { elementRef, animationStyles } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
    delay: 0,
  });

  return (
    <Box
      ref={elementRef}
      sx={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        px: { xs: 2, md: 4 },
        py: { xs: 8, md: 12 },
        backgroundColor: '#FDFCF5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...animationStyles,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 800,
          aspectRatio: '4 / 5',
        }}
      >
        {images.map((src, index) => (
          <AnimatedImage
            key={index}
            src={src}
            alt={`6O-${index + 1}`}
            index={index}
            delay={index * 50}
          />
        ))}

      </Box>
    </Box>
  );
}

export default SixOSection;


