# Dadi's Barni Pickle Storefront 🌶️

Welcome to **Dadi's Barni**, a production-level, highly interactive Pickle E-commerce Storefront built with Next.js (App Router), Material UI (MUI v5+), and TypeScript. 

The unique feature of this storefront is its **"WhatsApp Checkout"**—instead of using traditional payment gateways, it compiles customer cart items and delivery details into a beautifully formatted, emoji-rich WhatsApp message template and redirects the customer to complete the order on WhatsApp.

## 🛠️ Tech Stack & Key Choices

1. **Framework**: Next.js 14+ (App Router) with React.
2. **Styling & UI**: Material UI (MUI v5) configured with a custom registry to prevent unstyled flash of content (FOUC).
3. **Aesthetics**: Premium, warm food-brand theme featuring:
   - Primary: Deep forest pickle greens (`#1A3F22`)
   - Secondary: Warm ambers/spices (`#D97706`)
   - Fonts: *Outfit* (clean modern sans-serif body text) and *Playfair Display* (elegant serif headings)
4. **State Management**: React Context (`CartContext`) with persistence (`localStorage`) and dynamic weight variant subtotal calculations.
5. **Logic**: WhatsApp message template generator using standard URL encoding for cross-platform compatibility.

---

## 📂 Project Structure

All files have been written directly to `C:\Users\tejes\.gemini\antigravity\scratch\pickle-store`:

```
pickle-store/
├── package.json               # NPM script settings and MUI dependencies
├── tsconfig.json              # Custom TypeScript settings for App Router
├── next.config.js             # Next.js configurations for loading Unsplash images
├── README.md                  # This setup guide
└── src/
    ├── app/
    │   ├── globals.css        # Premium fonts imports, animations, and custom scrollbars
    │   ├── layout.tsx         # Main entry point with SEO metadata
    │   └── page.tsx           # Assembles components and orchestrates main states
    ├── components/
    │   ├── Header.tsx         # Sticky elevation navbar with pulsing cart badge
    │   ├── Hero.tsx           # High-impact introduction banner with call-to-action
    │   ├── CategoryFilters.tsx # Horizontal scrolling category chips (Veg, Spicy, Sweet, etc.)
    │   ├── ProductCard.tsx    # Responsive cards with weight dropdown selectors
    │   ├── ProductGrid.tsx    # Flexible wrapping layout for cards
    │   ├── ProductModal.tsx   # Details Dialog with ingredients, shelf life, and counters
    │   └── CartDrawer.tsx     # Slide-out Cart list & Delivery Form Stepper
    ├── context/
    │   └── CartContext.tsx    # Global cart state provider (add, quantity changes, persist)
    ├── data/
    │   └── products.ts        # Mock database with 6 premium pickles and detailed recipes
    ├── theme/
    │   ├── theme.ts           # MUI palette, typography overrides, and borders config
    │   └── ThemeRegistry.tsx  # Prevents styling flashes on Next.js server rendering
    ├── types/
    │   └── product.ts         # Strictly typed interface definitions
    └── utils/
        └── whatsapp.ts        # Emojis receipt template compiler & Pincode checker
```

---

## 🚀 How to Run the Project Locally

Since the command runner inside the agent sandbox is experiencing path resolution issues with `powershell`, we recommend setting the `pickle-store` subdirectory as your workspace and running it:

### 1. Set Workspace
Recommended action: Set `C:\Users\tejes\.gemini\antigravity\scratch\pickle-store` as your active workspace.

### 2. Install Dependencies
Open your local terminal in the project directory and run:
```bash
npm install
```

### 3. Run Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the storefront!

---

## 🌶️ Features Implemented

- **Interactive Cart Badge**: The shopping cart icon features a custom notification badge that automatically performs a **keyframe scale-pulse** animation whenever you add an item.
- **Dynamic Weight and Price Calculation**: Selecting a weight option (e.g. `250g`, `500g`, `1kg`) updates the card pricing in real time.
- **Interactive details modal**: Detailed ingredient chips, shelf life indicator alerts, and quick-add quantity counters (`-`/`+`).
- **Cart Stepper Drawer**:
  - **Step 1**: Review items, remove, or modify quantities.
  - **Step 2**: Fill out delivery form (Name, Address, Pincode, and Alternate Phone).
  - **Shipping Rule**: If the pincode starts with `560` (Bengaluru dummy local), it automatically displays **FREE shipping**. Otherwise, standard flat rate of `₹60` is added to the subtotal.
  - **Step 3**: Review order details, click **Place Order on WhatsApp** to trigger a simulated compiling loader animation before opening the pre-filled chat link in a new tab.
