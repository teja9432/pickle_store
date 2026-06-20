'use client';

import React from 'react';
import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Hero() {
  const theme = useTheme();

  const handleExploreClick = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="hero"
      className="bg-grid"
      sx={{
        position: 'relative',
        backgroundColor: '#1A3F22', // Forest Green
        backgroundImage: 'linear-gradient(135deg, #1A3F22 0%, #0F2614 100%)',
        color: '#FFF',
        pt: { xs: 12, md: 18 },
        pb: { xs: 14, md: 20 },
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to top, #F9FAF6 0%, transparent 100%)',
        },
      }}
    >
      {/* Decorative Spice Circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box sx={{ animation: 'fadeIn 0.8s ease-out' }}>
              <Typography
                component="span"
                sx={{
                  color: '#D97706',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontSize: '0.9rem',
                  display: 'inline-block',
                  mb: 2,
                  border: '1px solid rgba(217,119,6,0.3)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(217,119,6,0.1)',
                }}
              >
                100% Traditional & Sun-Cured
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  fontWeight: 800,
                }}
              >
                A taste of history, <br />
                <Typography
                  component="span"
                  variant="inherit"
                  sx={{
                    color: '#D97706',
                    background: 'linear-gradient(45deg, #F59E0B 30%, #FBBF24 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  cured in oil & love.
                </Typography>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  color: '#D1D5DB',
                  mb: 4,
                  maxWidth: '540px',
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                }}
              >
                Handcrafted pickles with premium spices and wood-pressed oils. Matured slow under the hot summer sun in traditional earthen jars.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleExploreClick}
                  endIcon={<ArrowDownwardIcon />}
                  sx={{
                    fontSize: '1rem',
                    py: 1.8,
                    px: 4,
                    boxShadow: '0px 10px 20px rgba(217, 119, 6, 0.3)',
                    '&:hover': {
                      boxShadow: '0px 15px 25px rgba(217, 119, 6, 0.45)',
                    },
                  }}
                >
                  Explore our Catalog
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                animation: 'fadeIn 1s ease-out',
              }}
            >
              {/* Spinning background element */}
              <Box
                sx={{
                  position: 'absolute',
                  width: { xs: '280px', sm: '380px', md: '420px' },
                  height: { xs: '280px', sm: '380px', md: '420px' },
                  border: '2px dashed rgba(217,119,6,0.3)',
                  borderRadius: '50%',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="spin-slow"
              />

              {/* Main premium image container */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '260px', sm: '350px', md: '380px' },
                  height: { xs: '260px', sm: '350px', md: '380px' },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  zIndex: 2,
                  boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
                  border: '4px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Box
                  component="img"
                  src="/hero_pickle.png"
                  alt="Delicious Traditional Pickles"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
