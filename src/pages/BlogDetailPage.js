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

// Blog 5-8: Mẹo món ngon
blogData[5] = {
  id: 5,
  title: 'Bánh xèo chay giòn rụm từ dầu ép lạnh – ngon nhẹ mà vẫn tròn vị',
  category: 'Mẹo món ngon',
  date: '14/12/2025',
  author: 'Đầu bếp Nguyễn Thị Lan',
  views: 1680,
  initialLikes: 112,
  content: `
# Bánh xèo chay - Món ăn truyền thống với hương vị mới

Bánh xèo chay với dầu ép lạnh AnaOi không chỉ giữ được độ giòn rụm đặc trưng mà còn mang đến hương vị thanh nhẹ, tốt cho sức khỏe.

## Nguyên liệu cần chuẩn bị

**Cho bột bánh:**
- 200g bột gạo
- 50g bột nghệ
- 400ml nước cốt dừa
- 1 thìa dầu ép lạnh AnaOi
- Muối, đường

**Cho nhân:**
- Nấm rơm, nấm hương
- Đậu hũ non
- Giá đỗ
- Rau thơm

## Cách làm bánh xèo chay

### Bước 1: Pha bột

Trộn đều bột gạo, bột nghệ với nước cốt dừa. Thêm dầu ép lạnh AnaOi vào hỗn hợp để bánh giòn hơn và không bị dính chảo.

### Bước 2: Chuẩn bị nhân

Xào nấm và đậu hũ với dầu ép lạnh AnaOi cho đến khi chín vàng, thơm.

### Bước 3: Rán bánh

Đổ bột vào chảo nóng đã có dầu ép lạnh, rải nhân lên một nửa mặt bánh, đậy nắp và rán đến khi bánh giòn.

## Bí quyết để bánh giòn rụm

- Sử dụng dầu ép lạnh AnaOi có điểm khói cao, giúp bánh giòn lâu hơn
- Đảm bảo chảo đủ nóng trước khi đổ bột
- Không đậy nắp quá lâu để tránh bánh bị mềm

## Lợi ích dinh dưỡng

Bánh xèo chay với dầu ép lạnh giàu chất béo tốt, không cholesterol, phù hợp cho người ăn chay và quan tâm sức khỏe.
  `,
};

blogData[6] = {
  id: 6,
  title: 'Salad dầu bơ AnaOi – bí quyết cho bữa ăn thanh mát và đủ chất',
  category: 'Mẹo món ngon',
  date: '11/12/2025',
  author: 'Chuyên gia dinh dưỡng Trần Minh Hương',
  views: 1920,
  initialLikes: 145,
  content: `
# Salad dầu bơ - Món ăn thanh mát đầy dinh dưỡng

Salad với dầu bơ ép lạnh AnaOi là lựa chọn hoàn hảo cho bữa ăn nhẹ, thanh mát nhưng vẫn đảm bảo đủ chất dinh dưỡng cần thiết.

## Tại sao chọn dầu bơ cho salad?

Dầu bơ ép lạnh AnaOi có hương vị nhẹ nhàng, không át mùi rau củ, đồng thời giúp cơ thể hấp thụ tốt các vitamin tan trong chất béo như Vitamin A, D, E, K.

## Công thức salad cơ bản

**Nguyên liệu:**
- Rau xanh tùy chọn (xà lách, rau mầm, cải bó xôi)
- Cà chua bi
- Dưa chuột
- Hành tây tím
- Dầu bơ ép lạnh AnaOi
- Giấm táo hoặc chanh
- Mật ong
- Muối, tiêu

**Cách làm sốt:**
Trộn 3 thìa dầu bơ AnaOi với 1 thìa giấm táo, 1 thìa mật ong, muối và tiêu. Khuấy đều cho đến khi hỗn hợp đồng nhất.

## Các biến thể salad

### Salad với hạt và phô mai

Thêm hạt hướng dương, hạt bí và phô mai feta để tăng protein và chất béo tốt.

### Salad với trái cây

Kết hợp với táo, lê hoặc nho để tạo vị ngọt tự nhiên, cân bằng với vị chua của giấm.

### Salad với thịt gà nướng

Thêm thịt gà nướng để có bữa ăn đầy đủ protein, phù hợp cho bữa trưa.

## Lợi ích sức khỏe

- Giàu chất xơ từ rau củ
- Chất béo tốt từ dầu bơ giúp no lâu
- Vitamin và khoáng chất đa dạng
- Hỗ trợ tiêu hóa và giảm cân lành mạnh

## Mẹo vặt

- Rửa và để ráo rau thật kỹ trước khi trộn
- Trộn sốt ngay trước khi ăn để giữ độ giòn
- Bảo quản dầu bơ ở nơi tối, mát để giữ chất lượng
  `,
};

blogData[7] = {
  id: 7,
  title: 'Sốt dầu hạt ăn kèm bánh mì nguyên cám – sáng tạo nhỏ, vị ngon lớn',
  category: 'Mẹo món ngon',
  date: '09/12/2025',
  author: 'Đầu bếp Lê Văn Đức',
  views: 1450,
  initialLikes: 98,
  content: `
# Sốt dầu hạt - Bữa sáng đầy năng lượng

Sốt dầu hạt tự làm với dầu ép lạnh AnaOi là cách tuyệt vời để biến bữa sáng đơn giản thành một trải nghiệm ẩm thực đầy hương vị và dinh dưỡng.

## Tại sao nên tự làm sốt dầu hạt?

Sốt dầu hạt tự làm với dầu ép lạnh AnaOi đảm bảo:
- Không có chất bảo quản
- Giữ nguyên hương vị tự nhiên
- Kiểm soát được lượng đường và muối
- Tận dụng tối đa dưỡng chất từ hạt

## Công thức sốt dầu hạt cơ bản

**Nguyên liệu:**
- 100g hạt hướng dương hoặc hạt bí
- 3 thìa dầu ép lạnh AnaOi (dầu mè đen hoặc dầu blend)
- 1 thìa mật ong
- 1 nhúm muối biển
- 1/2 thìa nước cốt chanh

**Cách làm:**
1. Rang hạt trên chảo khô đến khi thơm vàng
2. Xay nhuyễn hạt trong máy xay
3. Thêm dầu ép lạnh AnaOi từ từ, xay tiếp
4. Thêm mật ong, muối và nước cốt chanh
5. Xay đến khi đạt độ mịn mong muốn

## Các biến thể sốt

### Sốt với hạt mắc ca

Thay hạt hướng dương bằng hạt mắc ca để có vị béo ngậy hơn, giàu omega-3.

### Sốt với hạt điều

Hạt điều tạo độ kem mịn, phù hợp để phết lên bánh mì hoặc làm sốt chấm rau củ.

### Sốt cay với ớt

Thêm ớt khô hoặc ớt tươi để tạo vị cay nhẹ, kích thích vị giác.

## Cách sử dụng sốt dầu hạt

- Phết lên bánh mì nguyên cám cho bữa sáng
- Làm sốt chấm rau củ sống
- Trộn với mì pasta
- Làm sốt cho salad
- Kết hợp với trái cây tươi

## Bảo quản

Sốt dầu hạt tự làm có thể bảo quản trong tủ lạnh đến 2 tuần. Đảm bảo đậy kín và để ở ngăn mát.

## Lợi ích dinh dưỡng

- Protein từ hạt
- Chất béo tốt từ dầu ép lạnh
- Chất xơ từ hạt nguyên vỏ
- Vitamin E và các khoáng chất
  `,
};

