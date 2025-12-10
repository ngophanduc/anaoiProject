import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

const primaryColor = '#F7F3CD';
const bronzeYellow = '#667B00';
const americanYellow = '#EDB500';

// Mock blog data với content đầy đủ
const blogData = {
  1: {
    id: 1,
    title: 'Bí mật làn da khỏe từ thiên nhiên: 5 công dụng bất ngờ của dầu ép lạnh',
    category: 'Mẹo đẹp da',
    date: '15/12/2025',
    author: 'Chuyên gia dinh dưỡng Nguyễn Minh Anh',
    views: 1250,
    initialLikes: 89,
    content: `
# Giới thiệu

Dầu ép lạnh không chỉ là một loại dầu ăn thông thường mà còn là "bí quyết vàng" giúp làn da của bạn luôn khỏe mạnh, tươi trẻ từ bên trong. Hãy cùng khám phá 5 công dụng bất ngờ của dầu ép lạnh dành cho làn da.

## 1. Cấp ẩm sâu cho làn da khô

Dầu bơ ép lạnh giàu Vitamin E và các axit béo thiết yếu, giúp cấp ẩm sâu cho làn da khô. Chỉ cần thoa một lượng nhỏ dầu bơ lên da sau khi tắm, bạn sẽ cảm nhận được sự mềm mại và ẩm mượt ngay lập tức.

**Cách sử dụng:** Thoa 2-3 giọt dầu bơ AnaOi lên da mặt và massage nhẹ nhàng theo chuyển động tròn.

## 2. Chống lão hóa tự nhiên

Dầu ép lạnh chứa hàm lượng cao chất chống oxi hóa, giúp trung hòa các gốc tự do - nguyên nhân chính gây lão hóa da. Sử dụng dầu ép lạnh thường xuyên giúp giảm nếp nhăn và làm da săn chắc hơn.

## 3. Làm dịu da viêm và kích ứng

Với đặc tính chống viêm tự nhiên, dầu ép lạnh có thể làm dịu các tình trạng kích ứng da như mẩn đỏ, viêm da.

## 4. Tăng cường hàng rào bảo vệ da

Các axit béo omega trong dầu ép lạnh giúp củng cố hàng rào bảo vệ tự nhiên của da, ngăn ngừa mất nước và bảo vệ da khỏi tác động của môi trường.

## 5. Hỗ trợ điều trị mụn tự nhiên

Dầu ép lạnh không gây bít tắc lỗ chân lông và có đặc tính kháng khuẩn nhẹ, giúp kiểm soát mụn mà không làm khô da.

# Kết luận

Dầu ép lạnh AnaOi là giải pháp tự nhiên, an toàn và hiệu quả cho làn da khỏe đẹp. Hãy bắt đầu sử dụng ngay hôm nay để trải nghiệm những thay đổi tích cực!
    `,
  },
  2: {
    id: 2,
    title: 'Từ nông trại đến bàn ăn: Hành trình giọt dầu nguyên chất AnaOi',
    category: 'Mẹo đẹp dáng',
    date: '12/12/2025',
    author: 'Kỹ sư Trần Văn Hùng',
    views: 980,
    initialLikes: 67,
    content: `
# Hành trình của một giọt dầu

Mỗi giọt dầu AnaOi đều trải qua một hành trình đầy tâm huyết, từ những cánh đồng xanh mát của Tây Nguyên đến bàn ăn của hàng triệu gia đình Việt.

## Bước 1: Chọn nguồn nguyên liệu

Tất cả nguyên liệu của AnaOi đều được trồng theo tiêu chuẩn VietGAP tại Tây Nguyên, đảm bảo chất lượng từ gốc.

### Quy trình canh tác

- Không sử dụng thuốc trừ sâu độc hại
- Bón phân hữu cơ
- Tưới tiêu đúng kỹ thuật
- Thu hoạch đúng độ chín

## Bước 2: Quy trình ép lạnh

Công nghệ ép lạnh của AnaOi duy trì nhiệt độ dưới 60°C, giúp giữ trọn dưỡng chất và hương vị tự nhiên.

## Bước 3: Kiểm tra chất lượng

Mỗi mẻ dầu đều được kiểm tra nghiêm ngặt về:
- Độ tinh khiết
- Hàm lượng dinh dưỡng
- An toàn vệ sinh thực phẩm

## Bước 4: Đóng chai và phân phối

Dầu được đóng chai trong môi trường vô trùng và phân phối nhanh chóng đến tay người tiêu dùng.

# Cam kết của AnaOi

Chúng tôi cam kết mang đến những sản phẩm chất lượng cao nhất, minh bạch từ nguồn gốc đến người tiêu dùng.
    `,
  },
  3: {
    id: 3,
    title: 'Ăn lành - sống xanh: Cách kết hợp dầu ép vào bữa ăn hằng ngày',
    category: 'Mẹo đẹp da',
    date: '10/12/2025',
    author: 'Chuyên gia dinh dưỡng Lê Thị Mai',
    views: 1420,
    initialLikes: 103,
    content: `
# Lối sống xanh bắt đầu từ bữa ăn

Việc kết hợp dầu ép lạnh vào bữa ăn hằng ngày không chỉ giúp bạn có một chế độ ăn lành mạnh mà còn góp phần bảo vệ môi trường.

## 1. Salad với dầu ép lạnh

Thay vì sử dụng các loại sốt có sẵn, hãy tự làm sốt salad với dầu ép lạnh:

**Công thức cơ bản:**
- 3 thìa dầu bơ AnaOi
- 1 thìa giấm táo
- 1 thìa mật ong
- Muối, tiêu

## 2. Xào rau củ với dầu ép lạnh

Dầu ép lạnh có điểm khói cao, phù hợp cho việc xào ở nhiệt độ vừa phải.

## 3. Làm bánh với dầu thực vật

Thay thế bơ động vật bằng dầu ép lạnh trong các công thức làm bánh để giảm cholesterol xấu.

## 4. Nước sốt chấm

Tạo các loại nước sốt chấm độc đáo với dầu mè đen ép lạnh kết hợp với tỏi, ớt, chanh.

## 5. Smoothie dinh dưỡng

Thêm 1 thìa dầu bơ vào smoothie buổi sáng để tăng khả năng hấp thụ vitamin tan trong chất béo.

# Lợi ích kép

Khi bạn chọn dầu ép lạnh, bạn không chỉ chăm sóc sức khỏe mình mà còn ủng hộ nông nghiệp bền vững!
    `,
  },
  4: {
    id: 4,
    title: 'Bảo vệ trái tim khỏe mạnh: loại dầu ép lạnh tốt cho người bị tim mạch',
    category: 'Mẹo đẹp dáng',
    date: '08/12/2025',
    author: 'Bác sĩ Phạm Quốc Thắng',
    views: 2150,
    initialLikes: 156,
    content: `
# Sức khỏe tim mạch và vai trò của dầu ăn

Tim mạch là cơ quan quan trọng nhất trong cơ thể. Lựa chọn loại dầu ăn phù hợp có thể giúp bảo vệ và cải thiện sức khỏe tim mạch đáng kể.

## Tại sao dầu ép lạnh tốt cho tim mạch?

### 1. Giàu axit béo không bão hòa đơn (MUFA)

Dầu bơ ép lạnh chứa 70% MUFA, giúp:
- Giảm cholesterol xấu (LDL)
- Tăng cholesterol tốt (HDL)
- Giảm nguy cơ đột quỵ

### 2. Omega-3 từ dầu mè đen

Omega-3 trong dầu mè đen giúp:
- Chống viêm mạch máu
- Giảm huyết áp
- Ổn định nhịp tim

### 3. Vitamin E - chất chống oxi hóa

Vitamin E trong dầu ép lạnh bảo vệ tế bào khỏi tổn thương do stress 산화.

## Khuyến nghị sử dụng

**Liều lượng:** 2-3 thìa dầu ép lạnh/ngày

**Lưu ý:**
- Không nên đun sôi dầu ở nhiệt độ quá cao
- Bảo quản nơi tối, mát
- Sử dụng trong vòng 6 tháng sau khi mở nắp

## Lời khuyên từ bác sĩ

Kết hợp sử dụng dầu ép lạnh với chế độ ăn nhiều rau củ, trái cây và tập thể dục đều đặn để có một trái tim khỏe mạnh!
    `,
  },
  // Thêm các blog khác tương tự...
};

