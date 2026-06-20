'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Container,
  Button,
  useScrollTrigger,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const { cartCount } = useCart();
  const [pulse, setPulse] = useState(false);

  // Trigger pulse effect on cart count change
  useEffect(() => {
    if (cartCount > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 800);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Elevation trigger on scroll
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: trigger ? 'rgba(26, 63, 34, 0.95)' : 'rgba(26, 63, 34, 0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: trigger ? '0px 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
        transition: 'all 0.3s ease-in-out',
        borderBottom: trigger ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: 70, md: 80 } }}>
          {/* Logo Section */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => scrollToSection('hero')}
          >
            <EnergySavingsLeafIcon sx={{ color: '#D97706', fontSize: 32, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 800,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                letterSpacing: '.5px',
                color: '#FFF',
                background: 'linear-gradient(45deg, #FFF 60%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dadi's Barni
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button onClick={() => scrollToSection('hero')} sx={{ color: '#E5E7EB', '&:hover': { color: '#F59E0B' } }}>
              Home
            </Button>
            <Button onClick={() => scrollToSection('catalog')} sx={{ color: '#E5E7EB', '&:hover': { color: '#F59E0B' } }}>
              Store Catalog
            </Button>
            <Button onClick={() => scrollToSection('story')} sx={{ color: '#E5E7EB', '&:hover': { color: '#F59E0B' } }}>
              Our Story
            </Button>
          </Box>

          {/* Cart Icon Button */}
          <IconButton
            color="inherit"
            aria-label="shopping cart"
            onClick={onCartClick}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              padding: 1.5,
              borderRadius: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              '&:hover': {
                backgroundColor: '#D97706',
                transform: 'scale(1.05)',
              },
              ...(pulse && {
                animation: 'pulse 0.8s ease-in-out',
                backgroundColor: '#D97706',
              }),
            }}
          >
            <Badge
              badgeContent={cartCount}
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  height: 20,
                  minWidth: 20,
                  backgroundColor: '#D97706',
                  color: '#FFF',
                  border: '2px solid #1A3F22',
                  ...(pulse && {
                    transform: 'scale(1.3) translate(50%, -50%)',
                    transition: 'transform 0.2s',
                  }),
                },
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