blogData[8] = {
  id: 8,
  title: 'Áp chảo cùng dầu ép lạnh – công thức "xanh" cho bữa cơm Việt',
  category: 'Mẹo món ngon',
  date: '07/12/2025',
  author: 'Đầu bếp Phạm Thị Mai',
  views: 1780,
  initialLikes: 124,
  content: `
# Áp chảo với dầu ép lạnh - Công thức xanh cho bữa cơm Việt

Áp chảo là phương pháp nấu ăn truyền thống của người Việt. Khi kết hợp với dầu ép lạnh AnaOi, bạn sẽ có những món ăn thơm ngon, lành mạnh và tốt cho sức khỏe.

## Tại sao chọn dầu ép lạnh cho áp chảo?

Dầu ép lạnh AnaOi có điểm khói phù hợp cho áp chảo, không tạo khói độc hại và giữ được hương vị tự nhiên của thực phẩm.

## Các món áp chảo phổ biến

### Cá áp chảo

**Nguyên liệu:**
- Cá phi lê (cá basa, cá hồi)
- Dầu ép lạnh AnaOi
- Tỏi, gừng
- Nước mắm, đường

**Cách làm:**
1. Ướp cá với tỏi, gừng, nước mắm trong 15 phút
2. Làm nóng chảo với dầu ép lạnh AnaOi
3. Áp chảo cá đến khi vàng đều hai mặt
4. Thêm nước sốt và đun nhỏ lửa đến khi cá chín

### Thịt heo áp chảo

Áp chảo thịt heo với dầu ép lạnh giúp thịt không bị khô, giữ được độ mềm và thơm ngon.

### Rau củ áp chảo

Các loại rau củ như cà tím, bí đỏ, đậu bắp khi áp chảo với dầu ép lạnh sẽ giữ được độ giòn và hương vị tự nhiên.

## Bí quyết áp chảo thành công

### Nhiệt độ chảo

Đảm bảo chảo đủ nóng trước khi cho dầu vào. Kiểm tra bằng cách nhỏ một giọt nước - nếu nước sôi ngay thì chảo đã đủ nóng.

### Lượng dầu vừa đủ

Không cần quá nhiều dầu, chỉ cần đủ để phủ một lớp mỏng đáy chảo.

### Không đảo quá nhiều

Để thực phẩm áp chảo một mặt đến khi vàng rồi mới lật, tránh đảo liên tục.

## Lợi ích của phương pháp áp chảo

- Giữ được độ giòn và hương vị tự nhiên
- Ít dầu hơn so với chiên ngập dầu
- Giữ được nhiều dưỡng chất hơn
- Tạo lớp vỏ vàng đẹp mắt

## Kết hợp với các món ăn Việt

Áp chảo với dầu ép lạnh phù hợp với:
- Cơm trắng nóng
- Canh chua
- Rau luộc
- Nước mắm pha

## Lưu ý khi sử dụng

- Không để dầu quá nóng để tránh mất chất dinh dưỡng
- Sử dụng chảo chống dính chất lượng tốt
- Lau sạch chảo sau mỗi lần áp chảo để tránh cháy
  `,
};

// Blog 9-12: Góc chuyên gia
blogData[9] = {
  id: 9,
  title: '5 lợi ích vàng của dầu bơ ép lạnh – tốt cho tim mạch, da và hệ miễn dịch',
  category: 'Góc chuyên gia',
  date: '13/12/2025',
  author: 'Bác sĩ Nguyễn Văn Hùng',
  views: 2340,
  initialLikes: 187,
  content: `
# 5 lợi ích vàng của dầu bơ ép lạnh

Dầu bơ ép lạnh AnaOi không chỉ là một loại dầu ăn thông thường mà còn là nguồn dinh dưỡng quý giá cho sức khỏe tổng thể.

## 1. Bảo vệ sức khỏe tim mạch

Dầu bơ ép lạnh giàu axit béo không bão hòa đơn (MUFA), đặc biệt là axit oleic, giúp:

**Giảm cholesterol xấu (LDL):** Nghiên cứu cho thấy việc thay thế chất béo bão hòa bằng MUFA có thể giảm LDL cholesterol lên đến 10-15%.

**Tăng cholesterol tốt (HDL):** HDL cholesterol giúp vận chuyển cholesterol dư thừa về gan để xử lý.

**Ổn định huyết áp:** Các hợp chất trong dầu bơ giúp thư giãn mạch máu, hỗ trợ kiểm soát huyết áp.

## 2. Chăm sóc làn da từ bên trong

Dầu bơ ép lạnh chứa hàm lượng cao Vitamin E và các chất chống oxi hóa:

**Chống lão hóa:** Vitamin E trung hòa các gốc tự do, giảm nếp nhăn và làm chậm quá trình lão hóa da.

**Cấp ẩm:** Các axit béo trong dầu bơ giúp duy trì độ ẩm tự nhiên của da.

**Chữa lành:** Đặc tính chống viêm giúp làm dịu các tổn thương da và hỗ trợ quá trình tái tạo tế bào.

## 3. Tăng cường hệ miễn dịch

**Vitamin E:** Chất chống oxi hóa mạnh, bảo vệ tế bào khỏi tổn thương.

**Carotenoid:** Hợp chất chống viêm tự nhiên, hỗ trợ hệ miễn dịch hoạt động hiệu quả.

**Omega-9:** Giúp giảm viêm mãn tính, nguyên nhân của nhiều bệnh tật.

## 4. Hỗ trợ hấp thụ dinh dưỡng

Dầu bơ ép lạnh giúp cơ thể hấp thụ tốt hơn các vitamin tan trong chất béo:

- **Vitamin A:** Quan trọng cho thị lực và hệ miễn dịch
- **Vitamin D:** Cần thiết cho xương và hệ miễn dịch
- **Vitamin E:** Chất chống oxi hóa mạnh
- **Vitamin K:** Quan trọng cho đông máu

## 5. Hỗ trợ kiểm soát cân nặng

Mặc dù giàu calo, dầu bơ ép lạnh có thể hỗ trợ kiểm soát cân nặng:

**Tạo cảm giác no:** Chất béo tốt giúp bạn cảm thấy no lâu hơn, giảm cảm giác thèm ăn.

**Tăng cường trao đổi chất:** Các axit béo trong dầu bơ hỗ trợ quá trình đốt cháy năng lượng.

**Giảm tích mỡ:** MUFA giúp giảm tích tụ mỡ ở vùng bụng.

## Khuyến nghị sử dụng

**Liều lượng:** 2-3 thìa dầu bơ ép lạnh mỗi ngày

**Cách sử dụng:**
- Trộn salad
- Áp chảo ở nhiệt độ vừa phải
- Thêm vào smoothie
- Dùng như sốt chấm

## Lưu ý quan trọng

- Bảo quản ở nơi tối, mát, tránh ánh sáng trực tiếp
- Sử dụng trong vòng 6 tháng sau khi mở nắp
- Không đun ở nhiệt độ quá cao để giữ dưỡng chất

# Kết luận

Dầu bơ ép lạnh AnaOi là lựa chọn tuyệt vời cho một chế độ ăn lành mạnh, hỗ trợ sức khỏe tim mạch, làn da và hệ miễn dịch. Hãy bắt đầu sử dụng ngay hôm nay để trải nghiệm những lợi ích tuyệt vời này!
  `,
};

