'use client';

import React from 'react';
import { Box, Chip, Stack } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SpaIcon from '@mui/icons-material/Spa';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HiveIcon from '@mui/icons-material/Hive';
import KebabDiningIcon from '@mui/icons-material/KebabDining';

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilters({
  selectedCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  const categories = [
    { label: 'All Store', value: 'All', icon: <RestaurantMenuIcon /> },
    { label: 'Veg', value: 'Veg', icon: <SpaIcon /> },
    { label: 'Non-Veg', value: 'Non-Veg', icon: <KebabDiningIcon /> },
    { label: 'Spicy', value: 'Spicy', icon: <LocalFireDepartmentIcon /> },
    { label: 'Sweet', value: 'Sweet', icon: <HiveIcon /> },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mb: 6,
        overflowX: 'auto',
        pb: 1,
        // Hide scrollbar but keep horizontal scroll function
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          px: { xs: 2, md: 0 },
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <Chip
              key={cat.value}
              icon={React.cloneElement(cat.icon, {
                style: { color: isSelected ? '#FFFFFF' : '#4B5563' },
              })}
              label={cat.label}
              onClick={() => onCategoryChange(cat.value)}
              sx={{
                py: 2.5,
                px: 1.5,
                fontSize: '0.95rem',
                backgroundColor: isSelected ? '#1A3F22' : 'rgba(26, 63, 34, 0.04)',
                color: isSelected ? '#FFFFFF' : '#111827',
                border: isSelected ? '1px solid #1A3F22' : '1px solid rgba(26, 63, 34, 0.1)',
                boxShadow: isSelected ? '0px 4px 12px rgba(26, 63, 34, 0.2)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: isSelected ? '#2E5A36' : 'rgba(26, 63, 34, 0.08)',
                  transform: 'translateY(-2px)',
                  boxShadow: isSelected ? '0px 6px 15px rgba(26, 63, 34, 0.3)' : '0px 4px 10px rgba(0, 0, 0, 0.03)',
                },
                '& .MuiChip-icon': {
                  marginLeft: 1.5,
                  fontSize: 20,
                },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
