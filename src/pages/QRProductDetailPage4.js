import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SplitText from '../components/SplitText';
import SixOSection from '../components/SixOSection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import elementbrg from '../assets/nguongoc/sp4/elementbrg.png';
import logo1 from '../assets/nguongoc/sp1/logo1.png';
import logo2 from '../assets/nguongoc/sp1/logo2.png';
import logo3 from '../assets/nguongoc/sp1/logo3.png';
import logo5 from '../assets/nguongoc/sp1/logo5.png';
import anhsanpham from '../assets/nguongoc/sp4/anhsanpham.png';
import diadiem from '../assets/nguongoc/sp4/diamdiem1.png';
import diadiem2 from '../assets/nguongoc/sp4/diadiem2.png';
import nguoithuhoach1 from '../assets/nguongoc/sp4/nguoithuhoach1.png';
import nguoithuhoach2 from '../assets/nguongoc/sp4/nguoithuhoach2.png';

// Color scheme
const bronzeYellow = '#667B00';

// Component wrapper cho các giai đoạn với scroll animation
function StageBox({ children, delay = 0 }) {
  const { elementRef, animationStyles } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
    delay,
  });

  return (
    <Box
      ref={elementRef}
      sx={{
        ...animationStyles,
      }}
    >
      {children}
    </Box>
  );
}