blogData[10] = {
  id: 10,
  title: 'Sức mạnh kết hợp: Dầu mè đen và cám gạo – bí quyết cho cơ thể khỏe từ bên trong',
  category: 'Góc chuyên gia',
  date: '10/12/2025',
  author: 'Chuyên gia dinh dưỡng Lê Thị Hoa',
  views: 1890,
  initialLikes: 156,
  content: `
# Sức mạnh kết hợp: Dầu mè đen và cám gạo

Dầu blend mè đen & cám gạo ép lạnh AnaOi là sự kết hợp độc đáo, mang đến những lợi ích sức khỏe vượt trội mà không loại dầu đơn nào có thể sánh bằng.

## Tại sao kết hợp mè đen và cám gạo?

Sự kết hợp này tạo ra một loại dầu có thành phần dinh dưỡng cân bằng và đa dạng:

**Từ mè đen:**
- Axit béo omega-6 và omega-9
- Sesamin và sesamolin (chất chống oxi hóa đặc biệt)
- Vitamin E
- Khoáng chất: canxi, sắt, magie

**Từ cám gạo:**
- Gamma-oryzanol (chất chống oxi hóa mạnh)
- Vitamin nhóm B
- Chất xơ hòa tan
- Phytosterol

## Lợi ích sức khỏe vượt trội

### 1. Hỗ trợ tim mạch

**Gamma-oryzanol:** Nghiên cứu cho thấy hợp chất này có thể giảm cholesterol xấu (LDL) và tăng cholesterol tốt (HDL).

**Phytosterol:** Chất này có cấu trúc tương tự cholesterol, giúp ngăn chặn sự hấp thụ cholesterol xấu từ thức ăn.

**Sesamin:** Hợp chất đặc biệt trong mè đen giúp giảm huyết áp và cải thiện chức năng mạch máu.

### 2. Chống viêm tự nhiên

Sự kết hợp của các chất chống oxi hóa từ cả mè đen và cám gạo tạo ra hiệu ứng chống viêm mạnh mẽ:

- Giảm viêm mãn tính
- Hỗ trợ điều trị viêm khớp
- Giảm nguy cơ các bệnh liên quan đến viêm

### 3. Hỗ trợ tiêu hóa

**Chất xơ từ cám gạo:** Giúp điều hòa đường ruột, hỗ trợ tiêu hóa tốt hơn.

**Đặc tính kháng khuẩn:** Sesamin trong mè đen có tác dụng kháng khuẩn nhẹ, hỗ trợ hệ vi sinh đường ruột.

### 4. Tăng cường miễn dịch

**Vitamin nhóm B:** Từ cám gạo giúp tăng cường chức năng hệ miễn dịch.

**Chất chống oxi hóa:** Bảo vệ tế bào khỏi tổn thương do stress oxi hóa.

### 5. Hỗ trợ kiểm soát đường huyết

**Gamma-oryzanol:** Có thể giúp cải thiện độ nhạy insulin, hỗ trợ kiểm soát đường huyết.

**Chất xơ:** Giúp làm chậm quá trình hấp thụ đường vào máu.

## So sánh với các loại dầu khác

| Đặc điểm | Dầu mè đen & cám gạo | Dầu đơn |
|----------|---------------------|---------|
| Chất chống oxi hóa | Đa dạng và phong phú | Hạn chế |
| Gamma-oryzanol | Có | Không |
| Sesamin | Có | Không |
| Vitamin nhóm B | Có | Không |

## Cách sử dụng hiệu quả

**Cho nấu ăn:**
- Áp chảo ở nhiệt độ vừa phải
- Trộn salad
- Làm sốt chấm

**Cho sức khỏe:**
- Uống trực tiếp 1-2 thìa mỗi ngày
- Thêm vào smoothie
- Trộn với sữa chua

## Khuyến nghị từ chuyên gia

**Liều lượng:** 2-3 thìa mỗi ngày

**Thời điểm tốt nhất:** Buổi sáng hoặc trước bữa ăn

**Đối tượng phù hợp:**
- Người quan tâm sức khỏe tim mạch
- Người muốn kiểm soát cholesterol
- Người ăn chay cần bổ sung chất béo tốt
- Người muốn tăng cường miễn dịch

## Lưu ý

- Bảo quản ở nơi tối, mát
- Sử dụng trong vòng 6 tháng sau khi mở
- Không đun ở nhiệt độ quá cao

# Kết luận

Dầu blend mè đen & cám gạo ép lạnh AnaOi là sự lựa chọn thông minh cho những ai muốn chăm sóc sức khỏe từ bên trong một cách tự nhiên và hiệu quả.
  `,
};

