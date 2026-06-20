import { CartItem } from '../context/CartContext';

export interface OrderFormData {
  fullName: string;
  address: string;
  pincode: string;
  altPhone: string;
}

export function generateWhatsAppLink(
  formData: OrderFormData,
  cartItems: CartItem[],
  subtotal: number,
  shippingFee: number,
  merchantPhoneNumber: string
): string {
  const formattedItems = cartItems
    .map((item, index) => {
      const itemEmoji = item.product.category === 'Spicy' ? '🌶️' : item.product.category === 'Sweet' ? '🍯' : '🧄';
      const itemPrice = item.price * item.quantity;
      return `${index + 1}. ${itemEmoji} *${item.product.name}* (${item.weight})\n   Quantity: ${item.quantity} x ₹${item.price} = *₹${itemPrice}*`;
    })
    .join('\n\n');

  const total = subtotal + shippingFee;
  const shippingText = shippingFee === 0 ? 'FREE (Local Shipping)' : `₹${shippingFee}`;

  const messageText = `🌶️ *NEW PICKLE ORDER REQUEST* 🌶️
-----------------------------------
👤 *Customer Information:*
• *Name:* ${formData.fullName}
• *Alternate Phone:* ${formData.altPhone || 'N/A'}
• *Delivery Address:*
  ${formData.address}
• *Pincode:* ${formData.pincode}

-----------------------------------
📦 *Items Ordered:*
${formattedItems}

-----------------------------------
💳 *Payment Summary:*
• *Subtotal:* ₹${subtotal}
• *Shipping:* ${shippingText}
• 💰 *Total Amount:* *₹${total}*
-----------------------------------
💬 _Please send this message to place your order. Our team will verify your address and confirm delivery details immediately!_`;

  const cleanPhone = merchantPhoneNumber.replace(/[^\d]/g, '');
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function isLocalPincode(pincode: string): boolean {
  // Simple check: suppose pincodes starting with 560 (local Bengaluru dummy pincode) get free shipping
  return pincode.startsWith('560');
}
