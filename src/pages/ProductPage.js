import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  Fade,
  Dialog,
  DialogContent,
  Button,
  Avatar,
  Rating,
  Divider,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

// Import product images
import sp1_100ml from '../assets/product/sp1_100ml.png';
import sp1_250ml from '../assets/product/sp1_250ml.png';
import sp1_image1 from '../assets/product/sp1_image1.png';
import sp1_image2 from '../assets/product/sp1_image2.png';
import sp2_500ml from '../assets/product/sp2_500ml.png';
import sp2_1l from '../assets/product/sp2_1l.png';
import sp2_image1 from '../assets/product/sp2_image1.png';
import sp2_image2 from '../assets/product/sp2_image2.png';
import sp3_500ml from '../assets/product/sp3_500ml.png';
import sp3_1l from '../assets/product/sp3_1l.png';
import sp3_image1 from '../assets/product/sp3_image1.png';
import sp3_image2 from '../assets/product/sp3_image2.png';
import sp4_500ml from '../assets/product/sp4_500ml.png';
import sp4_1l from '../assets/product/sp4_1l.png';
import sp4_image1 from '../assets/product/sp4_image1.png';
import sp4_image2 from '../assets/product/sp4_image2.png';
import daubofeedback from '../assets/daubofeedback.jpg';
import daubofeedback2 from '../assets/daubofeedback2.jpg';
import daunanhfeedback from '../assets/daunanhfeedback.jpg';
import daulacfeedback1 from '../assets/daulacfeedback1.jpg';
import daulacfeedback2 from '../assets/daulacfeedback2.jpg';
import medenfeedback from '../assets/medenfeedback.jpg';

// Color scheme
const primaryColor = '#F7F3CD';
const bronzeYellow = '#667B00';
const americanYellow = '#EDB500';