blogData[11] = {
  id: 11,
  title: 'Bí quyết tăng cường đề kháng tự nhiên nhờ chất béo tốt trong dầu ép lạnh',
  category: 'Góc chuyên gia',
  date: '08/12/2025',
  author: 'Bác sĩ Trần Văn Nam',
  views: 2150,
  initialLikes: 178,
  content: `
# Tăng cường đề kháng tự nhiên với chất béo tốt

Hệ miễn dịch khỏe mạnh là nền tảng của sức khỏe tốt. Dầu ép lạnh AnaOi với các chất béo tốt có thể giúp tăng cường đề kháng một cách tự nhiên và hiệu quả.

## Vai trò của chất béo tốt với hệ miễn dịch

Chất béo không chỉ cung cấp năng lượng mà còn đóng vai trò quan trọng trong việc xây dựng và duy trì hệ miễn dịch:

**Cấu trúc tế bào:** Chất béo là thành phần quan trọng của màng tế bào, bao gồm cả tế bào miễn dịch.

**Hấp thụ vitamin:** Giúp cơ thể hấp thụ các vitamin tan trong chất béo như Vitamin A, D, E, K - những vitamin quan trọng cho hệ miễn dịch.

**Giảm viêm:** Chất béo tốt giúp kiểm soát phản ứng viêm, hỗ trợ hệ miễn dịch hoạt động hiệu quả.

## Các chất béo tốt trong dầu ép lạnh AnaOi

### Omega-3 (từ dầu mè đen)

Omega-3 có tác dụng:
- Giảm viêm mãn tính
- Hỗ trợ chức năng tế bào miễn dịch
- Cải thiện phản ứng miễn dịch

### Omega-9 (từ dầu bơ)

Omega-9 giúp:
- Giảm viêm
- Hỗ trợ sản xuất tế bào miễn dịch
- Cải thiện chức năng hàng rào bảo vệ

### Axit béo không bão hòa đơn (MUFA)

MUFA trong dầu ép lạnh:
- Hỗ trợ sản xuất kháng thể
- Cải thiện chức năng tế bào T (tế bào miễn dịch quan trọng)
- Giảm stress oxi hóa

## Cách tăng cường đề kháng với dầu ép lạnh

### 1. Sử dụng đều đặn mỗi ngày

**Liều lượng:** 2-3 thìa dầu ép lạnh mỗi ngày

**Thời điểm tốt nhất:**
- Buổi sáng: Thêm vào smoothie hoặc salad
- Bữa trưa: Trộn với món ăn
- Buổi tối: Dùng với món nấu

### 2. Kết hợp với thực phẩm giàu vitamin

Dầu ép lạnh giúp hấp thụ tốt hơn:
- **Vitamin A:** Từ cà rốt, khoai lang, rau xanh
- **Vitamin D:** Từ cá, trứng, nấm
- **Vitamin E:** Từ các loại hạt, rau xanh
- **Vitamin K:** Từ rau lá xanh

### 3. Kết hợp với thực phẩm giàu kẽm

Kẽm là khoáng chất quan trọng cho hệ miễn dịch. Kết hợp dầu ép lạnh với:
- Các loại hạt
- Đậu
- Thịt nạc
- Hải sản

## Công thức tăng cường đề kháng

### Smoothie buổi sáng

**Nguyên liệu:**
- 1 quả chuối
- 1/2 quả bơ
- 1 thìa dầu ép lạnh AnaOi
- 1 cốc sữa hạnh nhân
- 1 thìa mật ong

**Cách làm:** Xay tất cả nguyên liệu đến khi mịn.

### Salad tăng cường miễn dịch

**Nguyên liệu:**
- Rau xanh tùy chọn
- Cà chua
- Ớt chuông đỏ
- Hạt hướng dương
- 2 thìa dầu ép lạnh AnaOi
- Giấm táo
- Tỏi băm

## Lợi ích lâu dài

Sử dụng dầu ép lạnh đều đặn giúp:
- Tăng cường chức năng hệ miễn dịch
- Giảm nguy cơ nhiễm trùng
- Hồi phục nhanh hơn sau bệnh
- Duy trì sức khỏe tổng thể

## Lưu ý quan trọng

- Sử dụng dầu ép lạnh chất lượng cao như AnaOi
- Bảo quản đúng cách để giữ dưỡng chất
- Kết hợp với chế độ ăn cân bằng và tập thể dục đều đặn
- Không thay thế hoàn toàn các nguồn chất béo khác

## Kết hợp với lối sống lành mạnh

Để tăng cường đề kháng hiệu quả, cần kết hợp:
- Chế độ ăn đa dạng, giàu dinh dưỡng
- Ngủ đủ giấc (7-8 giờ/ngày)
- Tập thể dục đều đặn
- Giảm stress
- Uống đủ nước

# Kết luận

Dầu ép lạnh AnaOi với các chất béo tốt là công cụ mạnh mẽ để tăng cường đề kháng tự nhiên. Hãy bắt đầu sử dụng ngay hôm nay để xây dựng một hệ miễn dịch khỏe mạnh!
  `,
};

