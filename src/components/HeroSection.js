import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SplitText from './SplitText';

import sky from '../assets/homepage/herobrg/sky.png';
import nui from '../assets/homepage/herobrg/nui.png';
import human1 from '../assets/homepage/herobrg/human1.png';
import human2 from '../assets/homepage/herobrg/human2.png';
import footerLayer from '../assets/homepage/herobrg/footer.png';

const HEADER_HEIGHT = 64;

function HeroSection() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundImage: `url(${sky})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* LAYER 2: NÚI – slide từ dưới lên */}
        <Box
          component="img"
          src={nui}
          alt="Mountain layer"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 2,
            pointerEvents: 'none',
            animation: 'mountainSlideUp 1.2s ease-out forwards',
          }}
        />

        {/* LAYER 3: HUMAN 1 – KHÔNG ANIMATION */}
        <Box
          component="img"
          src={human1}
          alt="Human 1"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />

        {/* LAYER 4: HUMAN 2 – KHÔNG ANIMATION */}
        <Box
          component="img"
          src={human2}
          alt="Human 2"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* LAYER 5: FOOTER – footer animation */}
        <Box
          component="img"
          src={footerLayer}
          alt="Footer decorative layer"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'bottom center',
            zIndex: 5,
            pointerEvents: 'none',
            animation: 'footerSlideDown 1.4s ease-out forwards',
          }}
        />

        {/* TEXT CONTENT */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 6,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', md: 'flex-start' },
            justifyContent: 'center',
            pt: `${HEADER_HEIGHT}px`,
            px: { xs: 3, md: 10 },
            maxWidth: { xs: '100%', md: '60%' },
            color: '#FDFBF5',
          }}
        >
          {/* TITLE */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'VNM Sans Display', sans-serif",
              fontWeight: 700,
              color: '#FFF7E6',
              textShadow: '0 4px 14px rgba(0,0,0,0.55)',
              lineHeight: 1.1,
              mb: 2,
              fontSize: { xs: '2.4rem', sm: '3rem', md: '3.6rem' },
              letterSpacing: '0.02em', // giảm cho chữ thẳng hàng, không bị kéo quá
              width: '100%',
              display: 'inline-block',
            }}
          >
            <SplitText
              text="Hạt nhỏ tới giọt, giọt lành tới bạn"
              delay={50}
              duration={0.6}
              ease="ease-out"
              splitType="words" // animate theo từ, giữ bố cục đẹp
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </Typography>

          {/* SUBTITLE */}
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              fontSize: { xs: '1.35rem', sm: '1.45rem', md: '1.55rem' },
              lineHeight: 1.7,
              color: '#FFF4D9',
              textShadow: '0 3px 10px rgba(0,0,0,0.65)',
              maxWidth: 520,
              fontFamily: "'VNM Sans Std', sans-serif",
              fontWeight: 400,
            }}
          >
            <SplitText
              text="Dưới nắng gió Tây Nguyên, mỗi hạt mầm được nuôi lớn bằng đất lành và tâm huyết người trồng. AnaOi chọn bước đầu tiên: giữ nguyên bản, ép lạnh để dưỡng chất được giữ trọn."
              delay={20}
              duration={0.5}
              ease="ease-out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1} 
              rootMargin="-100px"
              textAlign="left"
            />
          </Typography>
        </Box>
      </Box>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes mountainSlideUp {
            from {
              transform: translateY(120px);
            }
            to {
              transform: translateY(0);
            }
          }

          @keyframes footerSlideDown {
            from {
              transform: scale(1.15);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}

export default HeroSection;
