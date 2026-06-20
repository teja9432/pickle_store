'use client';

import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  Stack,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useCart } from '../context/CartContext';
import { generateWhatsAppLink, isLocalPincode, OrderFormData } from '../utils/whatsapp';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, updateQuantity, removeItem, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'shipping' | 'checkout'>('cart');
  const [loading, setLoading] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [altPhone, setAltPhone] = useState('');

  // Error states
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const shippingFee = pincode ? (isLocalPincode(pincode) ? 0 : 60) : 60;
  const finalTotal = cartTotal + shippingFee;

  const handleNextStep = () => {
    if (step === 'cart') {
      setStep('shipping');
    } else if (step === 'shipping') {
      // Validate shipping form
      const newErrors: { [key: string]: boolean } = {};
      if (!fullName.trim()) newErrors.fullName = true;
      if (!address.trim()) newErrors.address = true;
      if (!pincode.trim() || pincode.trim().length < 6) newErrors.pincode = true;

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setStep('checkout');
      }
    }
  };

  const handleBackStep = () => {
    if (step === 'shipping') {
      setStep('cart');
    } else if (step === 'checkout') {
      setStep('shipping');
    }
  };

  const handlePlaceOrder = () => {
    setLoading(true);

    const formData: OrderFormData = {
      fullName,
      address,
      pincode,
      altPhone,
    };

    // Merchant details: Let's use a dummy or custom Indian number (e.g. +91 98765 43210 or similar)
    const merchantPhoneNumber = '919381475014'; 

    const url = generateWhatsAppLink(formData, cartItems, cartTotal, shippingFee, merchantPhoneNumber);

    // Simulate 1.5s loading state for luxury food brand look, then redirect
    setTimeout(() => {
      setLoading(false);
      window.open(url, '_blank');
      // Optionally clean up
      clearCart();
      setStep('cart');
      onClose();
    }, 1500);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 450 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 0,
        },
      }}
    >
      {/* HEADER BLOCK */}
      <Box
        sx={{
          p: 3,
          backgroundColor: '#1A3F22',
          color: '#FFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {step !== 'cart' && (
            <IconButton onClick={handleBackStep} sx={{ color: '#FFF', p: 0, mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
            {step === 'cart' ? 'Your Shopping Jar' : step === 'shipping' ? 'Delivery Details' : 'Confirm Order'}
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: '#FFF' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* STEP PROGRESS BAR */}
      {step !== 'cart' && (
        <Box sx={{ width: '100%', p: 2, backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
          <Stepper activeStep={step === 'shipping' ? 0 : 1} alternativeLabel>
            <Step>
              <StepLabel>Delivery Address</StepLabel>
            </Step>
            <Step>
              <StepLabel>WhatsApp Redirect</StepLabel>
            </Step>
          </Stepper>
        </Box>
      )}

      {/* BODY CONTENT SCROLL */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        {/* STEP 1: CART LIST VIEW */}
        {step === 'cart' && (
          <>
            {cartItems.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '60%',
                  textAlign: 'center',
                  opacity: 0.8,
                }}
              >
                <ShoppingBagIcon sx={{ fontSize: 70, color: '#C5CDA1', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                  Your jar is empty!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 280 }}>
                  Fill it with our spicy mango, aromatic garlic, or coastal prawn pickles.
                </Typography>
                <Button variant="outlined" color="primary" onClick={onClose} sx={{ borderRadius: 2 }}>
                  Start Shopping
                </Button>
              </Box>
            ) : (
              <List disablePadding>
                {cartItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item.id)} sx={{ color: '#EF4444' }}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      }
                      sx={{ py: 2, px: 0 }}
                    >
                      <ListItemAvatar sx={{ mr: 2 }}>
                        <Avatar
                          src={item.product.image}
                          alt={item.product.name}
                          variant="rounded"
                          sx={{ width: 60, height: 60, border: '1px solid #E2E8F0' }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1A3F22' }}>
                            {item.product.name}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'inline', mr: 2 }}>
                              Weight: <strong>{item.weight}</strong>
                            </Typography>
                            <Typography variant="body2" color="primary" sx={{ display: 'inline', fontWeight: 'bold' }}>
                              ₹{item.price} each
                            </Typography>
                            {/* Quantity buttons */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, gap: 1.5 }}>
                              <IconButton
                                size="small"
                                sx={{ border: '1px solid #E2E8F0', p: 0.3 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <RemoveIcon sx={{ fontSize: 14 }} />
                              </IconButton>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                sx={{ border: '1px solid #E2E8F0', p: 0.3 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <AddIcon sx={{ fontSize: 14 }} />
                              </IconButton>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" sx={{ ml: 0, my: 1 }} />
                  </React.Fragment>
                ))}
              </List>
            )}
          </>
        )}

        {/* STEP 2: SHIPPING / FORM PANEL */}
        {step === 'shipping' && (
          <Stack spacing={3}>
            <Typography variant="body2" color="text.secondary">
              Enter your shipping details below. We use this to calculate shipping fees and compile the WhatsApp order details.
            </Typography>

            <TextField
              label="Full Name *"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: false });
              }}
              error={!!errors.fullName}
              helperText={errors.fullName ? 'Full name is required' : ''}
            />

            <TextField
              label="Delivery Address *"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors({ ...errors, address: false });
              }}
              error={!!errors.address}
              helperText={errors.address ? 'Address is required' : ''}
            />

            <TextField
              label="Pincode (e.g. 560001 for local Free Shipping) *"
              variant="outlined"
              fullWidth
              value={pincode}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
                setPincode(val);
                if (errors.pincode) setErrors({ ...errors, pincode: false });
              }}
              error={!!errors.pincode}
              helperText={errors.pincode ? 'Enter a valid 6-digit pincode' : ''}
            />

            <TextField
              label="Alternate Phone Number (Optional)"
              variant="outlined"
              fullWidth
              value={altPhone}
              onChange={(e) => setAltPhone(e.target.value.replace(/[^\d+]/g, ''))}
            />

            {pincode.length === 6 && (
              <Alert
                severity={isLocalPincode(pincode) ? 'success' : 'info'}
                icon={<LocalShippingIcon />}
                sx={{ borderRadius: 2 }}
              >
                {isLocalPincode(pincode) ? (
                  <strong>Local Area Pincode detected! You qualify for FREE shipping.</strong>
                ) : (
                  <strong>Standard Delivery charge of ₹60 is applied for your pincode.</strong>
                )}
              </Alert>
            )}
          </Stack>
        )}

        {/* STEP 3: CHECKOUT FINAL VERIFICATION */}
        {step === 'checkout' && (
          <Stack spacing={3}>
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              Your order info is ready! On placing the order, we will redirect you to WhatsApp to send the receipt.
            </Alert>

            <Box sx={{ border: '1px solid #E2E8F0', borderRadius: 3, p: 2, backgroundColor: '#F8FAFC' }}>
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                Deliver To:
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>{fullName}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {address} - {pincode}
              </Typography>
              {altPhone && (
                <Typography variant="body2" color="text.secondary">
                  Alt Phone: {altPhone}
                </Typography>
              )}
            </Box>

            <Box sx={{ border: '1px solid #E2E8F0', borderRadius: 3, p: 2, backgroundColor: '#F8FAFC' }}>
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                Order Summary ({cartItems.length} items):
              </Typography>
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '75%' }}>
                    {item.product.name} ({item.weight}) x {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    ₹{item.price * item.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        )}
      </Box>

      {/* FOOTER ACTION PANEL */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            p: 3,
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#FFF',
            boxShadow: '0px -4px 15px rgba(0,0,0,0.03)',
          }}
        >
          {/* Prices calculation */}
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                ₹{cartTotal}
              </Typography>
            </Box>

            {step !== 'cart' && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Shipping Fee
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: shippingFee === 0 ? 'success.main' : 'text.primary' }}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </Typography>
              </Box>
            )}

            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                Total Cost
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                ₹{step === 'cart' ? cartTotal : finalTotal}
              </Typography>
            </Box>
          </Stack>

          {/* Checkout trigger buttons */}
          {step === 'cart' && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleNextStep}
              sx={{
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0px 6px 15px rgba(26, 63, 34, 0.2)',
              }}
            >
              Proceed to Order Details
            </Button>
          )}

          {step === 'shipping' && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleNextStep}
              sx={{
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0px 6px 15px rgba(26, 63, 34, 0.2)',
              }}
            >
              Review Order details
            </Button>
          )}

          {step === 'checkout' && (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              disabled={loading}
              onClick={handlePlaceOrder}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <WhatsAppIcon />}
              sx={{
                py: 1.8,
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: 2,
                backgroundColor: '#25D366', // Official WhatsApp green
                boxShadow: '0px 6px 15px rgba(37, 211, 102, 0.3)',
                '&:hover': {
                  backgroundColor: '#128C7E',
                },
              }}
            >
              {loading ? 'Compiling Cart...' : 'Place Order on WhatsApp'}
            </Button>
          )}
        </Box>
      )}
    </Drawer>
  );
}