blogData[12] = {
  id: 12,
  title: 'Chuyên gia nói gì về dầu ép lạnh và dầu tinh luyện – đâu là lựa chọn tốt cho sức khỏe?',
  category: 'Góc chuyên gia',
  date: '06/12/2025',
  author: 'Tiến sĩ Nguyễn Thị Hương',
  views: 2670,
  initialLikes: 234,
  content: `
# Dầu ép lạnh vs Dầu tinh luyện: Lựa chọn nào tốt hơn?

Đây là câu hỏi mà nhiều người quan tâm đến sức khỏe đặt ra. Hãy cùng các chuyên gia phân tích sự khác biệt và đưa ra lựa chọn phù hợp nhất.

## Sự khác biệt cơ bản

### Dầu ép lạnh (Cold-Pressed Oil)

**Quy trình sản xuất:**
- Ép nguyên liệu ở nhiệt độ thấp (< 60°C)
- Không qua quá trình tinh luyện
- Giữ nguyên hương vị và dưỡng chất tự nhiên

**Đặc điểm:**
- Màu sắc tự nhiên, đậm đà
- Hương vị đặc trưng của nguyên liệu
- Giàu chất chống oxi hóa và vitamin
- Giá thành cao hơn

### Dầu tinh luyện (Refined Oil)

**Quy trình sản xuất:**
- Ép ở nhiệt độ cao
- Qua nhiều công đoạn tinh luyện (tẩy màu, khử mùi, tinh chế)
- Loại bỏ các hợp chất tự nhiên

**Đặc điểm:**
- Màu sắc nhạt, trong suốt
- Không có mùi vị đặc trưng
- Ít chất dinh dưỡng hơn
- Giá thành thấp hơn
- Điểm khói cao hơn

## So sánh dinh dưỡng

| Thành phần | Dầu ép lạnh | Dầu tinh luyện |
|------------|-------------|----------------|
| Vitamin E | Cao | Thấp |
| Chất chống oxi hóa | Nhiều | Ít |
| Phytosterol | Có | Không |
| Hương vị tự nhiên | Giữ nguyên | Mất đi |
| Dưỡng chất | Đầy đủ | Giảm đáng kể |

## Lợi ích của dầu ép lạnh

### 1. Giữ nguyên dưỡng chất

Quá trình ép lạnh giúp bảo toàn:
- Vitamin E, A, D, K
- Chất chống oxi hóa
- Phytosterol
- Các hợp chất thực vật có lợi

### 2. Hương vị tự nhiên

Dầu ép lạnh giữ được hương vị đặc trưng của nguyên liệu, làm tăng trải nghiệm ẩm thực.

### 3. Tốt cho sức khỏe

Các nghiên cứu cho thấy dầu ép lạnh:
- Giảm cholesterol xấu
- Chống viêm
- Hỗ trợ tim mạch
- Tăng cường miễn dịch

## Nhược điểm của dầu tinh luyện

### 1. Mất dưỡng chất

Quá trình tinh luyện loại bỏ:
- Vitamin và khoáng chất
- Chất chống oxi hóa
- Các hợp chất có lợi khác

### 2. Có thể chứa chất độc hại

Quá trình tinh luyện ở nhiệt độ cao có thể tạo ra:
- Trans fat
- Các hợp chất độc hại
- Chất bảo quản

### 3. Không có hương vị

Dầu tinh luyện không có mùi vị đặc trưng, làm giảm trải nghiệm ẩm thực.

## Khi nào nên dùng dầu nào?

### Dùng dầu ép lạnh cho:

- **Salad và món sống:** Giữ nguyên hương vị và dưỡng chất
- **Áp chảo ở nhiệt độ vừa:** Giữ được chất dinh dưỡng
- **Smoothie và đồ uống:** Tăng cường dinh dưỡng
- **Món ăn cần hương vị đặc trưng:** Làm nổi bật món ăn

### Dùng dầu tinh luyện cho:

- **Chiên ngập dầu ở nhiệt độ cao:** Điểm khói cao hơn
- **Món ăn không cần hương vị đặc trưng:** Không ảnh hưởng đến món ăn
- **Ngân sách hạn chế:** Giá thành thấp hơn

## Khuyến nghị từ chuyên gia

**Tiến sĩ Nguyễn Thị Hương khuyến nghị:**

> "Đối với sức khỏe lâu dài, dầu ép lạnh là lựa chọn tốt hơn. Mặc dù giá thành cao hơn, nhưng giá trị dinh dưỡng và lợi ích sức khỏe mà nó mang lại xứng đáng với số tiền bỏ ra."

**Bác sĩ Trần Văn Nam chia sẻ:**

> "Tôi khuyên bệnh nhân của mình sử dụng dầu ép lạnh cho các món ăn hàng ngày. Đặc biệt là những người có vấn đề về tim mạch hoặc muốn cải thiện sức khỏe tổng thể."

## Cách chọn dầu ép lạnh chất lượng

**Tiêu chí:**
- Nguồn gốc rõ ràng, minh bạch
- Quy trình ép lạnh được chứng nhận
- Đóng gói trong chai tối màu
- Hạn sử dụng rõ ràng
- Không có chất bảo quản

## Lưu ý khi sử dụng

**Dầu ép lạnh:**
- Bảo quản ở nơi tối, mát
- Sử dụng trong vòng 6 tháng sau khi mở
- Không đun ở nhiệt độ quá cao

**Dầu tinh luyện:**
- Có thể bảo quản lâu hơn
- Phù hợp cho chiên ở nhiệt độ cao
- Kiểm tra thành phần để tránh trans fat

# Kết luận

Dầu ép lạnh AnaOi là lựa chọn tốt hơn cho sức khỏe, mặc dù giá thành cao hơn. Nếu ngân sách cho phép, hãy ưu tiên sử dụng dầu ép lạnh cho các món ăn hàng ngày để tận dụng tối đa lợi ích dinh dưỡng và sức khỏe.
  `,
};

// Blog 13-16: Công nghệ đột phá
blogData[13] = {
  id: 13,
  title: 'Công nghệ ép lạnh tiên tiến - giữ trọn dưỡng chất từ nông sản Tây Nguyên',
  category: 'Công nghệ đột phá',
  date: '12/12/2025',
  author: 'Kỹ sư Lê Văn Đức',
  views: 1890,
  initialLikes: 145,
  content: `
# Công nghệ ép lạnh tiên tiến của AnaOi

Công nghệ ép lạnh là trái tim của AnaOi, giúp chúng tôi giữ trọn dưỡng chất quý giá từ những nông sản Tây Nguyên tươi ngon nhất.

## Công nghệ ép lạnh là gì?

Ép lạnh (Cold-Pressed) là phương pháp ép nguyên liệu ở nhiệt độ thấp (dưới 60°C), không qua quá trình tinh luyện, giúp giữ nguyên các dưỡng chất tự nhiên.

## Quy trình ép lạnh của AnaOi

### Bước 1: Chọn lọc nguyên liệu

Chúng tôi chỉ chọn những nguyên liệu:
- Đạt độ chín tối ưu
- Không có dấu hiệu hư hỏng
- Đảm bảo tiêu chuẩn chất lượng

### Bước 2: Làm sạch và sơ chế

- Rửa sạch kỹ lưỡng
- Loại bỏ tạp chất
- Sấy khô ở nhiệt độ thấp (nếu cần)

### Bước 3: Ép lạnh

**Máy ép thủy lực:**
- Nhiệt độ ép: < 60°C
- Áp suất kiểm soát chính xác
- Tốc độ ép chậm để giữ dưỡng chất

**Lợi ích:**
- Giữ nguyên vitamin và khoáng chất
- Bảo toàn chất chống oxi hóa
- Giữ hương vị tự nhiên

### Bước 4: Lọc tự nhiên

Dầu được lọc qua hệ thống lọc tự nhiên để loại bỏ cặn nhưng vẫn giữ các dưỡng chất.

### Bước 5: Đóng chai và bảo quản

- Đóng chai trong môi trường vô trùng
- Sử dụng chai tối màu để bảo vệ khỏi ánh sáng
- Niêm phong kín để tránh oxi hóa

## So sánh với phương pháp ép nóng

| Đặc điểm | Ép lạnh | Ép nóng |
|----------|---------|---------|
| Nhiệt độ | < 60°C | > 100°C |
| Dưỡng chất | Giữ nguyên | Mất một phần |
| Hương vị | Tự nhiên | Có thể bị biến đổi |
| Chất chống oxi hóa | Cao | Thấp |
| Giá thành | Cao hơn | Thấp hơn |

## Lợi ích của công nghệ ép lạnh

### 1. Giữ nguyên dưỡng chất

**Vitamin E:** Giữ được 90-95% so với ép nóng chỉ giữ được 50-60%

**Chất chống oxi hóa:** Bảo toàn gần như hoàn toàn

**Phytosterol:** Giữ nguyên, không bị phá hủy bởi nhiệt

### 2. Hương vị tự nhiên

Dầu ép lạnh giữ được hương vị đặc trưng của nguyên liệu, tạo trải nghiệm ẩm thực tuyệt vời.

### 3. An toàn cho sức khỏe

Không tạo ra các hợp chất độc hại như khi ép ở nhiệt độ cao.

## Công nghệ của AnaOi

### Máy ép thủy lực Model GM 200 HF

**Đặc điểm:**
- Kiểm soát nhiệt độ chính xác
- Áp suất điều chỉnh được
- Tốc độ ép tối ưu
- Vệ sinh dễ dàng

**Thông số kỹ thuật:**
- Nhiệt độ ép: 45-55°C
- Áp suất: 200-300 bar
- Tốc độ: 25 kg/5 phút

### Hệ thống kiểm soát chất lượng

- Kiểm tra nhiệt độ liên tục
- Giám sát áp suất
- Đảm bảo vệ sinh an toàn thực phẩm

## Chứng nhận và tiêu chuẩn

AnaOi đạt các tiêu chuẩn:
- ISO 22000 (An toàn thực phẩm)
- HACCP
- VietGAP (cho nguyên liệu)
- Chứng nhận ép lạnh

## Cam kết của AnaOi

Chúng tôi cam kết:
- Sử dụng công nghệ ép lạnh tiên tiến nhất
- Kiểm soát chất lượng nghiêm ngặt
- Minh bạch quy trình sản xuất
- Đảm bảo chất lượng từng giọt dầu

## Tương lai của công nghệ ép lạnh

AnaOi không ngừng cải tiến:
- Nghiên cứu công nghệ ép lạnh mới
- Tối ưu hóa quy trình
- Giảm thiểu tác động môi trường
- Nâng cao chất lượng sản phẩm

# Kết luận

Công nghệ ép lạnh tiên tiến của AnaOi là sự kết hợp hoàn hảo giữa truyền thống và hiện đại, giúp mang đến những giọt dầu chất lượng cao nhất, giữ trọn dưỡng chất từ thiên nhiên Tây Nguyên.
  `,
};

