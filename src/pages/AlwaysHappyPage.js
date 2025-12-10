import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import heroBackground from '../assets/alwayHappy/herobackground/hero.png';
import meodepda1 from '../assets/alwayHappy/meodepda/Ảnh 1.png';
import meodepda2 from '../assets/alwayHappy/meodepda/Ảnh 2.png';
import meodepda3 from '../assets/alwayHappy/meodepda/Ảnh 3.png';
import meodepda4 from '../assets/alwayHappy/meodepda/Ảnh 4.png';
import meomonngon1 from '../assets/alwayHappy/meomonngon/1.png';
import meomonngon2 from '../assets/alwayHappy/meomonngon/2.png';
import meomonngon3 from '../assets/alwayHappy/meomonngon/3.png';
import meomonngon4 from '../assets/alwayHappy/meomonngon/4.png';
import gocchuyengia1 from '../assets/alwayHappy/gocchuyengia/1.png';
import gocchuyengia2 from '../assets/alwayHappy/gocchuyengia/2.png';
import gocchuyengia3 from '../assets/alwayHappy/gocchuyengia/3.png';
import gocchuyengia4 from '../assets/alwayHappy/gocchuyengia/4.png';
import congnghedotpha1 from '../assets/alwayHappy/congnghedotpha/1.png';
import congnghedotpha2 from '../assets/alwayHappy/congnghedotpha/2.png';
import congnghedotpha3 from '../assets/alwayHappy/congnghedotpha/3.png';
import congnghedotpha4 from '../assets/alwayHappy/congnghedotpha/4.png';

const primaryColor = '#F7F3CD';
const bronzeYellow = '#667B00';
const americanYellow = '#EDB500';

const meoDepdaBlogs = [
  {
    id: 1,
    image: meodepda1,
    title: 'Bí mật làn da khỏe từ thiên nhiên: 5 công dụng bất ngờ của dầu ép lạnh',
    date: '15/12/2025',
    category: 'Mẹo đẹp da',
  },
  {
    id: 2,
    image: meodepda2,
    title: 'Từ nông trại đến bàn ăn: Hành trình giọt dầu nguyên chất AnaOi',
    date: '12/12/2025',
    category: 'Mẹo đẹp dáng',
  },
  {
    id: 3,
    image: meodepda3,
    title: 'Ăn lành - sống xanh: Cách kết hợp dầu ép vào bữa ăn hằng ngày',
    date: '10/12/2025',
    category: 'Mẹo đẹp da',
  },
  {
    id: 4,
    image: meodepda4,
    title: 'Bảo vệ trái tim khỏe mạnh: loại dầu ép lạnh tốt cho người bị tim mạch',
    date: '08/12/2025',
    category: 'Mẹo đẹp dáng',
  },
];

const meoMonNgonBlogs = [
  {
    id: 1,
    image: meomonngon1,
    title: 'Bánh xèo chay giòn rụm từ dầu ép lạnh – ngon nhẹ mà vẫn tròn vị',
    date: '14/12/2025',
    category: 'Mẹo món ngon',
  },
  {
    id: 2,
    image: meomonngon2,
    title: 'Salad dầu bơ AnaOi – bí quyết cho bữa ăn thanh mát và đủ chất',
    date: '11/12/2025',
    category: 'Mẹo món ngon',
  },
  {
    id: 3,
    image: meomonngon3,
    title: 'Sốt dầu hạt ăn kèm bánh mì nguyên cám – sáng tạo nhỏ, vị ngon lớn',
    date: '09/12/2025',
    category: 'Mẹo món ngon',
  },
  {
    id: 4,
    image: meomonngon4,
    title: 'Áp chảo cùng dầu ép lạnh – công thức "xanh" cho bữa cơm Việt',
    date: '07/12/2025',
    category: 'Mẹo món ngon',
  },
];

