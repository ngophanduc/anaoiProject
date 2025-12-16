# Hướng dẫn Multi-Screen Support

## Breakpoints

Project đã được cấu hình với các breakpoints sau:

- **xs**: 0px - 599px (Mobile)
- **sm**: 600px - 959px (Tablet nhỏ)
- **md**: 960px - 1279px (Tablet/Desktop nhỏ)
- **lg**: 1280px - 1919px (Desktop lớn)
- **xl**: 1920px+ (Màn hình rất lớn)

## Cách sử dụng

### 1. Sử dụng sx prop với breakpoints

```jsx
<Box
  sx={{
    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem', xl: '2rem' },
    padding: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
    display: { xs: 'block', md: 'flex' },
  }}
>
  Content
</Box>
```

### 2. Sử dụng hook useResponsive

```jsx
import { useResponsive } from '../utils/useResponsive';

function MyComponent() {
  const fontSize = useResponsive({
    xs: '1rem',
    sm: '1.2rem',
    md: '1.5rem',
    lg: '1.8rem',
    xl: '2rem'
  });

  return <Typography sx={{ fontSize }}>Text</Typography>;
}
```

### 3. Sử dụng hook useBreakpoint

```jsx
import { useBreakpoint } from '../utils/useResponsive';

function MyComponent() {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useBreakpoint();

  if (isMobile) {
    return <MobileView />;
  }

  return <DesktopView />;
}
```

## Best Practices

1. **Luôn bắt đầu với mobile-first**: Thiết kế cho mobile trước, sau đó mở rộng cho các màn hình lớn hơn
2. **Sử dụng breakpoints nhất quán**: Dùng cùng một pattern breakpoints trong toàn bộ project
3. **Test trên nhiều kích thước màn hình**: Đảm bảo UI hoạt động tốt trên tất cả các breakpoints
4. **Ưu tiên sx prop**: Sử dụng `sx` prop của MUI thay vì CSS thuần để có type safety tốt hơn

## Ví dụ áp dụng

### Typography
```jsx
<Typography
  sx={{
    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem' },
    lineHeight: { xs: 1.5, md: 1.6, lg: 1.7 },
  }}
>
  Text
</Typography>
```

### Spacing
```jsx
<Box
  sx={{
    padding: { xs: 2, sm: 3, md: 4, lg: 5 },
    margin: { xs: 1, md: 2, lg: 3 },
    gap: { xs: 2, sm: 3, md: 4 },
  }}
>
  Content
</Box>
```

### Grid Layout
```jsx
<Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    Item
  </Grid>
</Grid>
```

