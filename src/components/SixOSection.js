import React from 'react';
import { Box, Typography } from '@mui/material';

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

function SixOSection() {
  return (
    <Box
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
          <Box
            key={index}
            component="img"
            src={src}
            alt={`6O-${index + 1}`}
            sx={{
              position: 'absolute',
              inset: 0,
              margin: 'auto',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        ))}

        {/* Text overlay nằm trong khung ảnh */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: { xs: 8, sm: 12, md: 16 },
            px: { xs: 1, sm: 2, md: 3 },
            display: 'flex',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'VNM Sans Display', sans-serif",
              fontWeight: 700,
              color: '#667B00',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2.5rem', lg: '3rem', xl: '3.5rem' },
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.25)',
              lineHeight: 1.2,
              wordBreak: 'break-word',
              maxWidth: '100%',
            }}
          >
            6O An Toàn Dinh Dưỡng
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SixOSection;


