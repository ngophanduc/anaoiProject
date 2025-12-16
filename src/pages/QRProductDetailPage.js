import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SplitText from '../components/SplitText';
import SixOSection from '../components/SixOSection';
import elementbrg from '../assets/nguongoc/sp1/elementbrg.png';
import chungnhan from '../assets/nguongoc/sp1/chungnhan.png';
import anhsanpham from '../assets/nguongoc/sp1/anhsanpham.png';
import diadiem from '../assets/nguongoc/sp1/diadiem.png';
import nguoithuhoach from '../assets/nguongoc/sp1/nguoithuhoach.png';

// Color scheme
const bronzeYellow = '#667B00';

function QRProductDetailPage() {
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
        <Box sx={{ textAlign: 'center', px: { xs: 2, sm: 3, md: 4 }, width: '100%' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: bronzeYellow,
              mb: { xs: 0.5, md: 1 },
              fontSize: { xs: '2rem', sm: '2.5rem', md: '4rem', lg: '5rem', xl: '6rem' },
              textAlign: 'center',
              display: 'block',
              lineHeight: { xs: 1.1, md: 1.2 },
              wordBreak: 'break-word',
            }}
          >
            <SplitText
              text="Dầu Bơ Ép Lạnh"
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
              fontSize: { xs: '0.9rem', sm: '1.2rem', md: '2rem', lg: '2.5rem', xl: '3.2rem' },
              textAlign: 'center',
              display: 'block',
              whiteSpace: { xs: 'normal', md: 'nowrap' },
              width: '100%',
              px: { xs: 1, md: 0 },
              lineHeight: { xs: 1.4, md: 1.5 },
              wordBreak: 'break-word',
            }}
          >
            <SplitText
              text="(Cold-Pressed Virgin Avocado Oil)"
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
          minHeight: { xs: 'auto', md: '100vh' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: { xs: '#FDFCF5', md: 'transparent' },
        }}
      >
        {/* Ảnh sản phẩm - Full kích thước, làm background trên desktop */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            top: { md: 0 },
            left: { md: 0 },
            width: '100%',
            height: { xs: 'auto', md: '100%' },
            minHeight: { xs: '50vh', md: '100vh' },
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            order: { xs: 2, md: 0 },
          }}
        >
          <Box
            component="img"
            src={anhsanpham}
            alt="Ảnh sản phẩm"
            sx={{
              width: 'auto',
              height: { xs: 'auto', md: '100%' },
              maxWidth: '100%',
              maxHeight: { xs: '60vh', md: '100%' },
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>

        {/* Text - Tách biệt trên mobile, overlay trên desktop */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            left: { md: 0 },
            top: { md: 0 },
            zIndex: 1,
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 4, sm: 6, md: 12 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, sm: 2.5, md: 4 },
            alignItems: { xs: 'flex-start', md: 'flex-start' },
            maxWidth: { xs: '100%', md: '600px' },
            height: { xs: 'auto', md: '100%' },
            justifyContent: { xs: 'flex-start', md: 'center' },
            boxSizing: 'border-box',
            order: { xs: 1, md: 0 },
            backgroundColor: { xs: '#FDFCF5', md: 'transparent' },
          }}
        >
          {/* Tiêu đề: Thông tin sản phẩm */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: bronzeYellow,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.3, md: 1.2 },
                wordBreak: 'break-word',
              }}
            >
              Thông tin sản phẩm
            </Typography>
          </Box>

          {/* Lô sản xuất */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.4, md: 1.2 },
                wordBreak: 'break-word',
              }}
            >
              Lô sản xuất : AVO-02
            </Typography>
          </Box>

          {/* Ngày sản xuất */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.4, md: 1.2 },
                wordBreak: 'break-word',
              }}
            >
              Ngày sản xuất : 20/09/2025
            </Typography>
          </Box>

          {/* Hạn dùng */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.4, md: 1.2 },
                wordBreak: 'break-word',
              }}
            >
              Hạn dùng : 20/03/2027
            </Typography>
          </Box>

          {/* Dung tích */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.4, md: 1.2 },
                wordBreak: 'break-word',
              }}
            >
              Dung tích : 100ML/250ML
            </Typography>
          </Box>

          {/* Chứng nhận & tiêu chuẩn */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.4, md: 1.2 },
                wordBreak: 'break-word',
              }}
            >
              Chứng nhận & tiêu chuẩn:
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
            top: { xs: 8, sm: 10, md: 30 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            width: '100%',
            px: { xs: 2, md: 0 },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: bronzeYellow,
              fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2.5rem', lg: '3rem' },
              lineHeight: { xs: 1.2, md: 1.3 },
              wordBreak: 'break-word',
              px: { xs: 1, md: 0 },
            }}
          >
            Địa điểm trồng "Nông trại Đắk Lắk"
          </Typography>
        </Box>

        {/* Text overlay - Thông tin nông trại */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 6, sm: 8, md: 12 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, sm: 2.5, md: 4 },
            alignItems: { xs: 'flex-start', md: 'flex-start' },
            height: '100%',
            justifyContent: 'center',
            mt: { xs: 6, sm: 7, md: '135px' },
            ml: { xs: 0, md: '502px' },
            boxSizing: 'border-box',
          }}
        >
          {/* Thông tin nông trại */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.4, md: 1.2 },
                whiteSpace: { xs: 'normal', md: 'nowrap' },
                wordBreak: 'break-word',
              }}
            >
              Thông tin nông trại: Hợp tác xã Bơ Đại Hùng.
            </Typography>
          </Box>

          {/* Tên hộ gia đình/hợp tác xã cung cấp */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.4, md: 1.2 },
                whiteSpace: { xs: 'normal', md: 'nowrap' },
                wordBreak: 'break-word',
              }}
            >
              Tên hộ gia đình/hợp tác xã cung cấp: Ông Đặng Huy Hùng.
            </Typography>
          </Box>

          {/* Quy trình */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem', lg: '2rem' },
                mb: { xs: 0.5, md: 1 },
                lineHeight: { xs: 1.4, md: 1.2 },
                whiteSpace: { xs: 'normal', md: 'nowrap' },
                wordBreak: 'break-word',
              }}
            >
              Quy trình: Hữu cơ, không sử dụng thuốc trừ sâu bị cấm.
            </Typography>
          </Box>
        </Box>

        <Box
          component="img"
          src={diadiem}
          alt="Địa điểm"
          sx={{
            width: '100%',
            height: { xs: 'auto', md: '100vh' },
            minHeight: { xs: '100vh', md: '100vh' },
            objectFit: { xs: 'contain', md: 'cover' },
            objectPosition: { xs: 'center', md: 'center' },
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
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 14/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Nguyên liệu:</strong> Bơ Booth
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Độ chín:</strong> chín vừa đạt chuẩn
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Người thu hoạch:</strong> Y Thuyên Niê
                </Typography>
              </Box>
              <Box
                component="img"
                src={nguoithuhoach}
                alt="Người thu hoạch"
                sx={{
                  width: 'auto',
                  height: { xs: '200px', md: '300px' },
                  maxWidth: '100%',
                  display: 'block',
                  mt: 2,
                }}
              />
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
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 18/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Làm sạch:</strong> Bơ được rửa sạch. Tiến hành gọt vỏ, bỏ hạt, và thái lát mỏng (khoảng 1cm).
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Sấy lạnh:</strong> Lát bơ được sấy lạnh trong buồng sấy kín dưới 25°C trong khoảng 48 giờ.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Kiểm tra Vi sinh:</strong> Mẫu bơ được kiểm tra nghiêm ngặt (theo tiêu chuẩn nội bộ) trước khi ép để đảm bảo không có mầm bệnh hoặc dư lượng thuốc BVTV.
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
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 20/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Máy Ép:</strong> Máy ép thủy lực Model: GM 200 HF, Tốc độ ép: 25 kg/5phút.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Lợi ích:</strong> Phương pháp này giữ trọn Vitamin E, A, D, Omega 9 và đặc biệt là Phytosterol (hỗ trợ tim mạch). Dầu thu được là Virgin Oil (nguyên chất, chưa tinh chế) với hương vị bơ tự nhiên, nhẹ nhàng, không bị cháy dầu/mất chất do nhiệt.
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
                  color: '#333',
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Ngày:</strong> 20/09/2025
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Lọc:</strong> Máy lọc dầu Model: GM 300 OF, Tốc độ lọc: 15 Lít/giờ.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Dây chuyền Đóng Chai Khép kín:</strong> Đảm bảo vệ sinh an toàn thực phẩm theo tiêu chuẩn ISO 22000.
                </Typography>
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  <strong>Mã Lô & Truy Xuất:</strong> Mã Lô 20092025-AVO
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Phần 4: Bảng kiểm định chất lượng */}
          <Box sx={{ mt: { xs: 4, md: 6 } }}>
            <Typography
              variant="h5"
              sx={{
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

      <SixOSection />
    </Box>
  );
}

export default QRProductDetailPage;
