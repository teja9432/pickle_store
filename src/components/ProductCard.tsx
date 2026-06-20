'use client';

import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const { addItem } = useCart();
  const weights = Object.keys(product.pricePerWeight);
  const [selectedWeight, setSelectedWeight] = useState(weights[0] || '250g');

  const price = product.pricePerWeight[selectedWeight];

  const handleWeightChange = (event: SelectChangeEvent) => {
    setSelectedWeight(event.target.value);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card details modal open
    addItem(product, selectedWeight, 1);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(26, 63, 34, 0.08)',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Decorative tag overlays */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        {product.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            color={
              tag.toLowerCase().includes('best')
                ? 'secondary'
                : tag.toLowerCase().includes('spicy')
                ? 'error'
                : 'primary'
            }
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            }}
          />
        ))}
      </Box>

      {/* Detail Button Overlay */}
      <IconButton
        onClick={() => onOpenDetail(product)}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          color: '#1A3F22',
          '&:hover': {
            backgroundColor: '#1A3F22',
            color: '#FFFFFF',
          },
          boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>

      {/* Card Image */}
      <Box sx={{ overflow: 'hidden', height: 220, position: 'relative', cursor: 'pointer' }} onClick={() => onOpenDetail(product)}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.08)',
            },
          }}
        />
        {!product.inStock && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <Typography variant="h6" color="white" fontWeight="bold">
              SOLD OUT
            </Typography>
          </Box>
        )}
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 3,
        }}
      >
        <Box>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: '1.25rem',
              lineHeight: 1.3,
              cursor: 'pointer',
              color: '#1A3F22',
              '&:hover': {
                color: '#D97706',
              },
            }}
            onClick={() => onOpenDetail(product)}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 40,
            }}
          >
            {product.description}
          </Typography>
        </Box>

        <Box>
          {/* Price and Weight Selector */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
              ₹{price}
            </Typography>

            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id={`weight-label-${product.id}`}>Weight</InputLabel>
              <Select
                labelId={`weight-label-${product.id}`}
                id={`weight-select-${product.id}`}
                value={selectedWeight}
                label="Weight"
                onChange={handleWeightChange}
                onClick={(e) => e.stopPropagation()} // Stop modal triggers
                sx={{
                  borderRadius: 2,
                  fontSize: '0.85rem',
                }}
              >
                {weights.map((w) => (
                  <MenuItem key={w} value={w}>
                    {w}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Action Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!product.inStock}
            onClick={handleAddToCart}
            startIcon={<AddShoppingCartIcon />}
            sx={{
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: '#1A3F22',
              '&:hover': {
                backgroundColor: '#D97706',
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
