'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Box,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Divider,
  Stack,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, open, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [selectedWeight, setSelectedWeight] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Set default weight when product opens
  useEffect(() => {
    if (product) {
      const weights = Object.keys(product.pricePerWeight);
      if (weights.length > 0) {
        setSelectedWeight(weights[0]);
      }
      setQuantity(1); // Reset quantity counter
    }
  }, [product]);

  if (!product) return null;

  const weights = Object.keys(product.pricePerWeight);
  const price = product.pricePerWeight[selectedWeight] || 0;
  const totalPrice = price * quantity;

  const handleWeightChange = (event: SelectChangeEvent) => {
    setSelectedWeight(event.target.value);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addItem(product, selectedWeight, quantity);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="body"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
        },
      }}
    >
      {/* Close button overlay */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          color: '#1A3F22',
          '&:hover': {
            backgroundColor: '#1A3F22',
            color: '#FFFFFF',
          },
          boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Grid container>
          {/* Image Pane */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: { xs: 280, md: '100%' },
                minHeight: { md: 480 },
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Category tag */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  zIndex: 2,
                }}
              >
                <Chip
                  label={product.category}
                  color={product.category === 'Non-Veg' ? 'error' : 'success'}
                  sx={{ fontWeight: 'bold', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Details Pane */}
          <Grid item xs={12} md={7}>
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              {/* Product Name */}
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 800,
                  color: '#1A3F22',
                  mb: 1,
                  pr: 4,
                }}
              >
                {product.name}
              </Typography>

              {/* Tags stack */}
              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                {product.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ color: '#D97706', borderColor: '#D97706', fontWeight: 500 }}
                  />
                ))}
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {/* Detailed Description */}
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
                {product.descriptionLong || product.description}
              </Typography>

              {/* Ingredients section */}
              {product.ingredients && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.primary"
                    sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', mb: 1.5 }}
                  >
                    <MenuBookIcon sx={{ fontSize: 18, mr: 1, color: '#1A3F22' }} />
                    Ingredients:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {product.ingredients.map((ing) => (
                      <Chip key={ing} label={ing} size="small" variant="filled" sx={{ backgroundColor: '#F1F5F9' }} />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Shelf Life section */}
              {product.shelfLife && (
                <Alert
                  severity="info"
                  icon={<EventAvailableIcon sx={{ color: '#1A3F22' }} />}
                  sx={{
                    mb: 4,
                    backgroundColor: 'rgba(26, 63, 34, 0.05)',
                    color: '#1A3F22',
                    borderRadius: 2,
                    border: '1px solid rgba(26, 63, 34, 0.1)',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    <strong>Shelf Life:</strong> {product.shelfLife}
                  </Typography>
                </Alert>
              )}

              <Divider sx={{ mb: 3 }} />

              {/* Add to Cart Options Block */}
              <Grid container spacing={2} alignItems="center">
                {/* Weight Dropdown */}
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="modal-weight-label">Select Weight</InputLabel>
                    <Select
                      labelId="modal-weight-label"
                      id="modal-weight-select"
                      value={selectedWeight}
                      label="Select Weight"
                      onChange={handleWeightChange}
                    >
                      {weights.map((w) => (
                        <MenuItem key={w} value={w}>
                          {w}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Quantity Counter */}
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid #CBD5E1',
                      borderRadius: 2,
                      px: 1,
                      height: 40,
                    }}
                  >
                    <IconButton size="small" onClick={handleDecrement} disabled={quantity <= 1}>
                      <RemoveIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Typography sx={{ fontWeight: 'bold' }}>{quantity}</Typography>
                    <IconButton size="small" onClick={handleIncrement}>
                      <AddIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </Grid>

                {/* Price Display and Add Button */}
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Price
                    </Typography>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 800 }}>
                      ₹{totalPrice}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAddToCart}
                    startIcon={<ShoppingBagIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: '0px 8px 20px rgba(26, 63, 34, 0.25)',
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
