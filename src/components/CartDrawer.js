import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from '../context/CartContext';

const primaryColor = '#F7F3CD';
const bronzeYellow = '#667B00';
const americanYellow = '#EDB500';

function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={closeCart}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          backgroundColor: '#FDFCF5',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            backgroundColor: primaryColor,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: bronzeYellow,
            }}
          >
            Giỏ hàng {getTotalItems() > 0 && `(${getTotalItems()})`}
          </Typography>
          <IconButton onClick={closeCart} sx={{ color: bronzeYellow }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {cartItems.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#999',
                  mb: 2,
                }}
              >
                Giỏ hàng trống
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#999',
                }}
              >
                Hãy thêm sản phẩm vào giỏ hàng!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cartItems.map((item, index) => (
                <Box
                  key={`${item.id}-${item.size}`}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    p: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Product Image */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: primaryColor,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: 8,
                        }}
                      />
                    </Box>

                    {/* Product Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {/* Category */}
                      {item.category && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: americanYellow,
                            fontWeight: 600,
                            display: 'block',
                            mb: 0.5,
                          }}
                        >
                          {item.category}
                        </Typography>
                      )}

                      {/* Name */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: bronzeYellow,
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.name}
                      </Typography>

                      {/* Size */}
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#666',
                          display: 'block',
                          mb: 1,
                        }}
                      >
                        Dung tích: {item.size}
                      </Typography>

                      {/* Price */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: americanYellow,
                        }}
                      >
                        {item.price.toLocaleString('vi-VN')}₫
                      </Typography>
                    </Box>

                    {/* Delete Button */}
                    <IconButton
                      onClick={() => removeFromCart(item.id, item.size)}
                      sx={{
                        color: '#999',
                        height: 36,
                        width: 36,
                        '&:hover': {
                          color: '#f44336',
                          backgroundColor: 'rgba(244, 67, 54, 0.08)',
                        },
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Quantity Controls */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: `1px solid ${bronzeYellow}40`,
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        sx={{
                          borderRadius: 0,
                          color: bronzeYellow,
                          px: 1,
                          '&:hover': {
                            backgroundColor: `${bronzeYellow}15`,
                          },
                          '&.Mui-disabled': {
                            color: `${bronzeYellow}40`,
                          },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: bronzeYellow,
                          px: 2,
                          fontSize: '0.9rem',
                          minWidth: 40,
                          textAlign: 'center',
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        sx={{
                          borderRadius: 0,
                          color: bronzeYellow,
                          px: 1,
                          '&:hover': {
                            backgroundColor: `${bronzeYellow}15`,
                          },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Subtotal */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: bronzeYellow,
                      }}
                    >
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Footer - Total and Checkout */}
        {cartItems.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 2, backgroundColor: primaryColor }}>
              {/* Subtotal */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: bronzeYellow,
                  }}
                >
                  Tổng sản phẩm:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: bronzeYellow,
                  }}
                >
                  {getTotalItems()} sản phẩm
                </Typography>
              </Box>

              {/* Total */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: bronzeYellow,
                  }}
                >
                  Tổng tiền:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: americanYellow,
                  }}
                >
                  {getTotalPrice().toLocaleString('vi-VN')}₫
                </Typography>
              </Box>

              {/* Checkout Button */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: americanYellow,
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: bronzeYellow,
                  },
                }}
              >
                Tiến hành thanh toán
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default CartDrawer;

