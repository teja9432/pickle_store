'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
  useTheme,
  Divider,
} from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryFilters from '../components/CategoryFilters';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import CartDrawer from '../components/CartDrawer';
import { mockProducts } from '../data/products';
import { Product } from '../types/product';

export default function Home() {
  const theme = useTheme();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Filter products based on selected tab/category
  const filteredProducts = mockProducts.filter((product) => {
    if (selectedCategory === 'All') return true;

    if (selectedCategory === 'Veg') {
      return product.category !== 'Non-Veg' && !product.tags.includes('Premium Non-Veg');
    }

    if (selectedCategory === 'Non-Veg') {
      return product.category === 'Non-Veg' || product.tags.includes('Premium Non-Veg');
    }

    if (selectedCategory === 'Spicy') {
      return (
        product.category === 'Spicy' ||
        product.tags.some((tag) => ['extra spicy', 'spicy', 'super hot'].includes(tag.toLowerCase()))
      );
    }

    if (selectedCategory === 'Sweet') {
      return (
        product.category === 'Sweet' ||
        product.tags.some((tag) => ['sweet', 'sweet tooth'].includes(tag.toLowerCase()))
      );
    }

    return true;
  });

  const handleOpenDetail = (product: Product) => {
    setActiveProduct(product);
  };

  const handleCloseDetail = () => {
    setActiveProduct(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAF6' }}>
      {/* Sticky header navbar */}
      <Header onCartClick={() => setCartOpen(true)} />

      {/* Hero section banner */}
      <Hero />

      {/* Trust Badges Bar */}
      <Container maxWidth="lg" sx={{ mt: -6, mb: 10, position: 'relative', zIndex: 10 }}>
        <Card
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            boxShadow: '0px 10px 30px rgba(26, 63, 34, 0.08)',
            border: '1px solid rgba(26, 63, 34, 0.08)',
            p: 3,
          }}
        >
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <SpaIcon color="primary" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    100% Preservative Free
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Salt, oil & vinegar are our only preservatives.
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <WorkspacePremiumIcon color="primary" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    Sun-Dried & Pots Cured
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Matured in traditional clay Barnis under daylight.
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <ElectricBoltIcon color="primary" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    Instant WhatsApp checkout
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    No card required, quick order review on chat.
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Container>

      {/* Catalog Storefront catalog grid */}
      <Container id="catalog" maxWidth="lg" sx={{ mb: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            color="primary"
            gutterBottom
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Explore our Barnis of Flavors
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', mb: 4, fontSize: { xs: '0.95rem', md: '1.05rem' } }}
          >
            Select from our curated array of hand-poured pickles. Choose your weight option and checkout directly to WhatsApp for personalized shipping.
          </Typography>

          {/* Interactive Chips filter */}
          <CategoryFilters selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </Box>

        {/* Responsive Product Grid */}
        <ProductGrid products={filteredProducts} onOpenDetail={handleOpenDetail} />
      </Container>

      {/* Our Story section */}
      <Box id="story" sx={{ backgroundColor: '#1A3F22', color: '#FFF', py: { xs: 8, md: 12 }, position: 'relative' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800"
                alt="Slow Pot Curing Pickles"
                sx={{
                  width: '100%',
                  height: 380,
                  objectFit: 'cover',
                  borderRadius: 6,
                  boxShadow: '0px 15px 30px rgba(0,0,0,0.3)',
                  border: '3px solid rgba(255, 255, 255, 0.1)',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                component="span"
                sx={{ color: '#D97706', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', mb: 1, display: 'block' }}
              >
                The Art of Curing
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' } }}
              >
                Cured in clay pots, matured by the Sun
              </Typography>
              <Typography variant="body1" sx={{ color: '#D1D5DB', mb: 3, lineHeight: 1.8 }}>
                Every single pickle in Dadi's Barni is cooked in small batches. We use traditional cold-pressed mustard oil, sea salt, and spices that are hand-milled on stone grinders to preserve the active essential oils.
              </Typography>
              <Typography variant="body1" sx={{ color: '#D1D5DB', mb: 4, lineHeight: 1.8 }}>
                Unlike commercial factories that use chemical curing and artificial acids, our pickles sit patiently in massive earthenware jars under the sun for up to 40 days, naturally developing complex layers of lactic-acid flavor.
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                sx={{
                  color: '#D97706',
                  borderColor: '#D97706',
                  '&:hover': {
                    backgroundColor: 'rgba(217,119,6,0.1)',
                    borderColor: '#F59E0B',
                  },
                }}
                onClick={() => {
                  const element = document.getElementById('catalog');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Taste the Difference
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer Block */}
      <Box sx={{ backgroundColor: '#0F2614', color: '#FFF', pt: 8, pb: 4, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 800, color: '#D97706', mb: 2 }}>
                Dadi's Barni
              </Typography>
              <Typography variant="body2" sx={{ color: '#9CA3AF', pr: 4, lineHeight: 1.6 }}>
                Handcrafted premium Indian pickles, bringing back heirloom family recipes cured without artificial chemicals or cheap filler oils.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Store Sections
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: '#9CA3AF', cursor: 'pointer', '&:hover': { color: '#D97706' } }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Home
                </Typography>
                <Typography variant="body2" sx={{ color: '#9CA3AF', cursor: 'pointer', '&:hover': { color: '#D97706' } }} onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore catalog
                </Typography>
                <Typography variant="body2" sx={{ color: '#9CA3AF', cursor: 'pointer', '&:hover': { color: '#D97706' } }} onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>
                  Curing philosophy
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={3} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Ordering Details
              </Typography>
              <Typography variant="body2" sx={{ color: '#9CA3AF', mb: 2 }}>
                📍 Local Shipping: FREE (Bengaluru, starting with pincode 560)
              </Typography>
              <Typography variant="body2" sx={{ color: '#9CA3AF', mb: 2 }}>
                ✈️ Nationwide Standard: ₹60 flat rate
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/919381475014"
                target="_blank"
                sx={{
                  backgroundColor: '#25D366',
                  color: '#FFF',
                  '&:hover': { backgroundColor: '#128C7E' },
                  boxShadow: 'none',
                }}
              >
                Chat Support
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 4 }} />

          <Typography variant="body2" align="center" sx={{ color: '#6B7280' }}>
            &copy; {new Date().getFullYear()} Dadi's Barni Pickles. Handcrafted in India. All Rights Reserved.
          </Typography>
        </Container>
      </Box>

      {/* Cart Drawer sliding sidebar */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Product details dialog modal */}
      <ProductModal product={activeProduct} open={activeProduct !== null} onClose={handleCloseDetail} />
    </Box>
  );
}
