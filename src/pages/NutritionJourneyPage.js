import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import background from '../assets/hanhtrinh/background.png';
import human from '../assets/hanhtrinh/human.png';
import map from '../assets/hanhtrinh/map.png';
import hatBackground from '../assets/hanhtrinh/hatbackground.png';
import hatBackground2 from '../assets/hanhtrinh/hatbackground2.png';
import nuocBackground from '../assets/hanhtrinh/nuocbackground.png';
import nuocBackground2 from '../assets/hanhtrinh/nuocbackground2.png';
import nuoc from '../assets/hanhtrinh/nuoc.png';
import hat1 from '../assets/hanhtrinh/hat1.png';
import hat2 from '../assets/hanhtrinh/hat2.png';
import hat3 from '../assets/hanhtrinh/hat3.png';
import hat4 from '../assets/hanhtrinh/hat4.png';
import hat5 from '../assets/hanhtrinh/hat5.png';
import hat6 from '../assets/hanhtrinh/hat6.png';
import chaidau1 from '../assets/hanhtrinh/26.png';
import chaidau2 from '../assets/hanhtrinh/27.png';
import chaidau3 from '../assets/hanhtrinh/28.png';
import use from '../assets/hanhtrinh/use.png';
import use2 from '../assets/hanhtrinh/use1.png';
import foot from '../assets/hanhtrinh/foot.png';

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

  // Virtual scroll depth cho nuoc section
  const nuocSectionRef = useRef(null);
  const [nuocScrollProgress, setNuocScrollProgress] = useState(0);

  // Virtual scroll depth cho foot section (zoom từ 50x về 1x)
  const footSectionRef = useRef(null);
  const [footScrollProgress, setFootScrollProgress] = useState(0);
  const footScrollLocked = useRef(false);

  // Map section visibility (for entrance animations)
  const mapSectionRef = useRef(null);
  const [mapSectionVisible, setMapSectionVisible] = useState(false);

  // Hat section text visibility (for entrance animations)
  const hatTextRef = useRef(null);
  const [hatTextVisible, setHatTextVisible] = useState(false);

  // Next section text visibility (for entrance animations)
  const nextSectionTextRef = useRef(null);
  const [nextSectionTextVisible, setNextSectionTextVisible] = useState(false);

  // Chaidau section visibility (for entrance animations)
  const chaidauSectionRef = useRef(null);
  const [chaidauSectionVisible, setChaidauSectionVisible] = useState(false);

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

  // Track scroll progress của nuoc section - dừng ở 50% của 120vh thứ 2 (180vh từ đầu = 75% của section)
  useEffect(() => {
    const handleScroll = () => {
      const el = nuocSectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height; // 240vh

      // Tính progress rơi nuoc.png:
      //  - 0 khi section đã vào viewport một đoạn (~30% chiều cao màn hình)
      //  - Dừng ở 75% (180vh / 240vh) = 50% của 120vh thứ 2
      const totalScrollDistance = windowHeight + sectionHeight;
      const scrolled = windowHeight - rect.top;

      const startOffset = windowHeight * 0.3;
      const stopPoint = 0.75; // 75% của section = 180vh
      const effectiveDistance = (totalScrollDistance - startOffset) * stopPoint;

      let progress = (scrolled - startOffset) / effectiveDistance;
      progress = Math.min(stopPoint, Math.max(0, progress)); // Dừng ở 75%
      
      setNuocScrollProgress(progress);
    };

    handleScroll(); // Sync lần đầu
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Track scroll progress của foot section - zoom từ 30x về 1x
  useEffect(() => {
    const handleScroll = () => {
      const el = footSectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height; // 120vh

      // Kiểm tra xem section có đang trong viewport không
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      
      // Chỉ cập nhật progress nếu không đang trong trạng thái locked (để tránh override animation khi scroll bằng wheel)
      if (isInViewport && !footScrollLocked.current) {
        // Tính progress zoom:
        //  - 0 khi section bắt đầu vào viewport (top của section = bottom của viewport)
        //  - 1 khi section đi hết (bottom của section = top của viewport)
        const totalScrollDistance = windowHeight + sectionHeight;
        const scrolled = windowHeight - rect.top; // 0 → totalScrollDistance

        let progress = scrolled / totalScrollDistance;
        progress = Math.min(1, Math.max(0, progress));
        
        setFootScrollProgress(progress);
        
        // Lock scroll nếu progress trong khoảng 0-1 (để có thể control bằng wheel)
        footScrollLocked.current = progress > 0 && progress < 1;
      } else if (!isInViewport) {
        footScrollLocked.current = false;
      }
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
  //  CHAIDAU SECTION VISIBILITY (IntersectionObserver)
  // ==============================
  useEffect(() => {
    const el = chaidauSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setChaidauSectionVisible(true);
            observer.disconnect(); // chỉ animate lần đầu
          }
        });
      },
      {
        threshold: 0.2,
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
      // Lock scroll khi foot section đang zoom (progress < 1) hoặc đã đạt progress = 1
      if (footScrollLocked.current) {
        const el = footSectionRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        const totalScrollDistance = windowHeight + sectionHeight;
        
        // Lấy progress hiện tại
        const scrolled = windowHeight - rect.top;
        const currentProgress = Math.min(1, Math.max(0, scrolled / totalScrollDistance));
        
        // Nếu đã đạt progress = 1 và user scroll xuống, unlock để scroll tiếp
        if (currentProgress >= 1 && e.deltaY > 0) {
          footScrollLocked.current = false;
          return; // Cho phép scroll tiếp
        }
        
        // Nếu đã đạt progress = 0 và user scroll lên, unlock để scroll tiếp lên trên
        if (currentProgress <= 0 && e.deltaY < 0) {
          footScrollLocked.current = false;
          return; // Cho phép scroll tiếp lên trên
        }
        
        // Lock scroll và zoom (cả khi scroll xuống và scroll lên)
        e.preventDefault();
        
        // Tính progress mới dựa trên scroll delta
        const scrollSpeed = 0.2; // Giảm tốc độ scroll (từ 0.8 xuống 0.2)
        const deltaProgress = (e.deltaY * scrollSpeed) / totalScrollDistance;
        
        setFootScrollProgress((prev) => {
          let next = prev + deltaProgress;
          next = Math.min(1, Math.max(0, next));
          
          // Khi đạt progress = 1, giữ lock để dừng lại
          if (next >= 1) {
            footScrollLocked.current = true; // Giữ lock để dừng lại
            return 1;
          }
          
          // Khi đạt progress = 0, giữ lock để có thể scroll tiếp lên trên
          if (next <= 0) {
            footScrollLocked.current = true; // Giữ lock để có thể scroll tiếp
            return 0;
          }
          
          return next;
        });
        
        // Giữ scroll position ở section này bằng cách tính toán lại scroll position dựa trên progress
        const currentScrollY = window.scrollY;
        const sectionTop = el.offsetTop;
        const scrolled2 = windowHeight - rect.top;
        const newScrolled = scrolled2 + (e.deltaY * scrollSpeed);
        const targetScrollY = sectionTop - windowHeight + newScrolled;
        
        // Clamp scroll position trong phạm vi section
        const minScroll = sectionTop - windowHeight;
        const maxScroll = sectionTop + sectionHeight - windowHeight;
        const clampedScrollY = Math.max(minScroll, Math.min(maxScroll, targetScrollY));
        
        window.scrollTo({ top: Math.max(0, clampedScrollY), behavior: 'auto' });
        
        return;
      }

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
            top: { xs: 'calc(50% - 120px)', sm: 'calc(50% - 150px)', md: 'calc(50% - 200px)', lg: 'calc(50% - 250px)' },
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            textAlign: 'center',
            pointerEvents: 'none',
            width: '100%',
            maxWidth: { xs: '95%', md: '90%' },
            px: { xs: 2, sm: 3, md: 0 },
          }}
        >
          {/* Dòng 1: Biến mất khi humanProgress >= 0.3 */}
          <Typography
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: { xs: '1.8rem', sm: '2.3rem', md: '3rem', lg: '3.6rem', xl: '4.3rem' },
              fontWeight: 700,
              color: 'rgb(52, 46, 36)',
              lineHeight: { xs: 1.2, md: 1.3 },
              whiteSpace: { xs: 'normal', sm: 'nowrap' },
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
              fontSize: { xs: '1.8rem', sm: '2.3rem', md: '3rem', lg: '3.6rem', xl: '4.3rem' },
              fontWeight: 700,
              color: 'rgb(52, 46, 36)',
              lineHeight: { xs: 1.2, md: 1.3 },
              whiteSpace: { xs: 'normal', sm: 'nowrap' },
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
          color: 'rgb(52, 46, 36)',
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
            fontWeight: 700,
            fontSize: { xs: '2.2rem', sm: '2.6rem', md: '3rem' },
            color: 'rgb(52, 46, 36)',
            textAlign: 'center',
            ...getMapFadeStyle(0.05),
          }}
        >
          Bắt đầu từ một vùng nguyên liệu hạnh phúc.
        </Typography>

        {/* Map Image */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            height: '100vh',
            minHeight: '100vh',
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
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
              ...getMapFadeStyle(0.1),
            }}
          />
          {/* MAP DETAIL TEXT OVERLAY - Vùng trồng mè */}
          <Box
            sx={{
              position: 'absolute',
              right: { xs: '2%', sm: '5%', md: '10%' },
              top: { xs: '5%', sm: '8%', md: '11%' },
              maxWidth: { xs: '45%', sm: '50%', md: '360px' },
              textAlign: 'left',
              pointerEvents: 'none',
              ...getMapFadeStyle(0.2),
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem', lg: '2.2rem' },
                color: 'rgb(52, 46, 36)',
                mb: { xs: 1, md: 1.5 },
                whiteSpace: { xs: 'normal', sm: 'nowrap' },
              }}
            >
              Vùng trồng mè tại Quảng Trị
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem', lg: '1.4rem' },
                lineHeight: { xs: 1.4, md: 1.6 },
                color: 'rgb(52, 46, 36)',
              }}
            >
              -Diện tích canh tác: <strong>12 ha</strong>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem', lg: '1.4rem' },
                lineHeight: { xs: 1.4, md: 1.6 },
                color: 'rgb(52, 46, 36)',
                whiteSpace: { xs: 'normal', sm: 'nowrap' },
              }}
            >
              -Giống: <strong>Mè đen truyền thống vùng Trường Sơn</strong>
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem', lg: '1.4rem' },
                lineHeight: { xs: 1.4, md: 1.6 },
                color: 'rgb(52, 46, 36)',
              }}
            >
              -Đặc điểm: Trồng theo <strong>VietGAP</strong>, phơi - sàng - làm sạch hoàn toàn thủ công, 
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
                fontWeight: 700,
                fontSize: { xs: '1.4rem', md: '1.6rem' },
                color: 'rgb(52, 46, 36)',
                mb: 0.5,
                maxWidth: '479px',
              }}
            >
              Vùng trồng bơ tại Đắk Lắk
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: '1.2rem', md: '1.3rem' },
                lineHeight: 1.5,
                color: 'rgb(52, 46, 36)',
              }}
            >
              -Diện tích: <strong>20 ha</strong><br /> -Giống: <strong>Booth, Tứ Quý, 034</strong>
              <br />
              -Đặc điểm: <strong>hữu cơ 100%</strong> (không phân hoá học, không thuốc BVTV)
            </Typography>

            <Box sx={{ mt: 2 }} />

            {/* Vùng trồng lúa */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem', lg: '1.6rem' },
                color: 'rgb(52, 46, 36)',
                mb: { xs: 0.25, md: 0.5 },
              }}
            >
              Vùng trồng lúa tại xã Ea Súp, Đắk Lắk
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem', lg: '1.3rem' },
                lineHeight: { xs: 1.3, md: 1.5 },
                color: 'rgb(52, 46, 36)',
              }}
            >
              -Diện tích: <strong>25 ha</strong><br /> -Giống: <strong>ST25</strong> (gạo thơm đạt giải "Gạo ngon nhất thế
              giới")
              <br />
              -Đặc điểm: canh tác <strong>100% hữu cơ</strong> theo chuẩn JAS Nhật Bản & Việt Nam, không thuốc trừ cỏ,
              quản lý nước và đất an toàn
            </Typography>

            <Box sx={{ mt: 2 }} />

            {/* Vùng trồng lạc */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem', lg: '1.6rem' },
                color: 'rgb(52, 46, 36)',
                mb: { xs: 0.25, md: 0.5 },
              }}
            >
              Vùng trồng lạc tại xã Hoà Sơn, Đắk Lắk
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem', lg: '1.3rem' },
                lineHeight: { xs: 1.3, md: 1.5 },
                color: 'rgb(52, 46, 36)',
              }}
            >
              -Diện tích: <strong>10 ha</strong><br /> -Giống: <strong>L14, L23</strong> (năng suất cao, thu hoạch ổn định)
              <br />
              -Đặc điểm: trồng theo chuẩn <strong>VietGAP</strong>, dùng phân chuồng hoai mục, hạn chế tối đa hoá chất
            </Typography>
          </Box>

          {/* MAP DETAIL TEXT OVERLAY - Vùng trồng đậu nành (riêng biệt) */}
          <Box
            sx={{
              position: 'absolute',
              right: { xs: '0%', sm: '0%', md: '0%' },
              bottom: { xs: '12%', sm: '14%', md: '16%' },
              maxWidth: { xs: '48%', sm: '50%', md: '420px' },
              textAlign: 'left',
              pointerEvents: 'none',
              ...getMapFadeStyle(0.3),
            }}
          >
            {/* Vùng trồng đậu nành */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem', lg: '1.6rem' },
                color: 'rgb(52, 46, 36)',
                mb: { xs: 0.25, md: 0.5 },
              }}
            >
              Vùng trồng đậu nành tại xã Nam Dong, Lâm Đồng
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem', lg: '1.3rem' },
                lineHeight: { xs: 1.3, md: 1.5 },
                color: 'rgb(52, 46, 36)',
              }}
            >
              -Diện tích: <strong>18 ha</strong><br /> -Giống: <strong>đậu nành không biến đổi gen (Non-GMO)</strong>
              <br />
              -Đặc điểm: sản xuất theo chuẩn <strong>VietGAP</strong>, luân canh cải tạo đất, tuyệt đối không dùng thuốc cỏ
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
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.8rem', lg: '3.8rem', xl: '4.4rem' },
            color: 'rgb(52, 46, 36)', // màu cola
            textAlign: 'center',
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
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.8rem', lg: '3.8rem', xl: '4.4rem' },
            color: 'rgb(52, 46, 36)', // màu cola
            textAlign: 'center',
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
              width: { xs: 80, sm: 100, md: 150, lg: 190 },
              height: 'auto',
              pointerEvents: 'none',
              zIndex: 3,
              transform: `translateY(${hatBgScrollProgress * 2000 * speed}%)`,
              transition: 'transform 0.03s linear',
            }}
          />
        ))}
      </Box>

      {/* NEW SECTION - Water/Step Background (240vh) */}
      <Box
        ref={nuocSectionRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: '240vh',
          overflow: 'hidden',
          backgroundColor: '#020617',
        }}
      >
        {/* Background ghép từ nuocbackground + nuocbackground2 để phủ hết 240vh */}
        <Box
          component="img"
          src={nuocBackground}
          alt="Nuoc background top"
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
          src={nuocBackground2}
          alt="Nuoc background bottom"
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

        {/* Ảnh nuoc.png - rơi xuống khi scroll, dừng ở 50% của 120vh thứ 2 */}
        <Box
          component="img"
          src={nuoc}
          alt="Nuoc"
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: `translateX(-50%) translateY(${(nuocScrollProgress / 0.75) * 180}vh)`,
            width: { xs: '60%', md: '50%' },
            maxWidth: { xs: '300px', sm: '350px', md: '400px' },
            height: 'auto',
            objectFit: 'contain',
            zIndex: 1,
            pointerEvents: 'none',
            transition: 'transform 0.03s linear',
          }}
        />

        {/* Text "Anaoi ra đời" - hiện ra khi nuoc.png dừng lại (ở giữa 120vh dưới) */}
        <Typography
          sx={{
            position: 'absolute',
            top: '150vh', // Giữa 120vh dưới (120vh + 30vh = 150vh)
            left: '50%',
            transform: `translateX(-50%) translateY(${nuocScrollProgress >= 0.75 ? 0 : 20}px)`,
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.8rem', lg: '3.8rem', xl: '4.4rem' },
            color: 'rgb(52, 46, 36)', // màu cola
            textAlign: 'center',
            zIndex: 2,
            pointerEvents: 'none',
            px: { xs: 2, md: 4 },
            maxWidth: '90%',
            lineHeight: 1.3,
            opacity: nuocScrollProgress >= 0.75 ? 1 : 0,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          Anaoi ra đời
        </Typography>
      </Box>

      {/* NEW SECTION - Chaidau (120vh) */}
      <Box
        ref={chaidauSectionRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: '120vh',
          overflow: 'hidden',
          backgroundColor: '#FFF8E7',
        }}
      >
        {/* 3 ảnh chồng lên nhau - tỷ lệ 16:9 với animation */}
        {/* 27.png - rơi từ trên xuống */}
        <Box
          component="img"
          src={chaidau2}
          alt="Chaidau 2"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            aspectRatio: '16/9',
            zIndex: 2,
            pointerEvents: 'none',
            transform: chaidauSectionVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.8s ease-out',
          }}
        />
        {/* 26.png - trượt từ trái sang phải */}
        <Box
          component="img"
          src={chaidau1}
          alt="Chaidau 1"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            aspectRatio: '16/9',
            zIndex: 1,
            pointerEvents: 'none',
            transform: chaidauSectionVisible ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.8s ease-out 0.2s',
          }}
        />
        {/* 28.png - trượt từ phải sang trái */}
        <Box
          component="img"
          src={chaidau3}
          alt="Chaidau 3"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            aspectRatio: '16/9',
            zIndex: 3,
            pointerEvents: 'none',
            transform: chaidauSectionVisible ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.8s ease-out 0.4s',
          }}
        />

        {/* Text overlay ở top của section */}
        <Box
          sx={{
            position: 'absolute',
            top: '1%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            width: '90%',
            maxWidth: '800px',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem' },
              color: 'rgb(52, 46, 36)',
              lineHeight: 1.3,
            }}
          >
            Mỗi giọt dầu là tinh hoa của hạt và sự tử tế của người làm.
          </Typography>       
        </Box>

        {/* Text overlay ở bottom của section */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '1%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            width: '90%',
            maxWidth: '2000px',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography
            component="div"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem' },
              color: 'rgb(52, 46, 36)',
              lineHeight: 1.3,
            }}
            dangerouslySetInnerHTML={{
              __html: 'Một loại dầu nhẹ lành, nguyên bản, giúp bữa ăn của bạn <br />vui hơn, ngon hơn và hạnh phúc hơn mỗi ngày.'
            }}
          />
        </Box>
      </Box>

      {/* NEW SECTION - Text section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#D7E9A0',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Nửa trái - Ảnh use.png */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            height: { xs: 'auto', sm: '50vh', md: '100vh' },
            minHeight: { xs: '300px', sm: '50vh', md: '100vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, md: 4 },
          }}
        >
          <Box
            component="img"
            src={use}
            alt="Use"
            sx={{
              width: '100%',
              maxWidth: { xs: '90%', sm: '500px', md: '600px' },
              height: 'auto',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        </Box>

        {/* Nửa phải - Text */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            height: { xs: 'auto', sm: '50vh', md: '100vh' },
            minHeight: { xs: '300px', sm: '50vh', md: '100vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, md: 4 },
          }}
        >
          <Typography
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem' },
              color: 'rgb(52, 46, 36)', // màu cola
              lineHeight: 1.3,
              textAlign: 'center',
              maxWidth: '100%',
              width: '100%',
            }}
            dangerouslySetInnerHTML={{
              __html: 'Hạnh phúc đôi khi bắt đầu rất giản dị <br />như một bữa ăn ngon được làm từ những giọt dầu bạn tin tưởng.'
            }}
          />
        </Box>
      </Box>

      {/* NEW SECTION - Text và ảnh use2 (ngược lại) */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#FFF8DC', // Màu kem
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Nửa trái - Text */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            height: { xs: 'auto', sm: '50vh', md: '100vh' },
            minHeight: { xs: '300px', sm: '50vh', md: '100vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, md: 4 },
          }}
        >
          <Typography
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem', xl: '3rem' },
              color: 'rgb(52, 46, 36)', // màu cola
              lineHeight: 1.3,
              textAlign: 'center',
              maxWidth: '100%',
              width: '100%',
            }}
          >
            Một chai dầu lành để mỗi bữa cơm trở thành khoảnh khắc cả nhà quây quần, ấm áp và an yên.
          </Typography>
        </Box>

        {/* Nửa phải - Ảnh use2.png */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            height: { xs: 'auto', sm: '50vh', md: '100vh' },
            minHeight: { xs: '300px', sm: '50vh', md: '100vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, md: 4 },
          }}
        >
          <Box
            component="img"
            src={use2}
            alt="Use 2"
            sx={{
              width: '100%',
              maxWidth: { xs: '90%', sm: '500px', md: '600px' },
              height: 'auto',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        </Box>
      </Box>

      {/* NEW SECTION - Foot image với text overlay */}
      <Box
        ref={footSectionRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: '120vh',
          overflow: 'hidden',
          backgroundColor: `rgba(${255 * footScrollProgress}, ${255 * footScrollProgress}, ${255 * footScrollProgress}, 1)`, // Chuyển từ đen sang trắng khi zoom về 1x
          transition: 'background-color 0.1s linear',
        }}
      >
        {/* Ảnh foot.png - zoom từ 30x về 1x và mờ dần khi scroll */}
        <Box
          component="img"
          src={foot}
          alt="Foot"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            pointerEvents: 'none',
            transform: `translate(-50%, -50%) scale(${30 - (footScrollProgress * 29)})`, // Từ 30 về 1
            transformOrigin: 'center center',
            opacity: footScrollProgress < 0.918 ? 1 : 1 - ((footScrollProgress - 0.918) / 0.082), // Bắt đầu mờ từ 10% zoom (scale = 5x, progress ≈ 0.918)
            transition: 'transform 0.1s linear, opacity 0.1s linear',
          }}
        />


        {/* Text overlay - di chuyển từ bottom lên center và hiện ra khi zoom về 1x */}
        <Typography
          component="div"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, ${footScrollProgress >= 1 ? '-50%' : 'calc(-50% + 40vh)'})`, // Từ bottom lên center
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem', lg: '4.5rem', xl: '5.5rem' }, // Tăng font size lên
            color: 'rgb(52, 46, 36)', // màu cola
            lineHeight: 1.3,
            textAlign: 'center',
            maxWidth: '100%',
            width: '100%',
            px: { xs: 1.5, sm: 2, md: 4 },
            zIndex: 2,
            pointerEvents: 'none',
            opacity: footScrollProgress >= 1 ? 1 : 0, // Ẩn đi khi progress < 1, chỉ hiện ra khi progress = 1
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
          dangerouslySetInnerHTML={{
            __html: 'AnaOi - Hành trình lan tỏa dinh dưỡng và <br />hạnh phúc vào từng gian bếp Việt.'
          }}
        />
      </Box>
    </Box>
  );
}

export default NutritionJourneyPage;
