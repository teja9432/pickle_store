'use client';

import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types/product';
import MoodBadIcon from '@mui/icons-material/MoodBad';

interface ProductGridProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
}

export default function ProductGrid({ products, onOpenDetail }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          px: 2,
          textAlign: 'center',
        }}
      >
        <MoodBadIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
          No Pickles Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
          We couldn't find any items matching your selected category. Try selecting another filter!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 3, md: 4 }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} className="fade-in">
          <ProductCard product={product} onOpenDetail={onOpenDetail} />
        </Grid>
      ))}
    </Grid>
  );
}
