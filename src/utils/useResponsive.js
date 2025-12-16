import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

/**
 * Hook tiện ích để lấy giá trị responsive dựa trên breakpoints
 * 
 * @param {Object} values - Object chứa giá trị cho từng breakpoint
 * @param {*} values.xs - Giá trị cho mobile (0px+)
 * @param {*} values.sm - Giá trị cho tablet nhỏ (600px+)
 * @param {*} values.md - Giá trị cho tablet/desktop nhỏ (960px+)
 * @param {*} values.lg - Giá trị cho desktop lớn (1280px+)
 * @param {*} values.xl - Giá trị cho màn hình rất lớn (1920px+)
 * @returns {*} Giá trị phù hợp với màn hình hiện tại
 * 
 * @example
 * const fontSize = useResponsive({
 *   xs: '1rem',
 *   sm: '1.2rem',
 *   md: '1.5rem',
 *   lg: '1.8rem',
 *   xl: '2rem'
 * });
 */
export const useResponsive = (values) => {
  const theme = useTheme();
  
  // Kiểm tra từ lớn đến nhỏ để lấy giá trị phù hợp nhất
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  
  if (isXl && values.xl !== undefined) return values.xl;
  if (isLg && values.lg !== undefined) return values.lg;
  if (isMd && values.md !== undefined) return values.md;
  if (isSm && values.sm !== undefined) return values.sm;
  
  return values.xs !== undefined ? values.xs : values.md || values.sm || values.lg || values.xl;
};

/**
 * Hook để kiểm tra breakpoint hiện tại
 * @returns {Object} Object chứa các boolean cho từng breakpoint
 */
export const useBreakpoint = () => {
  const theme = useTheme();
  
  return {
    xs: useMediaQuery(theme.breakpoints.only('xs')),
    sm: useMediaQuery(theme.breakpoints.only('sm')),
    md: useMediaQuery(theme.breakpoints.only('md')),
    lg: useMediaQuery(theme.breakpoints.only('lg')),
    xl: useMediaQuery(theme.breakpoints.only('xl')),
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
    isTablet: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    isDesktop: useMediaQuery(theme.breakpoints.up('md')),
    isLargeDesktop: useMediaQuery(theme.breakpoints.up('lg')),
  };
};