const products = [
  {
    id: 1,
    name: 'Dầu bơ ép lạnh AnaOi',
    category: null,
    description: 'Dầu bơ ép lạnh 100% nguyên chất từ những quả bơ trồng organic trên vùng đất bazan Dak Lak, giữ trọn vitamin E và omega tự nhiên.',
    fullDescription: 'Dầu bơ ép lạnh 100% nguyên chất từ những quả bơ trồng organic trên vùng đất bazan Dak Lak. Nhờ phương pháp ép lạnh, dầu giữ trọn vitamin E, omega và chất chống oxy hóa tự nhiên, mang hương vị thanh nhẹ, giúp món ăn thơm ngon và lành mạnh hơn mỗi ngày.',
    sizes: ['100ml', '250ml'],
    images: {
      '100ml': sp1_100ml,
      '250ml': sp1_250ml,
    },
    additionalImages: [sp1_image1, sp1_image2],
    prices: {
      '100ml': 120000,
      '250ml': 490000,
    },
  },
  {
    id: 2,
    name: 'Dầu lạc ép lạnh AnaOi',
    category: null,
    description: 'Từ những hạt lạc được canh tác chuẩn VietGap trên cao nguyên Tây Nguyên, dầu lạc AnaOi được ép lạnh hoàn toàn để giữ trọn hương vị.',
    fullDescription: 'Từ những hạt lạc được canh tác chuẩn VietGap trên cao nguyên Tây Nguyên, dầu lạc AnaOi được ép lạnh hoàn toàn để giữ trọn hương thơm tự nhiên và hàm lượng chất béo tốt. Dầu có vị béo dịu, dễ tiêu hóa, mang đến nguồn năng lượng thuần khiết và phù hợp cho các món chiên, xào và bữa ăn gia đình hàng ngày.',
    sizes: ['500ml', '1l'],
    images: {
      '500ml': sp2_500ml,
      '1l': sp2_1l,
    },
    additionalImages: [sp2_image1, sp2_image2],
    prices: {
      '500ml': 169000,
      '1l': 335000,
    },
  },
  {
    id: 3,
    name: 'Dầu blend đậu nành & cám gạo ép lạnh AnaOi',
    category: 'Dầu blend',
    description: 'Là một trong những dầu blend ép lạnh đầu tiên tại Việt Nam, kết hợp tinh tế giữa đậu nành và cám gạo từ cao nguyên Tây Nguyên.',
    fullDescription: 'Là một trong những dầu blend ép lạnh đầu tiên tại Việt Nam, sản phẩm kết hợp tinh tế giữa đậu nành và cám gạo được canh tác trên cao nguyên Tây Nguyên. Nhờ công nghệ ép lạnh, từng giọt dầu giữ trọn gamma-oryzanol, vitamin nhóm B và dưỡng chất tự nhiên. Kết cấu nhẹ, ít bám dính, giúp món ăn thanh hơn mà vẫn đậm vị. Đây là lựa chọn lý tưởng cho chế độ ăn lành mạnh, hỗ trợ tim mạch và kiểm soát cholesterol mỗi ngày.',
    sizes: ['500ml', '1l'],
    images: {
      '500ml': sp3_500ml,
      '1l': sp3_1l,
    },
    additionalImages: [sp3_image1, sp3_image2],
    prices: {
      '500ml': 199000,
      '1l': 390000,
    },
  },
  {
    id: 4,
    name: 'Dầu blend mè đen & cám gạo ép lạnh AnaOi',
    category: 'Dầu blend',
    description: 'Dầu blend ép lạnh đầu tiên tại Việt Nam chứa các chất dinh dưỡng vượt trội, kết hợp giữa mè đen và cám gạo từ cao nguyên Tây Nguyên.',
    fullDescription: 'Dầu blend ép lạnh đầu tiên tại Việt Nam chứa các chất dinh dưỡng vượt trội, kết hợp giữa mè đen và cám gạo được canh tác trên cao nguyên Tây Nguyên. Từng giọt dầu được ép lạnh ở nhiệt độ thấp để giữ nguyên gamma-oryzanol, vitamin nhóm B và các hợp chất chống oxy hoá tự nhiên. Kết cấu nhẹ, ít bám dính giúp món ăn thanh hơn mà vẫn tròn vị, đồng thời hỗ trợ tim mạch, kiểm soát cholesterol và phù hợp cho chế độ ăn lành mạnh mỗi ngày.',
    sizes: ['500ml', '1l'],
    images: {
      '500ml': sp4_500ml,
      '1l': sp4_1l,
    },
    additionalImages: [sp4_image1, sp4_image2],
    prices: {
      '500ml': 200000,
      '1l': 390000,
    },
  },
];

