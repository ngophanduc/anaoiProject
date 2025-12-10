import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import background from '../assets/hanhtrinh/background.png';
import human from '../assets/hanhtrinh/human.png';
import map from '../assets/hanhtrinh/map.png';

const HEADER_HEIGHT = 64;

function NutritionJourneyPage() {
  // Header visibility state
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Human animation progress: 0 (start position) → 1 (moved all the way to the right)
  const [humanProgress, setHumanProgress] = useState(0);

  // When human reaches the end (progress = 1), unlock page scrolling
  const [animationDone, setAnimationDone] = useState(false);

  // Map zoom animation states
  // Phase: 'idle' → 'zooming-in' → 'zoomed-in' → 'zooming-out' → 'done'
  const [mapZoomPhase, setMapZoomPhase] = useState('idle'); // 'idle' | 'zooming-in' | 'zoomed-in' | 'zooming-out' | 'done'
  const [mapZoomProgress, setMapZoomProgress] = useState(0); // 0 (normal) → 1 (zoomed) → 0 (back to normal)
  const [mapRotation, setMapRotation] = useState(0); // Rotation angle for 3D effect (0 to max rotation)
  const mapContainerRef = useRef(null);
  const mapScrollLocked = useRef(false);
  const mapScrollPosition = useRef(0);

  // ==============================
  //  WHEEL HANDLER: Scroll locking & human animation
  // ==============================
  useEffect(() => {
    const handleWheel = (e) => {
      // Nếu đang trong map zoom phase, không xử lý ở đây (để map wheel handler xử lý)
      if (mapScrollLocked.current && mapZoomPhase !== 'done') {
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
  }, [animationDone, mapZoomPhase]);

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
      if (mapScrollLocked.current && mapZoomPhase !== 'done') {
        window.scrollTo({ top: mapScrollPosition.current, behavior: 'auto' });
        return;
      }

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
  }, [animationDone, lastScrollY, mapZoomPhase]);

  // ==============================
  //  MAP PROGRESS SYNC: Sync phase with progress and rotation
  // ==============================
  useEffect(() => {
    // Rotation tỷ lệ trực tiếp với progress (0 → 25 độ)
    setMapRotation(mapZoomProgress * 25);

    if (mapZoomProgress >= 1 && mapZoomPhase === 'zooming-in') {
      setMapZoomPhase('zoomed-in');
    } else if (mapZoomProgress <= 0) {
      if (mapZoomPhase === 'zooming-out') {
        // Đã zoom out xong, unlock scroll
        setMapZoomPhase('done');
        mapScrollLocked.current = false;
      } else if (mapZoomPhase === 'zoomed-in') {
        // Nếu đang ở zoomed-in và progress về 0 (do scroll lên), về idle
        setMapZoomPhase('idle');
        mapScrollLocked.current = false;
      } else if (mapZoomPhase === 'zooming-in') {
        // Nếu đang zoom in nhưng scroll lên về 0, về idle
        setMapZoomPhase('idle');
        mapScrollLocked.current = false;
      }
    }
  }, [mapZoomProgress, mapZoomPhase]);

  // ==============================
  //  MAP VIEWPORT DETECTION & WHEEL HANDLER: Lock scroll and control zoom
  // ==============================
  useEffect(() => {
    if (!animationDone || !mapContainerRef.current) return;

    const handleMapWheel = (e) => {
      const mapContainer = mapContainerRef.current;
      if (!mapContainer) return;

      const rect = mapContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Kiểm tra xem map có trong viewport không (top của container ở giữa màn hình)
      const isMapInViewport = rect.top <= windowHeight * 0.5 && rect.top >= -rect.height * 0.3;

      // Nếu map chưa vào viewport hoặc đã done, không xử lý
      if (!isMapInViewport) {
        // Nếu đang lock nhưng map đã ra khỏi viewport và đã done, unlock
        if (mapScrollLocked.current && mapZoomPhase === 'done') {
          mapScrollLocked.current = false;
        }
        return;
      }

      // Bắt đầu lock scroll khi map vào viewport
      if (!mapScrollLocked.current && mapZoomPhase === 'idle') {
        mapScrollLocked.current = true;
        mapScrollPosition.current = window.scrollY;
      }

      // Nếu đang lock scroll và chưa done, xử lý zoom
      if (mapScrollLocked.current && mapZoomPhase !== 'done') {
        e.preventDefault();
        window.scrollTo({ top: mapScrollPosition.current, behavior: 'auto' });

        const speed = 0.002; // Tốc độ zoom
        const delta = e.deltaY;

        if (delta > 0) {
          // Scroll xuống
          if (mapZoomPhase === 'idle') {
            // Bắt đầu zoom in
            setMapZoomPhase('zooming-in');
            setMapZoomProgress((prev) => Math.min(1, prev + Math.abs(delta) * speed));
          } else if (mapZoomPhase === 'zooming-in') {
            // Tiếp tục zoom in
            setMapZoomProgress((prev) => Math.min(1, prev + Math.abs(delta) * speed));
          } else if (mapZoomPhase === 'zoomed-in') {
            // Bắt đầu zoom out
            setMapZoomPhase('zooming-out');
            setMapZoomProgress((prev) => Math.max(0, prev - Math.abs(delta) * speed));
          } else if (mapZoomPhase === 'zooming-out') {
            // Tiếp tục zoom out
            setMapZoomProgress((prev) => Math.max(0, prev - Math.abs(delta) * speed));
          }
        } else if (delta < 0) {
          // Scroll lên: zoom out hoặc giữ nguyên
          if (mapZoomPhase === 'zoomed-in' || mapZoomPhase === 'zooming-out') {
            setMapZoomPhase('zooming-out');
            setMapZoomProgress((prev) => Math.max(0, prev - Math.abs(delta) * speed));
          } else if (mapZoomPhase === 'zooming-in') {
            setMapZoomProgress((prev) => Math.max(0, prev - Math.abs(delta) * speed));
          }
        }
      }
    };

    window.addEventListener('wheel', handleMapWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleMapWheel);
    };
  }, [animationDone, mapZoomPhase]);

  // Calculate human translateX: moves from 0% to 120% (off screen to the right)
  const humanTranslateX = humanProgress * 120;

  // Calculate map zoom transform: zoom vào bottom của ảnh với rotation 3D
  const mapScale = 1 + mapZoomProgress * 0.6; // Scale từ 1x đến 1.6x
  const mapRotationX = mapRotation; // Rotation X (nghiêng về phía trước) - 0 đến 25 độ
  const mapRotationY = -mapRotation * 0.3; // Rotation Y (nghiêng nhẹ sang bên) - 0 đến -7.5 độ

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

      {/* CONTENT */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#020617',
          color: 'white',
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
            color: '#FFF7E6',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.8)',
          }}
        >
          Bắt đầu từ một vùng nguyên liệu hạnh phúc.
        </Typography>

        {/* Map Image */}
        <Box
          ref={mapContainerRef}
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
              minHeight: '500px', // Đảm bảo có chiều cao để zoom
              objectFit: mapZoomProgress > 0.1 ? 'cover' : 'contain', // Chuyển sang cover khi zoom
              objectPosition: `center bottom`, // Zoom vào bottom của ảnh
              display: 'block',
              transform: `
                scale(${mapScale}) 
                rotateX(${mapRotationX}deg) 
                rotateY(${mapRotationY}deg)
              `, // Zoom + rotation 3D (nghiêng về phía trước và một chút sang bên)
              transformOrigin: 'center bottom', // Zoom vào bottom của ảnh
              transformStyle: 'preserve-3d', // Giữ nguyên hiệu ứng 3D
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), object-fit 0.3s ease, object-position 0.3s ease',
            }}
          />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default NutritionJourneyPage;
