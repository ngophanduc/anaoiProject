import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import background from '../assets/hanhtrinh/background.png';
import human from '../assets/hanhtrinh/human.png';
import map from '../assets/hanhtrinh/map.png';
import routerImg from '../assets/hanhtrinh/1.png';
import router2Img from '../assets/hanhtrinh/2.png';
import router3Img from '../assets/hanhtrinh/3.png';
import hatBackground from '../assets/hanhtrinh/hatbackground.png';

const HEADER_HEIGHT = 64;

function NutritionJourneyPage() {
  // Header visibility state
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Human animation progress: 0 (start position) → 1 (moved all the way to the right)
  const [humanProgress, setHumanProgress] = useState(0);

  // When human reaches the end (progress = 1), unlock page scrolling
  const [animationDone, setAnimationDone] = useState(false);

  // Virtual scroll depth cho hat background section
  const hatBgSectionRef = useRef(null);
  const [hatBgScrollProgress, setHatBgScrollProgress] = useState(0);

  // Track scroll progress của section dựa trên window scroll với chiều sâu 200vh
  useEffect(() => {
    const handleScroll = () => {
      const el = hatBgSectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = windowHeight * 2; // 200vh để tạo chiều sâu
      
      // Tính progress: 0 khi section bắt đầu vào viewport, 1 khi scroll qua 200vh
      const sectionTop = rect.top;
      const scrolledPastTop = windowHeight - sectionTop;
      const progress = Math.min(1, Math.max(0, scrolledPastTop / sectionHeight));
      
      setHatBgScrollProgress(progress);
    };

    handleScroll(); // Sync lần đầu
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  // ==============================
  //  WHEEL HANDLER: Scroll locking & human animation
  // ==============================
  useEffect(() => {
    const handleWheel = (e) => {
      // During hero animation phase: lock scroll and animate human
      if (!animationDone) {
        // Prevent actual page scrolling
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'auto' });

        // Hide header immediately when user scrolls down (even during animation)
        if (e.deltaY > 0) {
          setHeaderHidden(true);
        } else if (e.deltaY < 0) {
          // Show header when scrolling up
          setHeaderHidden(false);
        }

        // Slower movement speed - user needs to scroll more to complete animation
        const speed = 0.0004; // Reduced for slower, smoother movement
        const delta = e.deltaY;

        setHumanProgress((prev) => {
          // Allow humanProgress to increase (scroll down) or decrease (scroll up)
          let next = prev + delta * speed;

          // Clamp between 0 and 1
          if (next > 1) next = 1;
          if (next < 0) next = 0;

          // When human reaches the end (progress >= 1), unlock scrolling
          // Once unlocked, it stays unlocked even if human moves back
          if (next >= 1 && !animationDone) {
            setAnimationDone(true);
          }

          return next;
        });

        return;
      }

      // After animationDone = true: allow normal browser scrolling
      // Header visibility will be handled by scroll handler below
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [animationDone]);

  // ==============================
  //  KEYBOARD HANDLER: Space key for animation
  // ==============================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle Space key during animation phase
      if (e.code === 'Space' && !animationDone) {
        e.preventDefault(); // Prevent default page scroll behavior
        window.scrollTo({ top: 0, behavior: 'auto' });

        // Hide header when pressing Space (moving forward)
        setHeaderHidden(true);

        // Slower movement speed - same as wheel
        const speed = 0.0004;
        const delta = 100; // Equivalent to scrolling down

        setHumanProgress((prev) => {
          // Allow humanProgress to increase (Space = move forward)
          let next = prev + delta * speed;

          // Clamp between 0 and 1
          if (next > 1) next = 1;
          if (next < 0) next = 0;

          // When human reaches the end (progress >= 1), unlock scrolling
          if (next >= 1 && !animationDone) {
            setAnimationDone(true);
          }

          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [animationDone]);

  // ==============================
  //  SCROLL HANDLER: Header visibility after animation
  // ==============================
  useEffect(() => {
    const handleScroll = () => {
      // During animation phase, keep scroll locked at top
      if (!animationDone) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      // Nếu đang lock scroll cho map, giữ scroll position
      // After animation is done: handle header visibility based on scroll direction
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setHeaderHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationDone, lastScrollY]);


  // Calculate human translateX: moves from 0% to 120% (off screen to the right)
  const humanTranslateX = humanProgress * 120;



  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: '#020617',
      }}
    >
      <Header hidden={headerHidden} />

      {/* HERO SECTION - Full viewport height, header overlays on top */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {/* BACKGROUND */}
        <Box
          component="img"
          src={background}
          alt="Background"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'bottom center',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* HUMAN */}
        <Box
          component="img"
          src={human}
          alt="Human"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '90%',
            objectFit: 'cover',
            objectPosition: 'bottom center',
            zIndex: 1,
            pointerEvents: 'none',
            transform: `translateX(${humanTranslateX}%)`,
            transition: 'transform 0.06s ease-out',
          }}
        />

        {/* TEXT CONTENT - Center of hero section */}
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(50% - 250px)',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            textAlign: 'center',
            pointerEvents: 'none',
            width: '100%',
            maxWidth: '90%',
          }}
        >
          {/* Dòng 1: Biến mất khi humanProgress >= 0.3 */}
          <Typography
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'VNM Sans Display', sans-serif",
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: '#FFF7E6',
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.7), 0 12px 24px rgba(0,0,0,0.6)',
              lineHeight: 1.3,
              whiteSpace: 'nowrap',
              WebkitTextStroke: '0.5px rgba(255,255,255,0.3)',
              textStroke: '0.5px rgba(255,255,255,0.3)',
              opacity: humanProgress >= 0.3 ? 0 : 1,
              transform: humanProgress >= 0.3 
                ? 'translateX(-50%) translateY(-10px) scale(0.95)' 
                : 'translateX(-50%) translateY(0) scale(1)',
              filter: humanProgress >= 0.3 ? 'blur(4px)' : 'blur(0px)',
              transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), filter 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Khởi nguồn từ cao nguyên
          </Typography>

          {/* Dòng 2: Xuất hiện ở cùng vị trí với dòng 1 khi humanProgress >= 0.3 */}
          <Typography
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'VNM Sans Display', sans-serif",
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: '#FFF7E6',
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.7), 0 12px 24px rgba(0,0,0,0.6)',
              lineHeight: 1.3,
              whiteSpace: 'nowrap',
              WebkitTextStroke: '0.5px rgba(255,255,255,0.3)',
              textStroke: '0.5px rgba(255,255,255,0.3)',
              opacity: humanProgress >= 0.3 ? 1 : 0,
              transform: humanProgress >= 0.3 
                ? 'translateX(-50%) translateY(0) scale(1)' 
                : 'translateX(-50%) translateY(15px) scale(0.95)',
              filter: humanProgress >= 0.3 ? 'blur(0px)' : 'blur(4px)',
              transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), filter 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            nơi đất đỏ ươm mầm dinh dưỡng
          </Typography>
        </Box>
      </Box>

      {/* CONTENT - MAP SECTION */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#FFF9E0',
          color: '#667B00',
          padding: { xs: '48px 16px', md: '64px 32px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Text */}
        <Typography
          sx={{
            fontFamily: "'VNM Sans Display', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
            color: '#667B00',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}
        >
          Bắt đầu từ một vùng nguyên liệu hạnh phúc.
        </Typography>

        {/* Map Image */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            height: 'auto',
            minHeight: '500px', // Đảm bảo có chiều cao tối thiểu để zoom
            perspective: '1000px', // Thêm perspective để tạo hiệu ứng 3D
            perspectiveOrigin: 'center center',
          }}
        >
          <Box
            component="img"
            src={map}
            alt="Map"
            sx={{
              width: '100%',
              height: 'auto',
              minHeight: '500px',
              objectFit: 'contain',
              objectPosition: 'center bottom',
              display: 'block',
            }}
          />
          <Box
            component="img"
            src={routerImg}
            alt="Lộ trình"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 'calc(24% + 8px)', // kích thước lộ trình 1
              marginBottom: '329px',
              marginLeft: '497px',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          <Box
            component="img"
            src={router2Img}
            alt="Lộ trình 2"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 'calc(24% + 8px)', // kích thước lộ trình 2
              marginBottom: '163px',
              marginLeft: '432px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <Box
            component="img"
            src={router3Img}
            alt="Lộ trình 3"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 'calc(24% + 8px)', // kích thước lộ trình 3
              marginBottom: '104px',
              marginLeft: '571px',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
        </Box>
      </Box>

      {/* MAP DETAIL TEXT */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#FFF9E0',
          color: '#111827',
          px: { xs: 3, md: 6 },
          pb: { xs: 4, md: 6 },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '960px',
          }}
        >
          <Typography
            sx={{
              fontFamily: "'VNM Sans Display', sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              color: '#667B00',
              mb: 1.5,
            }}
          >
            Vùng trồng mè tại Quảng Trị
          </Typography>
          <Typography
            sx={{
              fontFamily: "'VNM Sans Std', sans-serif",
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
              color: '#667B00',
            }}
          >
            Diện tích canh tác: <strong>12 ha</strong>
            <br />
            Giống: <strong>Mè đen truyền thống vùng Trường Sơn</strong>
            <br />
            Đặc điểm: Trồng theo <strong>VietGAP</strong>, phơi - sàng - làm sạch hoàn toàn thủ công, 
            <br /> giữ nguyên
            độ thơm bùi đặc trưng.
          </Typography>
        </Box>
      </Box>

      {/* NEW SECTION - Hat Background with INTERNAL SCROLL DEPTH */}
      <Box
        ref={hatBgSectionRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh', // layout ngoài giữ nguyên 100vh
          overflow: 'hidden',
          backgroundColor: '#808080',
        }}
      >
        {/* BACKGROUND ELEMENTS - Thay đổi khi scroll */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '200vh',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {/* Circle 1 - Di chuyển từ trái sang phải */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              left: `${10 + hatBgScrollProgress * 60}%`,
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: `scale(${0.5 + hatBgScrollProgress * 0.5}) rotate(${hatBgScrollProgress * 360}deg)`,
              transition: 'all 0.1s linear',
            }}
          />
          
          {/* Circle 2 - Di chuyển từ phải sang trái */}
          <Box
            sx={{
              position: 'absolute',
              top: '60%',
              left: `${80 - hatBgScrollProgress * 60}%`,
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              transform: `scale(${1 - hatBgScrollProgress * 0.5}) rotate(${-hatBgScrollProgress * 180}deg)`,
              transition: 'all 0.1s linear',
            }}
          />
          
          {/* Square - Di chuyển từ trên xuống */}
          <Box
            sx={{
              position: 'absolute',
              top: `${5 + hatBgScrollProgress * 40}%`,
              left: '50%',
              width: 100,
              height: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transform: `translateX(-50%) rotate(${hatBgScrollProgress * 90}deg)`,
              transition: 'all 0.1s linear',
            }}
          />
          
          {/* Circle 3 - Phía dưới, di chuyển và thay đổi opacity */}
          <Box
            sx={{
              position: 'absolute',
              top: '80%',
              left: '30%',
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: `rgba(255, 255, 255, ${0.1 + hatBgScrollProgress * 0.2})`,
              transform: `translate(${hatBgScrollProgress * 200}px, ${-hatBgScrollProgress * 100}px) scale(${0.8 + hatBgScrollProgress * 0.4})`,
              transition: 'all 0.1s linear',
            }}
          />
          
          {/* Text Element */}
          <Typography
            sx={{
              position: 'absolute',
              top: '40%',
              left: '20%',
              fontFamily: "'VNM Sans Std', sans-serif",
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: `rgba(255, 255, 255, ${0.3 + hatBgScrollProgress * 0.5})`,
              transform: `translateY(${-hatBgScrollProgress * 200}px) scale(${1 + hatBgScrollProgress * 0.3})`,
              transition: 'all 0.1s linear',
              whiteSpace: 'nowrap',
            }}
          >
            Hành trình dinh dưỡng
          </Typography>
          
          {/* Small circles - Rải rác */}
          {[0, 1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: `${15 + i * 20}%`,
                left: `${10 + i * 15}%`,
                width: 40 + i * 10,
                height: 40 + i * 10,
                borderRadius: '50%',
                backgroundColor: `rgba(255, 255, 255, ${0.05 + hatBgScrollProgress * 0.15})`,
                transform: `translate(${hatBgScrollProgress * (i % 2 === 0 ? 50 : -50)}px, ${hatBgScrollProgress * (i * 30)}px) rotate(${hatBgScrollProgress * (i * 45)}deg)`,
                transition: 'all 0.1s linear',
              }}
            />
          ))}
        </Box>

        {/* 3D EFFECT CONTAINER - Tạo chiều sâu với window scroll */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {/* STAGE 16:9 với hiệu ứng 3D mạnh hơn */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              maxHeight: '100vh',
              overflow: 'visible',
              backgroundColor: 'transparent',
              transform: `
                translateZ(${-hatBgScrollProgress * 600}px)
                scale(${1 + hatBgScrollProgress * 0.5})
                rotateX(${hatBgScrollProgress * 10}deg)
              `,
              transition: 'transform 0.05s linear',
              willChange: 'transform',
            }}
          >
            {/* Thêm các layer để tạo chiều sâu */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                transform: `translateZ(${hatBgScrollProgress * 100}px)`,
                transition: 'transform 0.05s linear',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 2,
                transform: `translateZ(${hatBgScrollProgress * 200}px)`,
                transition: 'transform 0.05s linear',
              }}
            />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default NutritionJourneyPage;