blogData[14] = {
  id: 14,
  title: 'Công nghệ truy xuất nguồn gốc thông minh - minh bạch hành trình từ nông trại đến bàn ăn',
  category: 'Công nghệ đột phá',
  date: '09/12/2025',
  author: 'Kỹ sư Phạm Văn Hùng',
  views: 1560,
  initialLikes: 112,
  content: `
# Công nghệ truy xuất nguồn gốc thông minh

AnaOi tự hào là một trong những thương hiệu đầu tiên tại Việt Nam áp dụng công nghệ truy xuất nguồn gốc thông minh, mang đến sự minh bạch hoàn toàn cho người tiêu dùng.

## Truy xuất nguồn gốc là gì?

Truy xuất nguồn gốc là khả năng theo dõi và xác định nguồn gốc, lịch sử, vị trí và quy trình sản xuất của sản phẩm từ nông trại đến bàn ăn.

## Hệ thống truy xuất của AnaOi

### Mã QR trên mỗi sản phẩm

Mỗi chai dầu AnaOi đều có mã QR duy nhất, cho phép bạn:

**Xem thông tin chi tiết:**
- Nguồn gốc nguyên liệu
- Nông trại cung cấp
- Ngày thu hoạch
- Quy trình sản xuất
- Ngày sản xuất và hạn sử dụng

**Kiểm tra chất lượng:**
- Kết quả kiểm định
- Chứng nhận chất lượng
- Thông tin lô sản xuất

### Thông tin được cung cấp

Khi quét mã QR, bạn sẽ thấy:

**Thông tin nông trại:**
- Tên và địa chỉ nông trại
- Diện tích canh tác
- Giống cây trồng
- Phương pháp canh tác

**Thông tin thu hoạch:**
- Ngày thu hoạch
- Người thu hoạch
- Độ chín của nguyên liệu
- Điều kiện thời tiết

**Thông tin sản xuất:**
- Ngày sản xuất
- Máy móc sử dụng
- Nhiệt độ ép
- Quy trình kiểm tra

**Thông tin chất lượng:**
- Kết quả kiểm định vi sinh
- Hàm lượng dinh dưỡng
- Chứng nhận an toàn

## Lợi ích của truy xuất nguồn gốc

### Cho người tiêu dùng

**Minh bạch:** Biết rõ nguồn gốc và quy trình sản xuất

**An tâm:** Đảm bảo chất lượng và an toàn thực phẩm

**Tin cậy:** Xây dựng niềm tin với thương hiệu

### Cho AnaOi

**Kiểm soát chất lượng:** Theo dõi từng bước trong quy trình

**Quản lý rủi ro:** Nhanh chóng xác định và xử lý vấn đề

**Xây dựng thương hiệu:** Tăng uy tín và giá trị thương hiệu

### Cho nông dân

**Công nhận:** Ghi nhận công sức và chất lượng sản phẩm

**Giá trị:** Tăng giá trị sản phẩm nông nghiệp

**Phát triển:** Hỗ trợ phát triển nông nghiệp bền vững

## Công nghệ đằng sau

### Blockchain (tùy chọn)

AnaOi đang nghiên cứu ứng dụng blockchain để:
- Lưu trữ thông tin không thể thay đổi
- Tăng tính minh bạch
- Bảo mật thông tin

### Internet of Things (IoT)

Sử dụng cảm biến để:
- Theo dõi nhiệt độ và độ ẩm
- Giám sát quy trình sản xuất
- Tự động ghi nhận dữ liệu

### Trí tuệ nhân tạo (AI)

Phân tích dữ liệu để:
- Dự đoán chất lượng
- Tối ưu quy trình
- Cải thiện sản phẩm

## Cách sử dụng mã QR

**Bước 1:** Mở ứng dụng quét QR trên điện thoại

**Bước 2:** Quét mã QR trên nhãn sản phẩm

**Bước 3:** Xem thông tin chi tiết về sản phẩm

**Bước 4:** Chia sẻ với bạn bè và gia đình

## Cam kết minh bạch

AnaOi cam kết:
- Cung cấp thông tin đầy đủ và chính xác
- Cập nhật thông tin kịp thời
- Đảm bảo tính minh bạch trong mọi khâu
- Sẵn sàng giải đáp mọi thắc mắc

## Tương lai của truy xuất nguồn gốc

AnaOi đang phát triển:
- Ứng dụng di động riêng
- Tích hợp với mạng xã hội
- Cộng đồng người dùng
- Chương trình khuyến mãi qua QR

# Kết luận

Công nghệ truy xuất nguồn gốc thông minh của AnaOi mang đến sự minh bạch hoàn toàn, giúp bạn yên tâm về chất lượng và nguồn gốc của từng giọt dầu. Hãy quét mã QR ngay hôm nay để khám phá hành trình của sản phẩm!
  `,
};