// Mock reviews data cho từng sản phẩm
const productReviews = {
  1: [
    {
      id: 5,
      userName: 'Lê Văn Minh',
      avatar: 'M',
      rating: 5,
      date: '28/11/2025',
      comment: ' Sản phẩm chất lượng cao, đóng gói đẹp. Highly recommended!',
      image: daubofeedback2,
    },
    {
      id: 4,
      userName: 'Phạm Văn Đức',
      avatar: 'Đ',
      rating: 5,
      date: '25/11/2025',
      comment: 'Dầu bơ AnaOi chất lượng thật sự! Mình đã dùng được 3 tháng để nấu ăn, mùi vị thơm ngon tự nhiên. Sản phẩm đóng gói đẹp, chai thủy tinh tối màu bảo vệ tốt. Rất hài lòng!',
      image: daubofeedback,
    },
    {
      id: 1,
      userName: 'Nguyễn Thị Hương',
      avatar: 'H',
      rating: 5,
      date: '20/11/2025',
      comment: 'Dầu bơ rất thơm và nguyên chất, dùng để nấu ăn và trộn salad rất tốt. Gia đình tôi đã dùng được 2 tháng và rất hài lòng với chất lượng!',
    },
    {
      id: 2,
      userName: 'Trần Minh Tuấn',
      avatar: 'T',
      rating: 5,
      date: '18/11/2025',
      comment: 'Chất lượng tuyệt vời! Mùi vị tự nhiên, không bị tanh. Dùng để nấu ăn hoặc trộn salad đều rất ngon.',
    },
    {
      id: 3,
      userName: 'Lê Thị Mai',
      avatar: 'M',
      rating: 4,
      date: '15/11/2025',
      comment: 'Sản phẩm tốt, đóng gói cẩn thận. Giá hơi cao một chút nhưng chất lượng xứng đáng.',
    },
  ],
  2: [
    {
      id: 4,
      userName: 'Thanh Nga',
      avatar: 'L',
      rating: 5,
      date: '27/11/2025',
      comment: 'Đã dùng được 1 thời gian và cảm thấy sản phẩm rất tuyệt vời, sẽ quay lại ủng hộ thêm',
      image: daulacfeedback1,
    },
    {
      id: 1,
      userName: 'Phạm Văn Hùng',
      avatar: 'H',
      rating: 5,
      date: '22/11/2025',
      comment: 'Dầu lạc thơm ngon tự nhiên, không hề có mùi tanh. Dùng nấu cơm, xào rau đều rất hợp. Sẽ ủng hộ lâu dài!',
    },
    {
      id: 2,
      userName: 'Võ Thị Lan',
      avatar: 'L',
      rating: 5,
      date: '19/11/2025',
      comment: 'Chất lượng cao, giá cả hợp lý. Cả nhà đều thích dùng dầu này, đặc biệt là món gỏi củ hũ dừa.',
    },
    {
      id: 3,
      userName: 'Hoàng Minh Đức',
      avatar: 'D',
      rating: 4,
      date: '17/11/2025',
      comment: 'Sản phẩm tốt, mùi vị đặc trưng của lạc. Chai 1L rất tiện dụng cho gia đình.',
    },
    {
      id: 5,
      userName: 'Trần Thị Hoa',
      avatar: 'H',
      rating: 5,
      date: '29/11/2025',
      comment: 'Dầu lạc ép lạnh AnaOi rất tốt! Mình dùng để nấu ăn hàng ngày, mùi vị thơm ngon tự nhiên. Sản phẩm đóng gói cẩn thận, chất lượng đảm bảo. Sẽ tiếp tục ủng hộ!',
      image: daulacfeedback2,
    },
  ],
  3: [
    {
      id: 4,
      userName: 'Trần Văn Hùng',
      avatar: 'H',
      rating: 5,
      date: '26/11/2025',
      comment: 'Dầu blend đậu nành & cám gạo AnaOi thật sự tuyệt vời! Mình dùng để nấu ăn hàng ngày, mùi vị thơm ngon tự nhiên. Sản phẩm đóng gói chuyên nghiệp, chất lượng cao. Rất đáng mua!',
      image: daunanhfeedback,
    },
    {
      id: 1,
      userName: 'Đặng Thu Hà',
      avatar: 'H',
      rating: 5,
      date: '21/11/2025',
      comment: 'Dầu blend này rất đặc biệt! Vừa có chất béo tốt từ đậu nành, vừa có dưỡng chất từ cám gạo. Dùng nấu ăn rất thơm!',
    },
    {
      id: 2,
      userName: 'Bùi Văn Nam',
      avatar: 'N',
      rating: 5,
      date: '16/11/2025',
      comment: 'Là người bị tim mạch nên tôi rất chú ý đến loại dầu ăn. Dầu blend này của AnaOi giúp tôi yên tâm hơn rất nhiều.',
    },
    {
      id: 3,
      userName: 'Ngô Thị Phương',
      avatar: 'P',
      rating: 4,
      date: '14/11/2025',
      comment: 'Sản phẩm độc đáo, chất lượng tốt. Hơi khó tìm mua nhưng đáng để thử!',
    },
  ],
  4: [
    {
      id: 4,
      userName: 'Nguyễn Văn Tuấn',
      avatar: 'T',
      rating: 5,
      date: '30/11/2025',
      comment: 'Dầu blend mè đen & cám gạo AnaOi thật sự tuyệt vời! Mình dùng để nấu ăn và chấm, mùi vị thơm ngon đặc trưng. Sản phẩm chất lượng cao, đóng gói đẹp. Rất hài lòng!',
      image: medenfeedback,
    },
    {
      id: 1,
      userName: 'Trương Thị Kim',
      avatar: 'K',
      rating: 5,
      date: '23/11/2025',
      comment: 'Dầu mè đen kết hợp cám gạo là combo hoàn hảo! Vị thơm đặc trưng của mè, bổ dưỡng cho cả gia đình.',
    },
    {
      id: 2,
      userName: 'Lý Quốc Bảo',
      avatar: 'B',
      rating: 5,
      date: '20/11/2025',
      comment: 'Tôi dùng để chấm các món ăn chay, vô cùng tuyệt vời. Mùi mè đen rất thơm và tự nhiên.',
    },
    {
      id: 3,
      userName: 'Phan Thị Hồng',
      avatar: 'H',
      rating: 5,
      date: '18/11/2025',
      comment: 'Chất lượng xuất sắc! Dùng để làm món canh chua hoặc kho thịt đều rất ngon. Highly recommended!',
    },
  ],
};

