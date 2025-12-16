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
import hatBackground2 from '../assets/hanhtrinh/hatbackground2.png';
import hat1 from '../assets/hanhtrinh/hat1.png';
import hat2 from '../assets/hanhtrinh/hat2.png';
import hat3 from '../assets/hanhtrinh/hat3.png';
import hat4 from '../assets/hanhtrinh/hat4.png';
import hat5 from '../assets/hanhtrinh/hat5.png';
import hat6 from '../assets/hanhtrinh/hat6.png';

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

  // Map section visibility (for entrance animations)
  const mapSectionRef = useRef(null);
  const [mapSectionVisible, setMapSectionVisible] = useState(false);

  // Hat section text visibility (for entrance animations)
  const hatTextRef = useRef(null);
  const [hatTextVisible, setHatTextVisible] = useState(false);

  // Next section text visibility (for entrance animations)
  const nextSectionTextRef = useRef(null);
  const [nextSectionTextVisible, setNextSectionTextVisible] = useState(false);

  // Track scroll progress của hat section dựa trên window scroll (0 → 1 từ đầu đến hết section)
  useEffect(() => {
    const handleScroll = () => {
      const el = hatBgSectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Tính progress rơi hạt:
      //  - 0 khi section đã vào viewport một đoạn (~30% chiều cao màn hình)
      //  - 1 khi vừa đi hết section (bottom chạm đỉnh viewport)
      const totalScrollDistance = windowHeight + sectionHeight; // từ top=windowHeight đến top=-sectionHeight
      const scrolled = windowHeight - rect.top; // 0 → totalScrollDistance

      const startOffset = windowHeight * 0.3; // delay ~30% viewport, tránh rơi quá sớm
      const effectiveDistance = totalScrollDistance - startOffset;

      let progress = (scrolled - startOffset) / effectiveDistance;
      progress = Math.min(1, Math.max(0, progress));
      
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
  //  MAP SECTION VISIBILITY (IntersectionObserver)
  // ==============================
  useEffect(() => {
    const el = mapSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapSectionVisible(true);
            observer.disconnect(); // chỉ animate lần đầu
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ==============================
  //  HAT SECTION TEXT VISIBILITY (IntersectionObserver)
  // ==============================
  useEffect(() => {
    const el = hatTextRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHatTextVisible(true);
            observer.disconnect(); // chỉ animate lần đầu
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ==============================
  //  NEXT SECTION TEXT VISIBILITY (IntersectionObserver)
  // ==============================
  useEffect(() => {
    const el = nextSectionTextRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNextSectionTextVisible(true);
            observer.disconnect(); // chỉ animate lần đầu
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
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

  // Helper: animation style for map section elements
  const getMapFadeStyle = (delay = 0) => ({
    opacity: mapSectionVisible ? 1 : 0,
    transform: mapSectionVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    transitionDelay: mapSectionVisible ? `${delay}s` : '0s',
  });

  // Helper: animation style for hat section text
  const getHatTextFadeStyle = (delay = 0) => ({
    opacity: hatTextVisible ? 1 : 0,
    transform: hatTextVisible ? 'translate(-50%, -50%)' : 'translate(-50%, calc(-50% + 24px))',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    transitionDelay: hatTextVisible ? `${delay}s` : '0s',
  });

  // Helper: animation style for next section text
  const getNextSectionTextFadeStyle = (delay = 0) => ({
    opacity: nextSectionTextVisible ? 1 : 0,
    transform: nextSectionTextVisible ? 'translate(-50%, -50%)' : 'translate(-50%, calc(-50% + 24px))',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    transitionDelay: nextSectionTextVisible ? `${delay}s` : '0s',
  });



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
        ref={mapSectionRef}
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
            ...getMapFadeStyle(0.05),
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
            ...getMapFadeStyle(0.1),
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
              ...getMapFadeStyle(0.1),
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
              ...getMapFadeStyle(0.18),
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
              ...getMapFadeStyle(0.22),
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
              ...getMapFadeStyle(0.26),
            }}
          />

          {/* MAP DETAIL TEXT OVERLAY - Vùng trồng mè */}
          <Box
            sx={{
              position: 'absolute',
              right: '11%',
              top: '11%',
              maxWidth: { xs: '70%', md: '360px' },
              textAlign: 'left',
              pointerEvents: 'none',
              ...getMapFadeStyle(0.2),
            }}
          >
            <Typography
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                color: '#667B00',
                textShadow: '0 2px 6px rgba(0,0,0,0.35)',
                mb: 1.5,
                whiteSpace: 'nowrap',
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
                textShadow: '0 2px 4px rgba(255,255,255,0.4)',
              }}
            >
              Diện tích canh tác: <strong>12 ha</strong>
            </Typography>
            <Typography
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                color: '#667B00',
                textShadow: '0 2px 4px rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              Giống: <strong>Mè đen truyền thống vùng Trường Sơn</strong>
            </Typography>
            <Typography
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                color: '#667B00',
                textShadow: '0 2px 4px rgba(255,255,255,0.4)',
              }}
            >
              Đặc điểm: Trồng theo <strong>VietGAP</strong>, phơi - sàng - làm sạch hoàn toàn thủ công, 
              <br /> giữ nguyên độ thơm bùi đặc trưng.
            </Typography>
          </Box>

          {/* MAP DETAIL TEXT OVERLAY - Các vùng trồng khác */}
          <Box
            sx={{
              position: 'absolute',
              left: '4%',
              bottom: { xs: '8%', md: '10%' },
              maxWidth: { xs: '75%', md: '420px' },
              textAlign: 'left',
              pointerEvents: 'none',
              ...getMapFadeStyle(0.25),
            }}
          >
            {/* Vùng trồng bơ */}
            <Typography
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                color: '#667B00',
                textShadow: '0 2px 6px rgba(0,0,0,0.35)',
                mb: 0.5,
              }}
            >
              Vùng trồng bơ tại Đắk Lắk
            </Typography>
            <Typography
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.5,
                color: '#667B00',
                textShadow: '0 2px 4px rgba(255,255,255,0.4)',
              }}
            >
              Diện tích: <strong>20 ha</strong> • Giống: <strong>Booth, Tứ Quý, 034</strong>
              <br />
              Đặc điểm: <strong>hữu cơ 100%</strong> (không phân hoá học, không thuốc BVTV)
            </Typography>

            <Box sx={{ mt: 2 }} />

            {/* Vùng trồng lúa */}
            <Typography
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                color: '#667B00',
                textShadow: '0 2px 6px rgba(0,0,0,0.35)',
                mb: 0.5,
              }}
            >
              Vùng trồng lúa tại xã Ea Súp, Đắk Lắk
            </Typography>
            <Typography
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.5,
                color: '#667B00',
                textShadow: '0 2px 4px rgba(255,255,255,0.4)',
              }}
            >
              Diện tích: <strong>25 ha</strong> • Giống: <strong>ST25</strong> (gạo thơm đạt giải “Gạo ngon nhất thế
              giới”)
              <br />
              Đặc điểm: canh tác <strong>100% hữu cơ</strong> theo chuẩn JAS Nhật Bản & Việt Nam, không thuốc trừ cỏ,
              quản lý nước và đất an toàn
            </Typography>

            <Box sx={{ mt: 2 }} />

            {/* Vùng trồng lạc */}
            <Typography
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                color: '#667B00',
                textShadow: '0 2px 6px rgba(0,0,0,0.35)',
                mb: 0.5,
              }}
            >
              Vùng trồng lạc tại xã Hoà Sơn, Đắk Lắk
            </Typography>
            <Typography
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.5,
                color: '#667B00',
                textShadow: '0 2px 4px rgba(255,255,255,0.4)',
              }}
            >
              Diện tích: <strong>10 ha</strong> • Giống: <strong>L14, L23</strong> (năng suất cao, thu hoạch ổn định)
              <br />
              Đặc điểm: trồng theo chuẩn <strong>VietGAP</strong>, dùng phân chuồng hoai mục, hạn chế tối đa hoá chất
            </Typography>
          </Box>

          {/* MAP DETAIL TEXT OVERLAY - Vùng trồng đậu nành (riêng biệt) */}
          <Box
            sx={{
              position: 'absolute',
              right: '-2%',
              bottom: '17%',
              maxWidth: { xs: '75%', md: '420px' },
              textAlign: 'left',
              pointerEvents: 'none',
              ...getMapFadeStyle(0.3),
            }}
          >
            {/* Vùng trồng đậu nành */}
            <Typography
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                color: '#667B00',
                textShadow: '0 2px 6px rgba(0,0,0,0.35)',
                mb: 0.5,
              }}
            >
              Vùng trồng đậu nành tại xã Nam Dong, Lâm Đồng
            </Typography>
            <Typography
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.5,
                color: '#667B00',
                textShadow: '0 2px 4px rgba(255,255,255,0.4)',
              }}
            >
              Diện tích: <strong>18 ha</strong> • Giống: <strong>đậu nành không biến đổi gen (Non-GMO)</strong>
              <br />
              Đặc điểm: sản xuất theo chuẩn <strong>VietGAP</strong>, luân canh cải tạo đất, tuyệt đối không dùng thuốc cỏ
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* NEW SECTION - Scrolling space (240vh) với các ảnh hạt */}
      <Box
        ref={hatBgSectionRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: '240vh',
          overflow: 'hidden',
          backgroundColor: '#020617',
        }}
      >
        {/* Background ghép từ hatBackground2 + hatBackground để phủ hết 240vh */}
        <Box
          component="img"
          src={hatBackground2}
          alt="Hat background top"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120vh',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <Box
          component="img"
          src={hatBackground}
          alt="Hat background bottom"
          sx={{
            position: 'absolute',
            top: '120vh',
            left: 0,
            width: '100%',
            height: '120vh',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Text chính giữa ở 120vh đầu tiên */}
        <Typography
          ref={hatTextRef}
          sx={{
            position: 'absolute',
            top: '50vh',
            left: '50%',
            fontFamily: "'VNM Sans Display', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.8rem', lg: '4.4rem' },
            color: '#D7E9A0', // xanh nhạt, giữ stroke xanh đậm bên ngoài
            textAlign: 'center',
            // Tạo viền 3D bằng nhiều lớp shadow + stroke nhẹ
            textShadow: `
              0 2px 0 rgba(15,23,42,0.8),
              0 4px 8px rgba(15,23,42,0.8),
              0 8px 24px rgba(0,0,0,0.7)
            `,
            WebkitTextStroke: '2px rgba(102, 123, 0, 0.95)',
            textStroke: '2px rgba(102, 123, 0, 0.95)',
            zIndex: 2,
            pointerEvents: 'none',
            px: { xs: 2, md: 4 },
            maxWidth: '90%',
            lineHeight: 1.3,
            ...getHatTextFadeStyle(0),
          }}
        >
          Khi vừa độ, các sản phẩm được chính tay của bà con thu hái tỉ mỉ
        </Typography>

        {/* Text chính giữa ở nửa dưới 120vh (170vh từ đầu section) */}
        <Typography
          ref={nextSectionTextRef}
          sx={{
            position: 'absolute',
            top: '170vh',
            left: '50%',
            fontFamily: "'VNM Sans Display', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.8rem', md: '3.8rem', lg: '4.4rem' },
            color: '#D7E9A0', // xanh nhạt, giữ stroke xanh đậm bên ngoài
            textAlign: 'center',
            // Tạo viền 3D bằng nhiều lớp shadow + stroke nhẹ
            textShadow: `
              0 2px 0 rgba(15,23,42,0.8),
              0 4px 8px rgba(15,23,42,0.8),
              0 8px 24px rgba(0,0,0,0.7)
            `,
            WebkitTextStroke: '2px rgba(102, 123, 0, 0.95)',
            textStroke: '2px rgba(102, 123, 0, 0.95)',
            zIndex: 2,
            pointerEvents: 'none',
            px: { xs: 2, md: 4 },
            maxWidth: '90%',
            lineHeight: 1.3,
            ...getNextSectionTextFadeStyle(0),
          }}
        >
          Hạnh phúc từ những điều nguyên bản và tinh túy nhất.
        </Typography>

        {[
          // Nhân đôi mỗi hạt: mỗi ảnh xuất hiện 2 lần với vị trí cách xa nhau để tránh trùng lặp
          { src: hat1, left: '8%', speed: 1.0 },
          { src: hat2, left: '15%', speed: 1.2 },
          { src: hat3, left: '24%', speed: 0.9 },
          { src: hat4, left: '32%', speed: 1.1 },
          { src: hat5, left: '40%', speed: 1.3 },
          { src: hat6, left: '48%', speed: 0.8 },
          { src: hat1, left: '56%', speed: 1.15 },
          { src: hat2, left: '64%', speed: 1.25 },
          { src: hat3, left: '72%', speed: 1.0 },
          { src: hat4, left: '80%', speed: 1.2 },
          { src: hat5, left: '12%', speed: 1.4 },
          { src: hat6, left: '20%', speed: 0.9 },
          { src: hat1, left: '68%', speed: 1.1 },
          { src: hat2, left: '76%', speed: 1.3 },
        ].map(({ src, left, speed }, idx) => (
          <Box
            key={idx}
            component="img"
            src={src}
            alt={`Hat ${idx + 1}`}
            sx={{
              position: 'absolute',
              top: '0%',
              left,
              width: { xs: 130, md: 190 },
              height: 'auto',
              pointerEvents: 'none',
              zIndex: 3,
              transform: `translateY(${hatBgScrollProgress * 3000 * speed}%)`,
              transition: 'transform 0.03s linear',
            }}
          />
        ))}
      </Box>

      <Footer />
    </Box>
  );
}

export default NutritionJourneyPage;