blogData[15] = {
  id: 15,
  title: 'Chuẩn hóa quy trình ép lạnh AnaOi: kiểm soát nhiệt độ, đảm bảo tinh khiết từng giọt dầu',
  category: 'Công nghệ đột phá',
  date: '07/12/2025',
  author: 'Kỹ sư Nguyễn Văn Thành',
  views: 1720,
  initialLikes: 128,
  content: `
# Chuẩn hóa quy trình ép lạnh AnaOi

AnaOi đã xây dựng một quy trình ép lạnh được chuẩn hóa nghiêm ngặt, đảm bảo mỗi giọt dầu đều đạt chất lượng cao nhất.

## Tầm quan trọng của chuẩn hóa

Chuẩn hóa quy trình giúp:
- Đảm bảo chất lượng đồng đều
- Kiểm soát được mọi khâu sản xuất
- Giảm thiểu sai sót
- Tăng hiệu quả sản xuất

## Quy trình chuẩn hóa của AnaOi

### Giai đoạn 1: Chuẩn bị nguyên liệu

**Tiêu chuẩn đầu vào:**
- Độ chín: Đạt chuẩn (không quá chín, không quá non)
- Chất lượng: Không có dấu hiệu hư hỏng
- Nguồn gốc: Từ nông trại được chứng nhận

**Quy trình:**
1. Kiểm tra chất lượng nguyên liệu
2. Phân loại theo độ chín
3. Làm sạch và sơ chế
4. Bảo quản ở nhiệt độ phù hợp

### Giai đoạn 2: Kiểm soát nhiệt độ ép

**Nhiệt độ tối ưu:** 45-55°C

**Hệ thống kiểm soát:**
- Cảm biến nhiệt độ tự động
- Báo động khi nhiệt độ vượt ngưỡng
- Ghi nhận dữ liệu liên tục

**Lý do quan trọng:**
- Nhiệt độ quá cao: Mất dưỡng chất
- Nhiệt độ quá thấp: Hiệu suất ép thấp
- Nhiệt độ tối ưu: Cân bằng giữa chất lượng và hiệu suất

### Giai đoạn 3: Kiểm soát áp suất ép

**Áp suất tối ưu:** 200-300 bar

**Hệ thống:**
- Van điều áp tự động
- Đồng hồ đo áp suất chính xác
- Ghi nhận dữ liệu

**Tác động:**
- Áp suất cao: Tăng hiệu suất nhưng có thể làm nóng
- Áp suất thấp: Giữ nhiệt độ nhưng hiệu suất thấp
- Áp suất tối ưu: Cân bằng hoàn hảo

### Giai đoạn 4: Lọc và tinh chế

**Quy trình lọc:**
- Lọc thô: Loại bỏ cặn lớn
- Lọc tinh: Loại bỏ tạp chất nhỏ
- Lọc cuối: Đảm bảo độ trong suốt

**Tiêu chuẩn:**
- Độ trong suốt: > 95%
- Không có cặn
- Màu sắc tự nhiên

### Giai đoạn 5: Kiểm tra chất lượng

**Các chỉ tiêu kiểm tra:**
- Độ acid (FFA): < 2%
- Chỉ số peroxit (PV): < 10 meq/kg
- Độ ẩm: < 0.2%
- Vi sinh: Không phát hiện
- Kim loại nặng: Trong ngưỡng an toàn

## Hệ thống kiểm soát tự động

### Cảm biến và giám sát

AnaOi sử dụng hệ thống cảm biến để:
- Theo dõi nhiệt độ liên tục
- Giám sát áp suất
- Đo lường chất lượng dầu
- Ghi nhận dữ liệu tự động

### Hệ thống báo động

Khi phát hiện bất thường:
- Báo động ngay lập tức
- Tự động dừng quy trình nếu cần
- Ghi nhận sự cố
- Thông báo cho kỹ sư

### Ghi nhận và lưu trữ

Mọi dữ liệu được:
- Ghi nhận tự động
- Lưu trữ điện tử
- Có thể truy xuất bất cứ lúc nào
- Phục vụ kiểm tra và cải tiến

## Chứng nhận và tiêu chuẩn

AnaOi đạt các tiêu chuẩn:
- ISO 22000 (An toàn thực phẩm)
- HACCP
- Tiêu chuẩn ép lạnh quốc tế
- Chứng nhận chất lượng Việt Nam

## Lợi ích của quy trình chuẩn hóa

### Cho người tiêu dùng

- Chất lượng đồng đều
- An toàn thực phẩm
- Đảm bảo dưỡng chất
- Tin cậy vào thương hiệu

### Cho AnaOi

- Kiểm soát chất lượng tốt hơn
- Giảm lãng phí
- Tăng hiệu quả sản xuất
- Xây dựng uy tín

## Cải tiến liên tục

AnaOi không ngừng:
- Nghiên cứu công nghệ mới
- Cải thiện quy trình
- Tối ưu hóa hiệu suất
- Nâng cao chất lượng

## Cam kết của AnaOi

Chúng tôi cam kết:
- Tuân thủ nghiêm ngặt quy trình chuẩn hóa
- Kiểm soát chất lượng ở mọi khâu
- Đảm bảo độ tinh khiết của từng giọt dầu
- Minh bạch trong quy trình sản xuất

# Kết luận

Quy trình ép lạnh được chuẩn hóa nghiêm ngặt của AnaOi đảm bảo mỗi giọt dầu đều đạt chất lượng cao nhất, giữ trọn dưỡng chất và hương vị tự nhiên từ thiên nhiên Tây Nguyên.
  `,
};