const gocChuyenGiaBlogs = [
  {
    id: 1,
    image: gocchuyengia1,
    title: '5 lợi ích vàng của dầu bơ ép lạnh – tốt cho tim mạch, da và hệ miễn dịch',
    date: '13/12/2025',
    category: 'Góc chuyên gia',
  },
  {
    id: 2,
    image: gocchuyengia2,
    title: 'Sức mạnh kết hợp: Dầu mè đen và cám gạo – bí quyết cho cơ thể khỏe từ bên trong',
    date: '10/12/2025',
    category: 'Góc chuyên gia',
  },
  {
    id: 3,
    image: gocchuyengia3,
    title: 'Bí quyết tăng cường đề kháng tự nhiên nhờ chất béo tốt trong dầu ép lạnh',
    date: '08/12/2025',
    category: 'Góc chuyên gia',
  },
  {
    id: 4,
    image: gocchuyengia4,
    title: 'Chuyên gia nói gì về dầu ép lạnh và dầu tinh luyện – đâu là lựa chọn tốt cho sức khỏe?',
    date: '06/12/2025',
    category: 'Góc chuyên gia',
  },
];

const congNgheDotPhaBlogs = [
  {
    id: 1,
    image: congnghedotpha1,
    title: 'Công nghệ ép lạnh tiên tiến - giữ trọn dưỡng chất từ nông sản Tây Nguyên',
    date: '12/12/2025',
    category: 'Công nghệ đột phá',
  },
  {
    id: 2,
    image: congnghedotpha2,
    title: 'Công nghệ truy xuất nguồn gốc thông minh - minh bạch hành trình từ nông trại đến bàn ăn',
    date: '09/12/2025',
    category: 'Công nghệ đột phá',
  },
  {
    id: 3,
    image: congnghedotpha3,
    title: 'Chuẩn hóa quy trình ép lạnh AnaOi: kiểm soát nhiệt độ, đảm bảo tinh khiết từng giọt dầu',
    date: '07/12/2025',
    category: 'Công nghệ đột phá',
  },
  {
    id: 4,
    image: congnghedotpha4,
    title: 'Đổi mới trong từng giọt dầu: cách AnaOi kết hợp công nghệ và thiên nhiên để tạo nên chất lượng vượt trội',
    date: '05/12/2025',
    category: 'Công nghệ đột phá',
  },
];