function QRProductDetailPage4() {
  const { productId } = useParams();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#FDFCF5',
        pt: 4,
        pb: 8,
        overflowX: 'hidden',
      }}
    >
      {/* Background Layer - Lớp nền cho toàn bộ trang */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          backgroundColor: '#FDFCF5',
          backgroundImage: 'linear-gradient(135deg, rgba(247, 243, 205, 0.3) 0%, rgba(255, 249, 230, 0.2) 50%, rgba(253, 244, 200, 0.3) 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }}
      />

      {/* Keyframes cho animation */}
      <style>
        {Array.from({ length: 20 }).map((_, index) => {
          const rotation = (index * 15) % 360;
          const translateY = 10 + (index % 20);
          return `
            @keyframes floatAnimation${index} {
              0%, 100% {
                transform: rotate(${rotation}deg) translateY(0px);
              }
              50% {
                transform: rotate(${rotation}deg) translateY(${translateY}px);
              }
            }
          `;
        }).join('')}
      </style>

      {/* Element Background Images - Nằm trên background layer */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0.5,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => {
          const duration = 10 + (index % 5);
          return (
            <Box
              key={index}
              component="img"
              src={elementbrg}
              alt="Element background"
              sx={{
                position: 'absolute',
                width: '60px',
                height: 'auto',
                opacity: 0.15,
                top: `${(index * 7) % 100}%`,
                left: `${(index * 11) % 100}%`,
                animation: `floatAnimation${index} ${duration}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          py: 4,
        }}
      >
        {/* Tiêu đề */}
        <Box sx={{ textAlign: 'center', px: 2, width: '100%' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: bronzeYellow,
              mb: 0.5,
              fontSize: '2rem',
              textAlign: 'center',
              display: 'block',
              lineHeight: 1.2,
              wordBreak: 'break-word',
              fontFamily: "'VNM Sans Std', sans-serif",
            }}
          >
            <SplitText
              text="Dầu Blend Đậu Nành"
              delay={80}
              duration={0.6}
              ease="ease-out"
              splitType="chars"
              from={{ opacity: 0, y: -50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="center"
            />
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: bronzeYellow,
              mb: 0.5,
              fontSize: '2rem',
              textAlign: 'center',
              display: 'block',
              lineHeight: 1.2,
              wordBreak: 'break-word',
              fontFamily: "'VNM Sans Std', sans-serif",
            }}
          >
            <SplitText
              text="& Cám Gạo Ép Lạnh"
              delay={80}
              duration={0.6}
              ease="ease-out"
              splitType="chars"
              from={{ opacity: 0, y: -50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="center"
            />
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              color: '#666',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              textAlign: 'center',
              display: 'block',
              whiteSpace: 'normal',
              width: '100%',
              px: 1,
              lineHeight: 1.4,
              wordBreak: 'break-word',
              mt: 0.5,
            }}
          >
            <SplitText
              text="(Cold-Pressed Blend - Rice Bran & Soybean Oil)"
              delay={60}
              duration={0.5}
              ease="ease-out"
              splitType="chars"
              from={{ opacity: 0, y: -40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="center"
            />
          </Typography>
        </Box>
      </Box>

      {/* Section 2: Thông tin sản phẩm */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#FDFCF5',
          py: 3,
        }}
      >
        {/* Ảnh sản phẩm */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            minHeight: '40vh',
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            order: 2,
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={anhsanpham}
            alt="Ảnh sản phẩm"
            sx={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '50vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>

        {/* Text - Card thông tin sản phẩm */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start',
            maxWidth: '100%',
            height: 'auto',
            justifyContent: 'flex-start',
            boxSizing: 'border-box',
            order: 1,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            mx: 2,
            mb: 2,
          }}
        >
          {/* Tiêu đề: Thông tin sản phẩm */}
          <Box sx={{ width: '100%', borderBottom: `2px solid ${bronzeYellow}`, pb: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                color: bronzeYellow,
                fontSize: '1.1rem',
                mb: 0,
                lineHeight: 1.3,
                wordBreak: 'break-word',
                fontFamily: "'VNM Sans Std', sans-serif",
              }}
            >
              Thông tin sản phẩm
            </Typography>
          </Box>

          {/* Lô sản xuất */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Lô sản xuất : <span style={{ fontWeight: 400 }}>BRS-02</span>
            </Typography>
          </Box>

          {/* Ngày sản xuất */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Ngày sản xuất : <span style={{ fontWeight: 400 }}>24/09/2025</span>
            </Typography>
          </Box>

          {/* Hạn dùng */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Hạn dùng : <span style={{ fontWeight: 400 }}>24/03/2027</span>
            </Typography>
          </Box>

          {/* Dung tích */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Dung tích : <span style={{ fontWeight: 400 }}>500ML/1000ML</span>
            </Typography>
          </Box>

          {/* Chứng nhận & tiêu chuẩn */}
          <Box sx={{ width: '100%', mt: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 1.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Chứng nhận & tiêu chuẩn:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              <Box
                component="img"
                src={logo1}
                alt="Logo 1"
                sx={{
                  height: '60px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
              <Box
                component="img"
                src={logo2}
                alt="Logo 2"
                sx={{
                  height: '60px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
              <Box
                component="img"
                src={logo3}
                alt="Logo 3"
                sx={{
                  height: '60px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
              <Box
                component="img"
                src={logo5}
                alt="Logo 5"
                sx={{
                  height: '60px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Section 3: Địa điểm */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FDFCF5',
        }}
      >
        {/* Text: Địa điểm trồng */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            px: 2,
            py: 3,
            textAlign: 'center',
            backgroundColor: '#fff',
            mb: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: bronzeYellow,
              fontSize: '1.3rem',
              lineHeight: 1.3,
              wordBreak: 'break-word',
              fontFamily: "'VNM Sans Std', sans-serif",
            }}
          >
            Điểm trồng: "Nông trại Lâm Đồng"
          </Typography>
        </Box>

        {/* Ảnh địa điểm - Full width mobile */}
        <Box
          sx={{
            width: '100vw',
            position: 'relative',
            left: '1%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            marginBottom: '16px',
          }}
        >
          <Box
            component="img"
            src={diadiem}
            alt="Địa điểm"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </Box>

        {/* Card thông tin nông trại */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start',
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            mx: 2,
            mb: 3,
          }}
        >
          {/* Thông tin nông trại */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Thông tin nông trại: <span style={{ fontWeight: 400 }}>Hợp Tác Xã Sản Xuất Đậu Nành Nam Dong</span>
            </Typography>
          </Box>

          {/* Tên hộ gia đình/hợp tác xã cung cấp */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Tên hộ gia đình/hợp tác xã cung cấp: <span style={{ fontWeight: 400 }}>Ông Nguyễn Văn Trung</span>
            </Typography>
          </Box>

          {/* Quy trình */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Quy trình: <span style={{ fontWeight: 400 }}>VietGAP, không sử dụng thuốc trừ sâu bị cấm.</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Section 3b: Địa điểm 2 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FDFCF5',
        }}
      >
        {/* Text: Địa điểm trồng */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            px: 2,
            py: 3,
            textAlign: 'center',
            backgroundColor: '#fff',
            mb: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: bronzeYellow,
              fontSize: '1.3rem',
              lineHeight: 1.3,
              wordBreak: 'break-word',
              fontFamily: "'VNM Sans Std', sans-serif",
            }}
          >
            Điểm trồng: "Nông trại Đắk Lắk"
          </Typography>
        </Box>

        {/* Ảnh địa điểm - Full width mobile */}
        <Box
          sx={{
            width: '100vw',
            position: 'relative',
            left: '1%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            marginBottom: '16px',
          }}
        >
          <Box
            component="img"
            src={diadiem2}
            alt="Địa điểm 2"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </Box>

        {/* Card thông tin nông trại */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start',
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            mx: 2,
            mb: 3,
          }}
        >
          {/* Thông tin nông trại */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Thông tin nông trại: <span style={{ fontWeight: 400 }}>Họp Tác Xã Giảm Nghèo Ea Sup</span>
            </Typography>
          </Box>

          {/* Tên hộ gia đình/hợp tác xã cung cấp */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Tên hộ gia đình/hợp tác xã cung cấp: <span style={{ fontWeight: 400 }}>Ông Nguyễn Thanh Lộc</span>
            </Typography>
          </Box>

          {/* Quy trình */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: '0.85rem',
                mb: 0.5,
                lineHeight: 1.5,
                wordBreak: 'break-word',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Quy trình: <span style={{ fontWeight: 400 }}>Hữu cơ, đạt tiêu chuẩn JAS, không sử dụng thuốc trừ sâu.</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Section 4: Quy trình sản xuất */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          px: 2,
          py: 4,
          backgroundColor: '#FDFCF5',
        }}
      >
        <Box
          sx={{
            maxWidth: '100%',
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Title: ĐẬU NÀNH */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: bronzeYellow,
                fontSize: '1.5rem',
                mb: 2,
                textAlign: 'center',
                fontFamily: "'VNM Sans Std', sans-serif",
              }}
            >
              ĐẬU NÀNH
            </Typography>

            {/* Container cho phần Đậu Nành với đường thẳng riêng */}
            <Box
              sx={{
                position: 'relative',
                pl: 6,
              }}
            >
              {/* Đường thẳng nối các giai đoạn Đậu Nành */}
              <Box
                sx={{
                  position: 'absolute',
                  left: '20px',
                  top: '20px',
                  bottom: '20px',
                  width: '2px',
                  backgroundColor: bronzeYellow,
                  zIndex: 1,
                }}
              />

            {/* Giai đoạn 1: Thu hoạch */}
            <StageBox stageNumber={1} delay={0}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'flex-start',
                pl: 6,
              }}
            >
              {/* Số giai đoạn */}
              <Box
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: bronzeYellow,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  position: 'absolute',
                  left: 0,
                  zIndex: 3,
                  border: '3px solid #fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                1
              </Box>

            {/* Nội dung */}
            <Box sx={{ flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1.1rem',
                  mb: 1.5,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Giai đoạn 1: Thu hoạch
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Ngày:</strong> 18/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Nguyên liệu:</strong> Hạt Đậu Nành giống Vinasoy 02-NS
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Độ chín:</strong> chín vừa đạt chuẩn
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Người thu hoạch:</strong> Tổ đội thu hoạch Hợp tác xã Nam Dong
                </Typography>
                <Box
                  component="img"
                  src={nguoithuhoach1}
                  alt="Người thu hoạch"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '250px',
                    objectFit: 'contain',
                    display: 'block',
                    mt: 2,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
          </Box>
          </StageBox>

          {/* Giai đoạn 2: Sơ chế */}
          <StageBox stageNumber={2} delay={100}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'flex-start',
              pl: 6,
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                flexShrink: 0,
                position: 'absolute',
                left: 0,
                zIndex: 3,
                border: '3px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              2
            </Box>

            <Box sx={{ flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1.1rem',
                  mb: 1.5,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Giai đoạn 2: Sơ chế
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Ngày:</strong> 22/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Làm sạch:</strong> Đậu nành được rửa sạch, bóc vỏ bằng máy chuyên dụng, sau đó phơi khô dưới ánh nắng để đạt chuẩn độ ẩm.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Kiểm tra Vi sinh:</strong> Mẫu đậu nành được kiểm tra nghiêm ngặt trước khi ép để đảm bảo không có mầm bệnh, đặc biệt là vi khuẩn và nấm mốc.
                </Typography>
              </Box>
            </Box>
          </Box>
          </StageBox>

          {/* Giai đoạn 3: Ép lạnh */}
          <StageBox stageNumber={3} delay={200}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'flex-start',
              pl: 6,
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                flexShrink: 0,
                position: 'absolute',
                left: 0,
                zIndex: 3,
                border: '3px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              3
            </Box>

            <Box sx={{ flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1.1rem',
                  mb: 1.5,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Giai đoạn 3: Ép lạnh ≤ 49°C
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Ngày:</strong> 24/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Máy Ép:</strong> Máy ép thủy lực Model: GM 200 HF, Tốc độ ép: 25 kg/5 phút.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Lợi ích:</strong> Phương pháp này giữ lại Vitamin E, Omega 3, 6, 9 và các hoạt chất chống oxy hóa tự nhiên. Dầu thu được là Virgin Oil (nguyên chất, chưa tinh chế), giữ được hương vị đậu nành tự nhiên, không bị cháy dầu/mất chất do nhiệt.
                </Typography>
              </Box>
            </Box>
          </Box>
          </StageBox>

          {/* Giai đoạn 4: Lọc – Đóng chai – Niêm phong */}
          <StageBox stageNumber={4} delay={300}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'flex-start',
              pl: 6,
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                flexShrink: 0,
                position: 'absolute',
                left: 0,
                zIndex: 3,
                border: '3px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              4
            </Box>

            <Box sx={{ flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1.1rem',
                  mb: 1.5,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Giai đoạn 4: Lọc – Đóng chai – Niêm phong
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Ngày:</strong> 24/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Lọc:</strong> Máy lọc dầu Model: GM 300 OF, Tốc độ lọc: 15 Lít/giờ.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Dây chuyền Đóng Chai Khép kín:</strong> Đảm bảo vệ sinh an toàn thực phẩm theo tiêu chuẩn ISO 22000.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Mã Lô & Truy Xuất:</strong> Mã Lô 24092025-SOY
                </Typography>
              </Box>
            </Box>
          </Box>
          </StageBox>
          </Box>

          {/* Title: CÁM GẠO */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: bronzeYellow,
              fontSize: '1.5rem',
              mb: 2,
              mt: 4,
              textAlign: 'center',
              fontFamily: "'VNM Sans Std', sans-serif",
            }}
          >
            CÁM GẠO
          </Typography>

          {/* Container cho phần Cám Gạo với đường thẳng riêng */}
          <Box
            sx={{
              position: 'relative',
              pl: 6,
            }}
          >
            {/* Đường thẳng nối các giai đoạn Cám Gạo */}
            <Box
              sx={{
                position: 'absolute',
                left: '20px',
                top: '20px',
                bottom: '20px',
                width: '2px',
                backgroundColor: bronzeYellow,
                zIndex: 1,
              }}
            />

          {/* Giai đoạn 1: Thu hoạch - CÁM GẠO */}
          <StageBox stageNumber={1} delay={0}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'flex-start',
              pl: 6,
            }}
          >
            {/* Số giai đoạn */}
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                flexShrink: 0,
                position: 'absolute',
                left: 0,
                zIndex: 3,
                border: '3px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              1
            </Box>

            {/* Nội dung */}
            <Box sx={{ flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1.1rem',
                  mb: 1.5,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Giai đoạn 1: Thu hoạch
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Ngày:</strong> 17/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Nguyên liệu:</strong> Gạo ST25 Ngọc Nương
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Người thu hoạch:</strong> Tổ đội thu hoạch Hợp tác xã Giảm nghèo Ea Sup
                </Typography>
                <Box
                  component="img"
                  src={nguoithuhoach2}
                  alt="Người thu hoạch"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '250px',
                    objectFit: 'contain',
                    display: 'block',
                    mt: 2,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
          </Box>
          </StageBox>

          {/* Giai đoạn 2: Sơ chế - CÁM GẠO */}
          <StageBox stageNumber={2} delay={100}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'flex-start',
              pl: 6,
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                flexShrink: 0,
                position: 'absolute',
                left: 0,
                zIndex: 3,
                border: '3px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              2
            </Box>

            <Box sx={{ flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1.1rem',
                  mb: 1.5,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Giai đoạn 2: Sơ chế
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Ngày:</strong> 22/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Kiểm tra chất lượng:</strong> Cám gạo được tiếp nhận và kiểm tra cảm quan (màu, mùi), kiểm tra nhanh hàm lượng dầu/độ ẩm để đảm bảo nguyên liệu tươi mới.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Kiểm tra Vi sinh:</strong> Mẫu cám gạo được kiểm tra nghiêm ngặt trước khi ép để đảm bảo không có mầm bệnh, an toàn tuyệt đối.
                </Typography>
              </Box>
            </Box>
          </Box>
          </StageBox>

          {/* Giai đoạn 3: Ép lạnh - CÁM GẠO */}
          <StageBox stageNumber={3} delay={200}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'flex-start',
              pl: 6,
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                flexShrink: 0,
                position: 'absolute',
                left: 0,
                zIndex: 3,
                border: '3px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              3
            </Box>

            <Box sx={{ flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1.1rem',
                  mb: 1.5,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Giai đoạn 3: Ép lạnh ≤ 49°C
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Ngày:</strong> 24/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Máy Ép:</strong> Máy ép thủy lực Model: GM 200 HF, Tốc độ ép: 25 kg/5phút.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Lợi ích:</strong> Phương pháp này giữ lại Gamma Oryzanol (hoạt chất chống oxy hóa mạnh, hỗ trợ giảm cholesterol), Vitamin E và Phytosterol. Dầu thu được là Virgin Oil (nguyên chất, chưa tinh chế), không bị cháy dầu/mất chất do nhiệt.
                </Typography>
              </Box>
            </Box>
          </Box>
          </StageBox>

          {/* Giai đoạn 4: Lọc – Đóng chai – Niêm phong - CÁM GẠO */}
          <StageBox stageNumber={4} delay={300}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'flex-start',
              pl: 6,
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                flexShrink: 0,
                position: 'absolute',
                left: 0,
                zIndex: 3,
                border: '3px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              4
            </Box>

            <Box sx={{ flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1.1rem',
                  mb: 1.5,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Giai đoạn 4: Lọc – Đóng chai – Niêm phong
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Ngày:</strong> 24/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Lọc:</strong> Máy lọc dầu Model: GM 300 OF, Tốc độ lọc: 15 Lít/giờ.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Dây chuyền Đóng Chai Khép kín:</strong> Đảm bảo vệ sinh an toàn thực phẩm theo tiêu chuẩn ISO 22000.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  <strong>Mã Lô & Truy Xuất:</strong> Mã Lô 24092025-RBR
                </Typography>
              </Box>
            </Box>
          </Box>
          </StageBox>
          </Box>

          {/* Phần 4: Bảng kiểm định chất lượng - Card */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: bronzeYellow,
                fontSize: '1.1rem',
                mb: 2,
                textAlign: 'center',
                fontFamily: "'VNM Sans Std', sans-serif",
              }}
            >
              Bảng kiểm định chất lượng (Quality & Safety Sheet)
            </Typography>

            {/* Card kiểm định */}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                p: 2.5,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: `2px solid ${bronzeYellow}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: '1rem',
                  mb: 2,
                  borderBottom: `1px solid ${bronzeYellow}`,
                  pb: 1,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Bảng kiểm định chất lượng
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: '#333',
                }}
              >
                {[
                  'Kiểm định vi sinh: đạt / không phát hiện',
                  'Kim loại nặng: trong ngưỡng an toàn',
                  'Độ acid (FFA): đạt chuẩn Codex',
                  'Chỉ số peroxit (PV): trong mức an toàn',
                  'Độ ẩm: < 0.2%',
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.25,
                    }}
                  >
                    <Box
                      sx={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      <Box
                        sx={{
                          width: '7px',
                          height: '7px',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit', flex: 1, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          </Box>
        </Box>
      </Box>

      <SixOSection />
    </Box>
  );
}

export default QRProductDetailPage4;