blogData[16] = {
  id: 16,
  title: 'Đổi mới trong từng giọt dầu: cách AnaOi kết hợp công nghệ và thiên nhiên để tạo nên chất lượng vượt trội',
  category: 'Công nghệ đột phá',
  date: '05/12/2025',
  author: 'Tiến sĩ Trần Văn Hùng',
  views: 1980,
  initialLikes: 167,
  content: `
# Đổi mới trong từng giọt dầu

AnaOi là sự kết hợp hoàn hảo giữa công nghệ tiên tiến và thiên nhiên thuần khiết, tạo nên những sản phẩm chất lượng vượt trội.

## Triết lý của AnaOi

Chúng tôi tin rằng công nghệ và thiên nhiên không phải là đối thủ mà là đối tác hoàn hảo. Công nghệ giúp chúng tôi tôn trọng và bảo tồn những gì tốt nhất từ thiên nhiên.

## Sự kết hợp hoàn hảo

### Thiên nhiên cung cấp

**Nguyên liệu chất lượng:**
- Đất đỏ bazan màu mỡ của Tây Nguyên
- Khí hậu ôn hòa, phù hợp cho canh tác
- Nguồn nước sạch tự nhiên
- Giống cây trồng bản địa

**Dưỡng chất tự nhiên:**
- Vitamin và khoáng chất
- Chất chống oxi hóa
- Axit béo tốt
- Hợp chất thực vật có lợi

### Công nghệ hỗ trợ

**Bảo tồn dưỡng chất:**
- Công nghệ ép lạnh giữ nguyên vitamin
- Kiểm soát nhiệt độ chính xác
- Quy trình không qua tinh luyện

**Đảm bảo chất lượng:**
- Hệ thống kiểm tra tự động
- Truy xuất nguồn gốc thông minh
- Quy trình chuẩn hóa

## Công nghệ đột phá của AnaOi

### 1. Công nghệ ép lạnh tiên tiến

**Máy ép thủy lực hiện đại:**
- Kiểm soát nhiệt độ chính xác đến từng độ
- Áp suất điều chỉnh tự động
- Tốc độ ép tối ưu

**Kết quả:**
- Giữ được 90-95% dưỡng chất
- Hương vị tự nhiên
- Màu sắc đẹp mắt

### 2. Hệ thống kiểm soát chất lượng

**Tự động hóa:**
- Cảm biến theo dõi liên tục
- Báo động khi phát hiện bất thường
- Ghi nhận dữ liệu tự động

**Đảm bảo:**
- Chất lượng đồng đều
- An toàn thực phẩm
- Tuân thủ tiêu chuẩn

### 3. Công nghệ truy xuất nguồn gốc

**Mã QR thông minh:**
- Thông tin đầy đủ về sản phẩm
- Lịch sử từ nông trại đến bàn ăn
- Minh bạch hoàn toàn

**Lợi ích:**
- Người tiêu dùng yên tâm
- Xây dựng niềm tin
- Tăng giá trị sản phẩm

## Đổi mới trong từng khâu

### Nông trại thông minh

**Công nghệ hỗ trợ:**
- Cảm biến theo dõi đất và nước
- Hệ thống tưới tiêu tự động
- Quản lý bằng phần mềm

**Kết quả:**
- Tối ưu điều kiện canh tác
- Tăng chất lượng nguyên liệu
- Giảm lãng phí

### Quy trình sản xuất

**Tự động hóa:**
- Kiểm soát nhiệt độ tự động
- Điều chỉnh áp suất thông minh
- Lọc và đóng chai tự động

**Kết quả:**
- Chất lượng đồng đều
- Hiệu suất cao
- Giảm sai sót

### Đóng gói và phân phối

**Công nghệ bảo quản:**
- Chai tối màu bảo vệ khỏi ánh sáng
- Niêm phong kín tránh oxi hóa
- Hệ thống bảo quản tối ưu

**Kết quả:**
- Giữ chất lượng lâu dài
- Bảo vệ dưỡng chất
- Tăng thời hạn sử dụng

## Tác động tích cực

### Với môi trường

- Giảm lãng phí nguyên liệu
- Sử dụng năng lượng hiệu quả
- Hỗ trợ nông nghiệp bền vững
- Giảm tác động môi trường

### Với nông dân

- Tăng giá trị sản phẩm
- Công nhận chất lượng
- Hỗ trợ phát triển bền vững
- Cải thiện đời sống

### Với người tiêu dùng

- Sản phẩm chất lượng cao
- An toàn thực phẩm
- Minh bạch nguồn gốc
- Giá trị dinh dưỡng cao

## Tương lai của AnaOi

AnaOi không ngừng đổi mới:

**Công nghệ mới:**
- Nghiên cứu phương pháp ép mới
- Ứng dụng AI trong kiểm soát chất lượng
- Blockchain cho truy xuất nguồn gốc

**Sản phẩm mới:**
- Mở rộng dòng sản phẩm
- Kết hợp các nguyên liệu mới
- Phát triển công thức độc đáo

**Bền vững:**
- Giảm tác động môi trường
- Hỗ trợ nông nghiệp xanh
- Phát triển bền vững

## Cam kết của AnaOi

Chúng tôi cam kết:
- Kết hợp công nghệ và thiên nhiên một cách hài hòa
- Không ngừng đổi mới và cải tiến
- Đảm bảo chất lượng vượt trội
- Phát triển bền vững

# Kết luận

AnaOi là minh chứng cho việc công nghệ và thiên nhiên có thể kết hợp hoàn hảo để tạo nên những sản phẩm chất lượng vượt trội. Mỗi giọt dầu AnaOi đều mang trong mình sự kết hợp này, mang đến giá trị dinh dưỡng và sức khỏe cho người tiêu dùng.
  `,
};

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
          <Typography key={index} variant="h3" sx={{ fontWeight: 700, color: bronzeYellow, mt: 4, mb: 2 }}>
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
            <Typography variant="body1" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 400, color: '#444', lineHeight: 1.8 }}>
              {line.substring(2)}
            </Typography>
          </Box>
        );
      }
      
      // Normal paragraph
      return (
        <Typography key={index} variant="body1" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 400, color: '#444', mb: 2, lineHeight: 1.8, textAlign: 'justify' }}>
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
          <Typography sx={{ ml: 1 }}>Quay lại</Typography>
        </IconButton>

        {/* Category Chip */}
        <Chip
          label={blog.category}
          sx={{
            backgroundColor: `${americanYellow}20`,
            color: bronzeYellow,
            fontWeight: 600,
            mb: 2,
          }}
        />

        {/* Blog Title */}
        <Typography
          variant="h3"
          sx={{
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
            <Typography variant="body2" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 400, color: '#999' }}>
              {blog.date}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <VisibilityIcon sx={{ fontSize: 18, color: '#999' }} />
            <Typography variant="body2" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 400, color: '#999' }}>
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
            <Typography variant="body2" sx={{ fontFamily: "'VNM Sans Display', sans-serif", fontWeight: 400, color: liked ? '#f44336' : '#999' }}>
              {likeCount.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Author */}
        <Typography variant="body2" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 400, color: '#666', fontStyle: 'italic', mb: 4 }}>
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
          <Typography variant="h6" sx={{ color: bronzeYellow, mb: 2 }}>
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
          <Typography variant="body1" sx={{ fontFamily: "'VNM Sans Std', sans-serif", fontWeight: 400, color: '#666', mt: 1 }}>
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

