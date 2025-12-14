import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SplitText from '../components/SplitText';
import elementbrg from '../assets/nguongoc/sp2/elementbrg.png';
import chungnhan from '../assets/nguongoc/sp1/chungnhan.png';
import anhsanpham from '../assets/nguongoc/sp2/anhsanpham.png';
import diadiem from '../assets/nguongoc/sp2/diadiem1.png';
import diadiem2 from '../assets/nguongoc/sp2/diadiem2.png';
import nguoithuhoach1 from '../assets/nguongoc/sp2/nguoithuhoach1.png';
import nguoithuhoach2 from '../assets/nguongoc/sp2/nguoithuhoach2.png';

// Color scheme
const bronzeYellow = '#667B00';

function QRProductDetailPage2() {
  const { productId } = useParams();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#FDFCF5',
        pt: 4,
        pb: 8,
        overflow: 'hidden',
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
                width: { xs: '80px', md: '120px' },
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
          px: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {/* Tiêu đề */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'VNM Sans Display', sans-serif",
              fontWeight: 700,
              color: bronzeYellow,
              mb: 1,
              fontSize: { xs: '7.5rem', md: '10.5rem' },
              textAlign: 'center',
              display: 'inline-block',
            }}
          >
            <SplitText
              text="Dầu Blend Mè Đen"
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
              fontFamily: "'VNM Sans Display', sans-serif",
              fontWeight: 700,
              color: bronzeYellow,
              mb: 1,
              fontSize: { xs: '7.5rem', md: '10.5rem' },
              textAlign: 'center',
              display: 'inline-block',
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
              fontFamily: "'VNM Sans Std', sans-serif",
              fontWeight: 400,
              color: '#666',
              fontStyle: 'italic',
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              textAlign: 'center',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <SplitText
              text="(Cold-Pressed Blend - Rice Bran & Black Sesame Oil)"
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
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Ảnh sản phẩm - Full kích thước, làm background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={anhsanpham}
            alt="Ảnh sản phẩm"
            sx={{
              width: 'auto',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>

        {/* Text overlay - Nằm trên ảnh */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            width: { xs: '100%', md: 'auto' },
            px: { xs: 2, md: 4 },
            py: { xs: 8, md: 12 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 4 },
            alignItems: 'flex-start',
            maxWidth: { xs: '100%', md: '600px' },
            height: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Tiêu đề: Thông tin sản phẩm */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: bronzeYellow,
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              <SplitText
                text="Thông tin sản phẩm"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Lô sản xuất */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              <SplitText
                text="Lô sản xuất : BBS-02"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Ngày sản xuất */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              <SplitText
                text="Ngày sản xuất : 25/09/2025"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Hạn dùng */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              <SplitText
                text="Hạn dùng : 25/03/2027"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Dung tích */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              <SplitText
                text="Dung tích: 500ML/1000ML"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Chứng nhận & tiêu chuẩn */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              <SplitText
                text="Chứng nhận & tiêu chuẩn:"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
            <Box
              component="img"
              src={chungnhan}
              alt="Chứng nhận & tiêu chuẩn"
              sx={{
                width: 'auto',
                height: { xs: '150px', md: '200px' },
                maxWidth: '100%',
                display: 'block',
                mt: 2,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Section 3: Địa điểm - Full màn hình */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Text: Địa điểm trồng */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 30 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            width: '100%',
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'VNM Sans Display', sans-serif",
              fontWeight: 700,
              color: bronzeYellow,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Điểm trồng: "Nông trại Quảng Trị"
          </Typography>
        </Box>

        {/* Text overlay - Thông tin nông trại */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,
            width: { xs: '100%', md: 'auto' },
            px: { xs: 2, md: 4 },
            py: { xs: 8, md: 12 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 4 },
            alignItems: 'flex-start',
            maxWidth: { xs: '100%', md: 'none' },
            width: { xs: '100%', md: 'max-content' },
            height: '100%',
            justifyContent: 'center',
            mt: { xs: 8, md: '135px' },
            ml: { xs: 2, md: '502px' },
          }}
        >
          {/* Thông tin nông trại */}
          <Box sx={{ width: 'max-content' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              <SplitText
                text="Thông tin nông trại: Hanuti Việt Nam"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Tên hộ gia đình/hợp tác xã cung cấp */}
          <Box sx={{ width: 'max-content' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              <SplitText
                text="Tên hộ gia đình/hợp tác xã cung cấp: Hanuti"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Quy trình */}
          <Box sx={{ width: 'max-content' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              <SplitText
                text="Quy trình: VietGAP, phơi - sàng - làm sạch hoàn toàn thủ công"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>
        </Box>

        <Box
          component="img"
          src={diadiem}
          alt="Địa điểm"
          sx={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      {/* Section 3b: Địa điểm 2 - Full màn hình */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Text: Địa điểm trồng */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 30 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            width: '100%',
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'VNM Sans Display', sans-serif",
              fontWeight: 700,
              color: bronzeYellow,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Điểm trồng: "Nông trại Đắk Lắk"
          </Typography>
        </Box>

        {/* Text overlay - Thông tin nông trại */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,
            width: { xs: '100%', md: 'auto' },
            px: { xs: 2, md: 4 },
            py: { xs: 8, md: 12 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 4 },
            alignItems: 'flex-start',
            maxWidth: { xs: '100%', md: 'none' },
            width: { xs: '100%', md: 'max-content' },
            height: '100%',
            justifyContent: 'center',
            mt: { xs: 8, md: '135px' },
            ml: { xs: 2, md: '502px' },
          }}
        >
          {/* Thông tin nông trại */}
          <Box sx={{ width: 'max-content' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              <SplitText
                text="Thông tin nông trại: Họp Tác Xã Giảm Nghèo Ea Sup"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Tên hộ gia đình/hợp tác xã cung cấp */}
          <Box sx={{ width: 'max-content' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              <SplitText
                text="Tên hộ gia đình/hợp tác xã cung cấp: Ông Nguyễn Thanh Lộc"
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>

          {/* Quy trình */}
          <Box sx={{ width: 'max-content' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'VNM Sans Std', sans-serif",
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 1,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              <SplitText
                text="Quy trình: Hữu cơ, đạt tiêu chuẩn JAS, không sử dụng thuốc trừ sâu."
                delay={50}
                duration={0.6}
                ease="ease-out"
                splitType="chars"
                from={{ opacity: 0, y: -50 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </Typography>
          </Box>
        </Box>

        <Box
          component="img"
          src={diadiem2}
          alt="Địa điểm 2"
          sx={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      {/* Section 4: Quy trình sản xuất */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          px: { xs: 2, md: 4 },
          py: { xs: 8, md: 12 },
          backgroundColor: '#FDFCF5',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            position: 'relative',
          }}
        >
          {/* Đường thẳng nối tất cả các giai đoạn */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: '20px', md: '30px' },
              top: { xs: '30px', md: '30px' },
              bottom: { xs: '30px', md: '30px' },
              width: '2px',
              backgroundColor: bronzeYellow,
              zIndex: 1,
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 4, md: 6 },
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Title: MÈ ĐEN */}
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                color: bronzeYellow,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                mb: 2,
                textAlign: 'center',
              }}
            >
              MÈ ĐEN
            </Typography>

            {/* Giai đoạn 1: Thu hoạch */}
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, md: 4 },
                alignItems: 'flex-start',
              }}
            >
              {/* Số giai đoạn */}
              <Box
                sx={{
                  width: { xs: '40px', md: '60px' },
                  height: { xs: '40px', md: '60px' },
                  borderRadius: '50%',
                  backgroundColor: bronzeYellow,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '1.2rem', md: '1.8rem' },
                  fontWeight: 700,
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                1
              </Box>

            {/* Nội dung */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 2,
                }}
              >
                Giai đoạn 1: Thu hoạch
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 18/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Nguyên liệu:</strong> Mè đen hữu cơ
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Người thu hoạch:</strong> Nguyễn Thị Sáu
                </Typography>
                <Box
                  component="img"
                  src={nguoithuhoach1}
                  alt="Người thu hoạch"
                  sx={{
                    width: 'auto',                   
                    maxWidth: '25%',
                    display: 'block',
                    mt: 2,
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Giai đoạn 2: Sơ chế */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 4 },
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: { xs: '40px', md: '60px' },
                height: { xs: '40px', md: '60px' },
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 700,
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              2
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 2,
                }}
              >
                Giai đoạn 2: Sơ chế
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 23/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Làm sạch:</strong> Mè đen được rửa sạch, bóc vỏ bằng máy làm sạch và bóc vỏ chuyên dụng. Sau đó, hạt mè được phơi khô dưới ánh nắng để đạt chuẩn độ ẩm.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Kiểm tra Vi sinh:</strong> Mẫu mè đen được kiểm tra nghiêm ngặt trước khi ép để đảm bảo không có mầm bệnh, đặc biệt là vi khuẩn và nấm mốc.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Giai đoạn 3: Ép lạnh */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 4 },
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: { xs: '40px', md: '60px' },
                height: { xs: '40px', md: '60px' },
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 700,
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              3
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 2,
                }}
              >
                Giai đoạn 3: Ép lạnh ≤ 49°C
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 25/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Máy Ép:</strong> Máy ép thủy lực Model: GM 200 HF, Tốc độ ép: 25 kg/5phút.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Lợi ích:</strong> Phương pháp này giữ lại Sesamin (chất chống oxy hóa mạnh), Vitamin E, và các khoáng chất. Dầu thu được là Virgin Oil (nguyên chất, chưa tinh chế), có hương thơm đặc trưng, đậm đà, không bị cháy dầu/mất chất do nhiệt.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Giai đoạn 4: Lọc – Đóng chai – Niêm phong */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 4 },
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: { xs: '40px', md: '60px' },
                height: { xs: '40px', md: '60px' },
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 700,
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              4
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 2,
                }}
              >
                Giai đoạn 4: Lọc – Đóng chai – Niêm phong
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 25/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Lọc:</strong> Máy lọc dầu Model: GM 300 OF, Tốc độ lọc: 15 Lít/giờ.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Dây chuyền Đóng Chai Khép kín:</strong> Đảm bảo vệ sinh an toàn thực phẩm theo tiêu chuẩn ISO 22000.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Mã Lô & Truy Xuất:</strong> Mã Lô 25092025-BSM
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Phần 4: Bảng kiểm định chất lượng */}
          <Box sx={{ mt: { xs: 4, md: 6 } }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                color: bronzeYellow,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                mb: 3,
                textAlign: 'center',
              }}
            >
                    Bảng kiểm định chất lượng (Quality & Safety Sheet)
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                color: '#666',
                fontStyle: 'italic',
                mb: 3,
                fontFamily: "'VNM Sans Std', sans-serif",
              }}
            >
            </Typography>

            {/* Card kiểm định */}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                p: { xs: 2, md: 3 },
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: `2px solid ${bronzeYellow}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  mb: 2,
                }}
              >
                Bảng kiểm định chất lượng
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                {[
                  'Kiểm định vi sinh: đạt/không phát hiện',
                  'Kim loại nặng: trong ngưỡng an toàn',
                  'Độ acid (FFA): đạt chuẩn Codex',
                  'Chỉ số peroxit (PV): trong mức an toàn',
                  'Độ ẩm: < 0.2%',
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        sx={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
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

      {/* Section 5: Quy trình sản xuất CÁM GẠO */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          px: { xs: 2, md: 4 },
          py: { xs: 8, md: 12 },
          backgroundColor: '#FDFCF5',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            position: 'relative',
          }}
        >
          {/* Đường thẳng nối tất cả các giai đoạn */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: '20px', md: '30px' },
              top: { xs: '30px', md: '30px' },
              bottom: { xs: '30px', md: '30px' },
              width: '2px',
              backgroundColor: bronzeYellow,
              zIndex: 1,
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 4, md: 6 },
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Title: CÁM GẠO */}
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                color: bronzeYellow,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                mb: 2,
                textAlign: 'center',
              }}
            >
              CÁM GẠO
            </Typography>

            {/* Giai đoạn 1: Thu hoạch */}
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, md: 4 },
                alignItems: 'flex-start',
              }}
            >
              {/* Số giai đoạn */}
              <Box
                sx={{
                  width: { xs: '40px', md: '60px' },
                  height: { xs: '40px', md: '60px' },
                  borderRadius: '50%',
                  backgroundColor: bronzeYellow,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '1.2rem', md: '1.8rem' },
                  fontWeight: 700,
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                1
              </Box>

            {/* Nội dung */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 2,
                }}
              >
                Giai đoạn 1: Thu hoạch
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 17/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Nguyên liệu:</strong> Gạo ST25 Ngọc Nương
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Người thu hoạch:</strong> Tổ đội thu hoạch Hợp tác xã Giảm nghèo Ea Sup
                </Typography>
                <Box
                  component="img"
                  src={nguoithuhoach2}
                  alt="Người thu hoạch"
                  sx={{
                    width: 'auto',                   
                    maxWidth: '25%',
                    display: 'block',
                    mt: 2,
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Giai đoạn 2: Sơ chế */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 4 },
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: { xs: '40px', md: '60px' },
                height: { xs: '40px', md: '60px' },
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 700,
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              2
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 2,
                }}
              >
                Giai đoạn 2: Sơ chế
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 23/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Kiểm tra chất lượng:</strong> Cám gạo được tiếp nhận và kiểm tra cảm quan (màu, mùi), kiểm tra nhanh hàm lượng dầu/độ ẩm để đảm bảo nguyên liệu tươi mới.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Kiểm tra Vi sinh:</strong> Mẫu cám gạo được kiểm tra nghiêm ngặt trước khi ép để đảm bảo không có mầm bệnh, an toàn tuyệt đối.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Giai đoạn 3: Ép lạnh */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 4 },
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: { xs: '40px', md: '60px' },
                height: { xs: '40px', md: '60px' },
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 700,
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              3
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 2,
                }}
              >
                Giai đoạn 3: Ép lạnh ≤ 49°C
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 25/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Máy Ép:</strong> Máy ép thủy lực Model: GM 200 HF, Tốc độ ép: 25 kg/5phút.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Lợi ích:</strong> Phương pháp này giữ lại Gamma Oryzanol (hoạt chất chống oxy hóa mạnh, hỗ trợ giảm cholesterol), Vitamin E và Phytosterol. Dầu thu được là Virgin Oil (nguyên chất, chưa tinh chế), không bị cháy dầu/mất chất do nhiệt.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Giai đoạn 4: Lọc – Đóng chai – Niêm phong */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 4 },
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: { xs: '40px', md: '60px' },
                height: { xs: '40px', md: '60px' },
                borderRadius: '50%',
                backgroundColor: bronzeYellow,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 700,
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              4
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 2,
                }}
              >
                Giai đoạn 4: Lọc – Đóng chai – Niêm phong
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 25/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Lọc:</strong> Máy lọc dầu Model: GM 300 OF, Tốc độ lọc: 15 Lít/giờ.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Dây chuyền Đóng Chai Khép kín:</strong> Đảm bảo vệ sinh an toàn thực phẩm theo tiêu chuẩn ISO 22000.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Mã Lô & Truy Xuất:</strong> Mã Lô 25092025-RBR
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Phần 4: Bảng kiểm định chất lượng */}
          <Box sx={{ mt: { xs: 4, md: 6 } }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'VNM Sans Display', sans-serif",
                fontWeight: 700,
                color: bronzeYellow,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                mb: 3,
                textAlign: 'center',
              }}
            >
                    Bảng kiểm định chất lượng (Quality & Safety Sheet)
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                color: '#666',
                fontStyle: 'italic',
                mb: 3,
                fontFamily: "'VNM Sans Std', sans-serif",
              }}
            >
            </Typography>

            {/* Card kiểm định */}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                p: { xs: 2, md: 3 },
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: `2px solid ${bronzeYellow}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'VNM Sans Display', sans-serif",
                  fontWeight: 700,
                  color: bronzeYellow,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  mb: 2,
                }}
              >
                Bảng kiểm định chất lượng
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  lineHeight: 1.3,
                  fontFamily: "'VNM Sans Std', sans-serif",
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
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        sx={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
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
    </Box>
  );
}

export default QRProductDetailPage2;