// Tạo mock data cho tất cả 16 blog (chỉ cần id, phần còn lại tương tự)
for (let i = 5; i <= 16; i++) {
  blogData[i] = {
    id: i,
    title: `Bài viết số ${i} - Nội dung đang được cập nhật`,
    category: 'Danh mục',
    date: `0${Math.floor(Math.random() * 10) + 1}/12/2025`,
    author: 'Tác giả AnaOi',
    views: Math.floor(Math.random() * 2000) + 500,
    initialLikes: Math.floor(Math.random() * 150) + 30,
    content: `
# Bài viết đang được cập nhật

Nội dung chi tiết của bài viết số ${i} sẽ được cập nhật sớm nhất. 

Cảm ơn bạn đã quan tâm đến AnaOi!
    `,
  };
}

function BlogDetailPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const blog = blogData[blogId];

  // Load like status from localStorage
  useEffect(() => {
    if (blog) {
      const savedLikes = localStorage.getItem(`blog_${blogId}_likes`);
      const isLiked = localStorage.getItem(`blog_${blogId}_liked`) === 'true';
      
      setLikeCount(savedLikes ? parseInt(savedLikes) : blog.initialLikes);
      setLiked(isLiked);
    }
  }, [blogId, blog]);

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = () => {
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
  }, [lastScrollY]);

  const handleLike = () => {
    if (!liked) {
      const newLikeCount = likeCount + 1;
      setLikeCount(newLikeCount);
      setLiked(true);
      localStorage.setItem(`blog_${blogId}_likes`, newLikeCount.toString());
      localStorage.setItem(`blog_${blogId}_liked`, 'true');
    } else {
      const newLikeCount = likeCount - 1;
      setLikeCount(newLikeCount);
      setLiked(false);
      localStorage.setItem(`blog_${blogId}_likes`, newLikeCount.toString());
      localStorage.setItem(`blog_${blogId}_liked`, 'false');
    }
  };

  if (!blog) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4">Không tìm thấy bài viết</Typography>
      </Box>
    );
  }

  // Parse markdown-style content
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      line = line.trim();
      
      if (!line) return <Box key={index} sx={{ height: 16 }} />;
      
      // Headings
      if (line.startsWith('# ')) {
        return (
          <Typography key={index} variant="h3" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 700, color: bronzeYellow, mt: 4, mb: 2 }}>
            {line.substring(2)}
          </Typography>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <Typography key={index} variant="h4" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 600, color: bronzeYellow, mt: 3, mb: 2 }}>
            {line.substring(3)}
          </Typography>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <Typography key={index} variant="h5" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 600, color: bronzeYellow, mt: 2, mb: 1.5 }}>
            {line.substring(4)}
          </Typography>
        );
      }
      
      // Bold text
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <Typography key={index} variant="body1" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 700, color: bronzeYellow, mb: 1 }}>
            {line.substring(2, line.length - 2)}
          </Typography>
        );
      }
      
      // List items
      if (line.startsWith('- ')) {
        return (
          <Box key={index} sx={{ display: 'flex', mb: 1, ml: 2 }}>
            <Typography sx={{ mr: 1, color: americanYellow }}>•</Typography>
            <Typography variant="body1" sx={{ fontFamily: "'VNM Sans Std', sans-serif", color: '#444', lineHeight: 1.8 }}>
              {line.substring(2)}
            </Typography>
          </Box>
        );
      }
      
      // Normal paragraph
      return (
        <Typography key={index} variant="body1" sx={{ fontFamily: "'VNM Sans Std', sans-serif", color: '#444', mb: 2, lineHeight: 1.8, textAlign: 'justify' }}>
          {line}
        </Typography>
      );
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FDFCF5' }}>
      <Header hidden={headerHidden} />

      <Container maxWidth="md" sx={{ pt: 12, pb: 8 }}>
        {/* Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            color: bronzeYellow,
            '&:hover': { backgroundColor: `${bronzeYellow}10` },
          }}
        >
          <ArrowBackIcon /> 
          <Typography sx={{ ml: 1, fontFamily: "'VNM Sans Std', sans-serif" }}>Quay lại</Typography>
        </IconButton>

        {/* Category Chip */}
        <Chip
          label={blog.category}
          sx={{
            backgroundColor: `${americanYellow}20`,
            color: bronzeYellow,
            fontFamily: "'VNM Sans Std', sans-serif",
            fontWeight: 600,
            mb: 2,
          }}
        />

        {/* Blog Title */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'VNM Sans Std', sans-serif",
            fontWeight: 700,
            color: bronzeYellow,
            mb: 3,
            lineHeight: 1.3,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          {blog.title}
        </Typography>

        {/* Meta Info */}
        <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: '#999' }} />
            <Typography variant="body2" sx={{ color: '#999', fontFamily: "'VNM Sans Std', sans-serif" }}>
              {blog.date}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <VisibilityIcon sx={{ fontSize: 18, color: '#999' }} />
            <Typography variant="body2" sx={{ color: '#999', fontFamily: "'VNM Sans Std', sans-serif" }}>
              {blog.views.toLocaleString()} lượt xem
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              onClick={handleLike}
              size="small"
              sx={{
                color: liked ? '#f44336' : '#999',
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#f44336',
                },
              }}
            >
              {liked ? <FavoriteIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
            </IconButton>
            <Typography variant="body2" sx={{ color: liked ? '#f44336' : '#999', fontFamily: "'VNM Sans Std', sans-serif", fontWeight: liked ? 600 : 400 }}>
              {likeCount.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Author */}
        <Typography variant="body2" sx={{ color: '#666', fontFamily: "'VNM Sans Std', sans-serif", fontStyle: 'italic', mb: 4 }}>
          Tác giả: {blog.author}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Blog Content */}
        <Box sx={{ '& img': { maxWidth: '100%', height: 'auto', borderRadius: 2, my: 3 } }}>
          {renderContent(blog.content)}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Like Section at Bottom */}
        <Box sx={{ textAlign: 'center', py: 4, backgroundColor: `${primaryColor}40`, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: "'VNM Sans Std', sans-serif", color: bronzeYellow, mb: 2 }}>
            Bạn thấy bài viết này hữu ích?
          </Typography>
          <IconButton
            onClick={handleLike}
            sx={{
              backgroundColor: liked ? '#f44336' : primaryColor,
              color: liked ? '#fff' : bronzeYellow,
              width: 60,
              height: 60,
              '&:hover': {
                backgroundColor: '#f44336',
                color: '#fff',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {liked ? <FavoriteIcon sx={{ fontSize: 32 }} /> : <FavoriteBorderIcon sx={{ fontSize: 32 }} />}
          </IconButton>
          <Typography variant="body1" sx={{ fontFamily: "'VNM Sans Std', sans-serif", color: '#666', mt: 1 }}>
            {likeCount} người đã thích bài viết này
          </Typography>
        </Box>
      </Container>

      <CartDrawer />
      <Footer />
    </Box>
  );
}

export default BlogDetailPage;