function AlwaysHappyPage() {
  const navigate = useNavigate();
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & passed threshold -> hide header
        setHeaderHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show header
        setHeaderHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FDFCF5',
      }}
    >
      <Header hidden={headerHidden} />

      {/* Hero Section with Background */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '70vh', md: '85vh' },
          width: '100%',
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mt: 8,
        }}
      />

      {/* Mẹo đẹp da - đẹp dáng Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Section Heading */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'VNM Sans Std', sans-serif",
            fontWeight: 700,
            color: bronzeYellow,
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Mẹo đẹp da - đẹp dáng
        </Typography>

        {/* Blog Cards Grid */}
        <Grid container spacing={3}>
          {meoDepdaBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={3} key={blog.id}>
              <Card
                onClick={() => navigate(`/blog/${blog.id}`)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  },
                }}
              >
                {/* Blog Image */}
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt={blog.title}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                  }}
                />

                {/* Blog Content */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                  }}
                >
                  {/* Category Chip */}
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{
                      backgroundColor: `${americanYellow}20`,
                      color: bronzeYellow,
                      fontFamily: "'VNM Sans Std', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      alignSelf: 'flex-start',
                      mb: 2,
                    }}
                  />

                  {/* Blog Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'VNM Sans Std', sans-serif",
                      fontWeight: 600,
                      color: bronzeYellow,
                      mb: 2,
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      flexGrow: 1,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {blog.title}
                  </Typography>

                  {/* Blog Date */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'VNM Sans Std', sans-serif",
                      color: '#999',
                      fontSize: '0.875rem',
                    }}
                  >
                    {blog.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mẹo món ngon Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Section Heading */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'VNM Sans Std', sans-serif",
            fontWeight: 700,
            color: bronzeYellow,
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Mẹo món ngon
        </Typography>

        {/* Blog Cards Grid */}
        <Grid container spacing={3}>
          {meoMonNgonBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={3} key={blog.id}>
              <Card
                onClick={() => navigate(`/blog/${blog.id}`)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  },
                }}
              >
                {/* Blog Image */}
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt={blog.title}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                  }}
                />

                {/* Blog Content */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                  }}
                >
                  {/* Category Chip */}
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{
                      backgroundColor: `${americanYellow}20`,
                      color: bronzeYellow,
                      fontFamily: "'VNM Sans Std', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      alignSelf: 'flex-start',
                      mb: 2,
                    }}
                  />

                  {/* Blog Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'VNM Sans Std', sans-serif",
                      fontWeight: 600,
                      color: bronzeYellow,
                      mb: 2,
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      flexGrow: 1,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {blog.title}
                  </Typography>

                  {/* Blog Date */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'VNM Sans Std', sans-serif",
                      color: '#999',
                      fontSize: '0.875rem',
                    }}
                  >
                    {blog.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Góc chuyên gia Section */}
      <Container maxWidth="xl" sx={{ py: 8, backgroundColor: `${primaryColor}40` }}>
        {/* Section Heading */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'VNM Sans Std', sans-serif",
            fontWeight: 700,
            color: bronzeYellow,
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Góc chuyên gia
        </Typography>

        {/* Blog Cards Grid */}
        <Grid container spacing={3}>
          {gocChuyenGiaBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={3} key={blog.id}>
              <Card
                onClick={() => navigate(`/blog/${blog.id}`)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  },
                }}
              >
                {/* Blog Image */}
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt={blog.title}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                  }}
                />

                {/* Blog Content */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                  }}
                >
                  {/* Category Chip */}
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{
                      backgroundColor: `${americanYellow}20`,
                      color: bronzeYellow,
                      fontFamily: "'VNM Sans Std', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      alignSelf: 'flex-start',
                      mb: 2,
                    }}
                  />

                  {/* Blog Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'VNM Sans Std', sans-serif",
                      fontWeight: 600,
                      color: bronzeYellow,
                      mb: 2,
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      flexGrow: 1,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {blog.title}
                  </Typography>

                  {/* Blog Date */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'VNM Sans Std', sans-serif",
                      color: '#999',
                      fontSize: '0.875rem',
                    }}
                  >
                    {blog.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Công nghệ đột phá Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Section Heading */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'VNM Sans Std', sans-serif",
            fontWeight: 700,
            color: bronzeYellow,
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Công nghệ đột phá
        </Typography>

        {/* Blog Cards Grid */}
        <Grid container spacing={3}>
          {congNgheDotPhaBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={3} key={blog.id}>
              <Card
                onClick={() => navigate(`/blog/${blog.id}`)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  },
                }}
              >
                {/* Blog Image */}
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt={blog.title}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                  }}
                />

                {/* Blog Content */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                  }}
                >
                  {/* Category Chip */}
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{
                      backgroundColor: `${americanYellow}20`,
                      color: bronzeYellow,
                      fontFamily: "'VNM Sans Std', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      alignSelf: 'flex-start',
                      mb: 2,
                    }}
                  />

                  {/* Blog Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'VNM Sans Std', sans-serif",
                      fontWeight: 600,
                      color: bronzeYellow,
                      mb: 2,
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      flexGrow: 1,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {blog.title}
                  </Typography>

                  {/* Blog Date */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'VNM Sans Std', sans-serif",
                      color: '#999',
                      fontSize: '0.875rem',
                    }}
                  >
                    {blog.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <CartDrawer />
      <Footer />
    </Box>
  );
}

export default AlwaysHappyPage;