function ProductPage() {
  const location = useLocation();
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState('');
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // State để lưu dung tích được chọn cho mỗi sản phẩm (mặc định là dung tích đầu tiên - nhỏ nhất)
  const [selectedSizes, setSelectedSizes] = useState({
    1: '100ml',
    2: '500ml',
    3: '500ml',
    4: '500ml',
  });

  // State cho modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalSize, setModalSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = (product, size, qty) => {
    addToCart(product, size, qty);
    setAddedProduct(product.name);
    setSnackbarOpen(true);
    setModalOpen(false);
    setQuantity(1);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalSize(product.sizes[0]); // Set dung tích đầu tiên
    setQuantity(1);
    setSelectedImageIndex(0); // Reset về ảnh đầu tiên
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedImageIndex(0);
  };

  const handleModalSizeChange = (size) => {
    setModalSize(size);
    setSelectedImageIndex(0); // Reset về ảnh chính khi đổi size
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

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

  // Auto-open modal if productId is passed via navigation state
  useEffect(() => {
    if (location.state?.openProductId) {
      const productId = location.state.openProductId;
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setModalSize(product.sizes[0]);
        setQuantity(1);
        setModalOpen(true);
        // Clear state to prevent reopening on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FDFCF5',
      }}
    >
      <Header hidden={headerHidden} />

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 8 },
          background: `linear-gradient(180deg, ${bronzeYellow}15 0%, #FDFCF5 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={800}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  textAlign: 'center',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Sản phẩm AnaOi
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: bronzeYellow,
                  textAlign: 'center',
                  maxWidth: 800,
                  mx: 'auto',
                  opacity: 0.8,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Dầu ép lạnh nguyên chất từ thiên nhiên Tây Nguyên
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Products Grid */}
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Fade in={true} timeout={600 + index * 100}>
                <Card
                  onClick={() => handleOpenModal(product)}
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
                  {/* Product Image */}
                  <Box
                    sx={{
                      position: 'relative',
                      paddingTop: '85%', // Giảm chiều cao ảnh
                      backgroundColor: primaryColor,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.images[selectedSizes[product.id]]}
                      alt={`${product.name} - ${selectedSizes[product.id]}`}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: 1,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                  </Box>

                  {/* Product Content */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Top Content */}
                    <Box>
                      {/* Product Name and Cart Icon */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: bronzeYellow,
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            lineHeight: 1.3,
                            flex: 1,
                            pr: 1,
                            fontFamily: "'VNM Sans Std', sans-serif",
                            height: (product.id === 1 || product.id === 2) ? '52px' : 'auto',
                            minHeight: (product.id === 1 || product.id === 2) ? '52px' : 'auto',
                          }}
                        >
                          {product.name}
                        </Typography>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product, selectedSizes[product.id], 1);
                          }}
                          sx={{
                            backgroundColor: americanYellow,
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: bronzeYellow,
                            },
                            width: 40,
                            height: 40,
                          }}
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Box>

                      {/* Category Label - Moved below product name */}
                      {product.category ? (
                        <Typography
                          variant="overline"
                          sx={{
                            color: americanYellow,
                            fontFamily: "'VNM Sans Display', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: 1,
                            mb: 2,
                            display: 'block',
                            lineHeight: 1.2,
                          }}
                        >
                          {product.category}
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            mb: 2,
                            height: 'calc(0.75rem * 1.2)',
                            minHeight: 'calc(0.75rem * 1.2)',
                            display: 'block',
                            fontFamily: "'VNM Sans Display', sans-serif",
                            fontSize: '0.75rem',
                            lineHeight: 1.2,
                            letterSpacing: 1,
                          }}
                        />
                      )}

                      {/* Product Description - Fixed height for consistency */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.7,
                          fontSize: { xs: '0.9rem', md: '1rem' },
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          height: { xs: '4.5rem', md: '5.1rem' },
                          mb: 0,
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 400,
                        }}
                      >
                        {product.description}
                      </Typography>
                    </Box>

                    {/* Product Sizes and Price - Always at Bottom */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mt: 2 
                      }}
                    >
                      {/* Sizes */}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {product.sizes.map((size) => {
                          const isSelected = selectedSizes[product.id] === size;
                          return (
                            <Chip
                              key={size}
                              label={size}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSizeChange(product.id, size);
                              }}
                              sx={{
                                backgroundColor: isSelected
                                  ? bronzeYellow
                                  : `${bronzeYellow}15`,
                                color: isSelected ? '#fff' : bronzeYellow,
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: isSelected
                                    ? bronzeYellow
                                    : `${bronzeYellow}25`,
                                  transform: 'scale(1.05)',
                                },
                              }}
                            />
                          );
                        })}
                      </Box>

                      {/* Price */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: americanYellow,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          whiteSpace: 'nowrap',
                          ml: 2,
                        }}
                      >
                        {product.prices[selectedSizes[product.id]].toLocaleString('vi-VN')}₫
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Product Detail Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxWidth: 900,
          },
        }}
      >
        {selectedProduct && (
          <DialogContent sx={{ p: 0, position: 'relative' }}>
            {/* Close Button */}
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 10,
                backgroundColor: 'rgba(255,255,255,0.9)',
                '&:hover': {
                  backgroundColor: '#fff',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Top Section: Product Image + Info */}
            <Grid container>
              {/* Left Side - Product Image */}
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Main Image */}
                  <Box
                    sx={{
                      flex: 1,
                      minHeight: 400,
                      backgroundColor: primaryColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4,
                      mb: 2,
                    }}
                  >
                    {(() => {
                      // Tạo mảng tất cả ảnh: ảnh chính theo size + ảnh bổ sung
                      const allImages = [
                        selectedProduct.images[modalSize],
                        ...(selectedProduct.additionalImages || []),
                      ];
                      const currentImage = allImages[selectedImageIndex] || allImages[0];
                      
                      return (
                        <img
                          src={currentImage}
                          alt={selectedProduct.name}
                          style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                          }}
                        />
                      );
                    })()}
                  </Box>
                  
                  {/* Image Gallery */}
                  {selectedProduct.additionalImages && selectedProduct.additionalImages.length > 0 && (
                    <Box sx={{ px: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: bronzeYellow,
                          mb: 1.5,
                          fontSize: '0.95rem',
                          fontFamily: "'VNM Sans Std', sans-serif",
                        }}
                      >
                        Ảnh liên quan
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1.5,
                          pb: 2,
                          overflowX: 'auto',
                          '&::-webkit-scrollbar': {
                            height: 6,
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `${bronzeYellow}40`,
                            borderRadius: 3,
                          },
                        }}
                      >
                      {/* Ảnh chính theo size */}
                      <Box
                        onClick={() => setSelectedImageIndex(0)}
                        sx={{
                          flexShrink: 0,
                          width: 80,
                          height: 80,
                          backgroundColor: primaryColor,
                          borderRadius: 1,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: selectedImageIndex === 0 ? `2px solid ${bronzeYellow}` : '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            border: `2px solid ${bronzeYellow}`,
                          },
                        }}
                      >
                        <img
                          src={selectedProduct.images[modalSize]}
                          alt={`${selectedProduct.name} - ${modalSize}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: 4,
                          }}
                        />
                      </Box>
                      
                      {/* Ảnh bổ sung */}
                      {selectedProduct.additionalImages.map((img, idx) => (
                        <Box
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx + 1)}
                          sx={{
                            flexShrink: 0,
                            width: 80,
                            height: 80,
                            backgroundColor: primaryColor,
                            borderRadius: 1,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: selectedImageIndex === idx + 1 ? `2px solid ${bronzeYellow}` : '2px solid transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              border: `2px solid ${bronzeYellow}`,
                            },
                          }}
                        >
                          <img
                            src={img}
                            alt={`${selectedProduct.name} - Ảnh ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              padding: 4,
                            }}
                          />
                        </Box>
                      ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Right Side - Product Info */}
              <Grid item xs={12} md={7}>
                <Box sx={{ p: 4 }}>
                  {/* Category */}
                  {selectedProduct.category && (
                    <Typography
                      variant="overline"
                      sx={{
                        color: americanYellow,
                        fontFamily: "'VNM Sans Display', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        letterSpacing: 1,
                        display: 'block',
                        mb: 1,
                      }}
                    >
                      {selectedProduct.category}
                    </Typography>
                  )}

                  {/* Product Name with Cart Icon */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: bronzeYellow,
                        lineHeight: 1.3,
                        flex: 1,
                        pr: 2,
                        fontFamily: "'VNM Sans Std', sans-serif",
                      }}
                    >
                      {selectedProduct.name}
                    </Typography>
                    <IconButton
                      onClick={() => handleAddToCart(selectedProduct, modalSize, quantity)}
                      sx={{
                        backgroundColor: americanYellow,
                        color: '#fff',
                        mt: 3,
                        '&:hover': {
                          backgroundColor: bronzeYellow,
                        },
                        width: 48,
                        height: 48,
                        flexShrink: 0,
                      }}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Box>

                  {/* Description */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: bronzeYellow,
                        mb: 1.5,
                        fontFamily: "'VNM Sans Std', sans-serif",
                      }}
                    >
                      Phần mô tả:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#666',
                        lineHeight: 1.8,
                        fontFamily: "'VNM Sans Display', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {selectedProduct.fullDescription || selectedProduct.description}
                    </Typography>
                  </Box>

                  {/* Price */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: americanYellow,
                      mb: 3,
                    }}
                  >
                    {selectedProduct.prices[modalSize].toLocaleString('vi-VN')}₫
                  </Typography>

                  {/* Size Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: bronzeYellow,
                        mb: 1.5,
                        fontFamily: "'VNM Sans Std', sans-serif",
                      }}
                    >
                      Dung tích
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      {selectedProduct.sizes.map((size) => (
                        <Chip
                          key={size}
                          label={size}
                          onClick={() => handleModalSizeChange(size)}
                          sx={{
                            backgroundColor:
                              modalSize === size ? bronzeYellow : `${bronzeYellow}15`,
                            color: modalSize === size ? '#fff' : bronzeYellow,
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            py: 2.5,
                            px: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor:
                                modalSize === size ? bronzeYellow : `${bronzeYellow}25`,
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Quantity Selection */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: bronzeYellow,
                        mb: 1.5,
                        fontFamily: "'VNM Sans Std', sans-serif",
                      }}
                    >
                      Số lượng
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: `2px solid ${bronzeYellow}`,
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <IconButton
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        sx={{
                          borderRadius: 0,
                          color: bronzeYellow,
                          px: 2,
                          py: 1,
                          '&:hover': {
                            backgroundColor: `${bronzeYellow}15`,
                          },
                          '&.Mui-disabled': {
                            color: `${bronzeYellow}40`,
                          },
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: bronzeYellow,
                          px: 4,
                          fontSize: '1.1rem',
                          minWidth: 60,
                          textAlign: 'center',
                          fontFamily: "'VNM Sans Std', sans-serif",
                        }}
                      >
                        {quantity}
                      </Typography>
                      <IconButton
                        onClick={() => handleQuantityChange(1)}
                        sx={{
                          borderRadius: 0,
                          color: bronzeYellow,
                          px: 2,
                          py: 1,
                          '&:hover': {
                            backgroundColor: `${bronzeYellow}15`,
                          },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Add to Cart Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleAddToCart(selectedProduct, modalSize, quantity)}
                    sx={{
                      backgroundColor: americanYellow,
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: bronzeYellow,
                      },
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Bottom Section: Customer Reviews - Full Width */}
            <Box sx={{ p: 4, backgroundColor: '#FDFCF5' }}>
              <Divider sx={{ mb: 3 }} />
              
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: bronzeYellow,
                  mb: 2,
                  fontFamily: "'VNM Sans Std', sans-serif",
                }}
              >
                Nhận xét từ khách hàng
              </Typography>

              {/* Reviews List */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {productReviews[selectedProduct.id]?.map((review) => (
                  <Box
                    key={review.id}
                    sx={{
                      p: 2,
                      backgroundColor: `${primaryColor}40`,
                      borderRadius: 2,
                    }}
                  >
                    {/* Review Header */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: americanYellow,
                          color: '#fff',
                          width: 40,
                          height: 40,
                          fontWeight: 600,
                          mr: 1.5,
                        }}
                      >
                        {review.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontFamily: "'VNM Sans Std', sans-serif",
                            fontWeight: 700,
                            color: bronzeYellow,
                          }}
                        >
                          {review.userName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            sx={{
                              '& .MuiRating-iconFilled': {
                                color: americanYellow,
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontFamily: "'VNM Sans Display', sans-serif",
                              fontWeight: 700,
                              color: '#999',
                            }}
                          >
                            {review.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Review Comment */}
                    <Box sx={{ pl: 7 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'VNM Sans Display', sans-serif",
                          fontWeight: 700,
                          color: '#444',
                          lineHeight: 1.6,
                          mb: review.image ? 2 : 0,
                        }}
                      >
                        {review.comment}
                      </Typography>
                      {/* Review Image */}
                      {review.image && (
                        <Box
                          component="img"
                          src={review.image}
                          alt="Feedback image"
                          sx={{
                            width: '100%',
                            maxWidth: '400px',
                            height: 'auto',
                            borderRadius: 2,
                            mt: 1,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Average Rating Summary */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  backgroundColor: `${bronzeYellow}10`,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: americanYellow,
                    }}
                  >
                    {(
                      productReviews[selectedProduct.id]?.reduce(
                        (sum, r) => sum + r.rating,
                        0
                      ) / productReviews[selectedProduct.id]?.length || 0
                    ).toFixed(1)}
                  </Typography>
                  <Rating
                    value={
                      productReviews[selectedProduct.id]?.reduce(
                        (sum, r) => sum + r.rating,
                        0
                      ) / productReviews[selectedProduct.id]?.length || 0
                    }
                    readOnly
                    precision={0.1}
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: americanYellow,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "'VNM Sans Display', sans-serif",
                      fontWeight: 700,
                      color: '#666',
                      display: 'block',
                      mt: 0.5,
                    }}
                  >
                    {productReviews[selectedProduct.id]?.length || 0} đánh giá
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>

      {/* Snackbar for Add to Cart Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: bronzeYellow,
            color: '#fff',
          }}
        >
          Đã thêm "{addedProduct}" vào giỏ hàng!
        </Alert>
      </Snackbar>

      {/* Cart Drawer */}
      <CartDrawer />

      <Footer />
    </Box>
  );
}

export default ProductPage;

