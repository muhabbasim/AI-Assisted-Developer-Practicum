# PageTurner Books - Online Bookstore

A sophisticated, modern online bookstore built with React, featuring a curated collection of books across multiple genres. This project showcases a premium reading destination with elegant design, intuitive discovery, and seamless shopping experience.

## 🎯 Project Overview

PageTurner Books is a complete e-commerce bookstore with:

- **32 carefully curated books** spanning Fiction, Nonfiction, Technology, Science, and more
- **14 distinct categories** including Mystery, Fantasy, Business, Psychology, and History
- **Premium minimalist design** with green brand identity and warm ivory backgrounds
- **Sophisticated book presentation** with portrait-oriented cover images
- **Advanced search and filtering** by title, author, category, and more
- **Responsive layouts** optimized for mobile, tablet, and desktop
- **Shopping cart functionality** with quantity management
- **Real book metadata** including authors, formats, page counts, and descriptions

## 🎨 Design Philosophy

The bookstore embodies a distinctive literary identity:

- **Premium & Editorial**: Inspired by independent bookstores and literary magazines
- **Green Color Palette**: Forest green primary color with sage and lime accents
- **Warm Backgrounds**: Ivory and off-white tones create a welcoming atmosphere
- **Elegant Typography**: Inter font with careful tracking and spacing
- **Book-First Design**: Portrait aspect ratios and cover-focused layouts
- **Refined Interactions**: Subtle animations, gentle shadows, and thoughtful hover states

## 📚 Book Catalog

### Fiction
- Contemporary Fiction: *The Midnight Library*, *Normal People*, *Tomorrow, and Tomorrow, and Tomorrow*
- Mystery & Thriller: *The Silent Patient*, *Gone Girl*
- Science Fiction: *Dune*, *Project Hail Mary*
- Fantasy: *The Name of the Wind*, *The Way of Kings*, *The Hobbit*
- Historical Fiction: *All the Light We Cannot See*, *The Seven Husbands of Evelyn Hugo*
- Classics: *1984*, *The Great Gatsby*, *The Alchemist*

### Nonfiction
- **Business**: *Atomic Habits*, *Deep Work*, *The Psychology of Money*, *The Lean Startup*
- **Technology**: *Clean Code*, *The Pragmatic Programmer*, *Designing Data-Intensive Applications*
- **Psychology**: *Thinking, Fast and Slow*, *Man's Search for Meaning*
- **Science**: *Sapiens*, *The Gene*, *Cosmos*
- **Biography**: *Educated*, *When Breath Becomes Air*
- **Philosophy**: *Meditations*
- **Self-Help**: *Range*

## 🛠️ Technical Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.10
- **Styling**: Tailwind CSS 4.3.3
- **Routing**: React Router DOM 6.27.0
- **State Management**: React Context API
- **Icons**: Heroicons (via inline SVG)
- **Image Optimization**: Responsive loading with CDN assets

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server runs at `http://localhost:5173` (or next available port).

## 📱 Features

### Homepage
- **Literary Hero Section**: Editorial-style hero with compelling messaging and featured book showcase
- **Advanced Search**: Search by title, author, or topic with live suggestions and book cover thumbnails
- **Category Filters**: Browse books by genre with refined filter chips
- **Responsive Grid**: 2 columns on mobile, 3 on tablet, 4-5 on desktop

### Book Cards
- Portrait book cover with 2:3 aspect ratio
- Book title, author name, and category
- Price with sale indicators
- Badges for Bestsellers, New Arrivals, and Sale items
- Quantity stepper and Add to Cart functionality
- Smooth hover effects with subtle scale and shadow

### Product Pages
- Large book cover with proper containment
- Full book details including format and page count
- Author information prominently displayed
- Book description with editorial formatting
- Format and metadata display
- Related badges (Bestseller, New, Sale)
- Quantity selection and cart actions

### Search Experience
- Real-time search suggestions
- Portrait book cover thumbnails in dropdown
- Author and category information
- Price display with sale indicators
- Category and title matching
- No-results state with guidance

### Shopping Cart
- Persistent cart state via Context API
- Quantity management per book
- Price calculations with sale handling
- Toast notifications for cart actions
- Responsive cart page

## 🎨 Brand Identity

### Colors
- **Primary Green**: `#183D32` - Forest green for headers and CTAs
- **Sage Accents**: `#A8B5A0` - Muted green for secondary elements
- **Lime Highlights**: `#C5E86C` - Vibrant accent for badges
- **Warm Ivory**: `#F8F8F3` and `#EFEFE6` - Background tones
- **Text Hierarchy**: `#20231F` (primary), `#5A5D58` (secondary), `#898C87` (tertiary)

### Typography
- **Font Family**: Inter with careful letter-spacing
- **Headings**: Semibold weight with tight tracking
- **Body Text**: Regular to medium weights with relaxed line height
- **Labels**: Uppercase with wide letter-spacing for editorial feel

## 📐 Component Architecture

```
src/
├── components/
│   ├── Header.jsx              # Navigation with logo and cart
│   ├── Footer.jsx              # Site footer
│   ├── SearchBar.jsx           # Book search with suggestions
│   ├── Slider.jsx              # Hero section with featured book
│   ├── QuantityStepper.jsx     # Quantity selector
│   ├── Toast.jsx               # Notification system
│   └── product_card/
│       └── ProductCard.jsx     # Book card component
├── pages/
│   ├── Home.jsx                # Homepage with catalog
│   ├── Product.jsx             # Book detail page
│   ├── CartPage.jsx            # Shopping cart
│   └── NotFound.jsx            # 404 page
├── context/
│   └── CartContext.jsx         # Shopping cart state
├── data/
│   └── products.js             # Book catalog data
├── layouts/
│   └── MainLayout.jsx          # Main layout wrapper
└── hooks/
    └── useCart.js              # Cart management hook
```

## 🔍 Data Structure

Each book in the catalog includes:

```javascript
{
  id: Number,              // Unique identifier
  title: String,           // Book title
  author: String,          // Author name
  description: String,     // Book description
  price: Number,           // Current price (SAR)
  salePrice: Number,       // Original price if on sale
  image: String,           // Book cover URL
  category: String,        // Genre/category
  format: String,          // Paperback, Hardcover, etc.
  pageCount: Number,       // Number of pages
  bestseller: Boolean,     // Bestseller flag
  newArrival: Boolean,     // New arrival flag
  featured: Boolean        // Featured book flag
}
```

## 📱 Responsive Design

### Mobile (< 640px)
- 2-column book grid
- Simplified navigation
- Touch-optimized interactions
- Compact product cards

### Tablet (640px - 1024px)
- 3-column book grid
- Enhanced search experience
- Balanced spacing

### Desktop (> 1024px)
- 4-5 column book grid
- Full navigation
- Sticky book covers on detail pages
- Generous whitespace

## 🎯 Key Features

### Book Discovery
- Search by title, author, or topic
- Filter by 14 different categories
- Live search suggestions with covers
- Results counter and clear filters
- Empty state guidance

### Book Presentation
- Portrait book covers (2:3 aspect ratio)
- Consistent image sizing
- Author attribution on every card
- Category labels
- Format and page count on detail pages

### Shopping Experience
- Add to cart with quantity selection
- Sale price indicators with savings percentage
- Bestseller and new arrival badges
- Persistent cart across pages
- Toast notifications for actions

### Visual Polish
- Smooth hover effects
- Subtle shadows and borders
- Loading states with spinners
- Empty states with helpful messaging
- Responsive images with lazy loading

## 🚦 Performance

- **Fast Initial Load**: Vite's optimized bundling
- **Lazy Loading**: Images load on demand
- **Code Splitting**: Route-based splitting via React Router
- **Optimized Assets**: CDN-hosted book covers
- **Smooth Animations**: GPU-accelerated transforms

## 🎨 Customization

### Adding New Books

Edit `src/data/products.js`:

```javascript
{
  id: 33,
  title: "Your Book Title",
  author: "Author Name",
  description: "Compelling book description...",
  price: 75.00,
  image: "https://cover-image-url.jpg",
  category: "Fiction",
  format: "Paperback",
  pageCount: 320,
  bestseller: false,
  newArrival: true,
}
```

### Adding New Categories

Update the `categories` array in `src/data/products.js`:

```javascript
export const categories = [
  "All",
  "Fiction",
  "Your New Category",
  // ...
];
```

### Updating Brand Colors

Modify `src/index.css` theme variables:

```css
@theme {
  --color-primary: #183D32;      /* Main green */
  --color-sage: #A8B5A0;         /* Sage accent */
  --color-lime: #C5E86C;         /* Lime highlight */
  --color-warm: #F8F8F3;         /* Background */
}
```

## 🔄 Transformation Summary

This bookstore was transformed from a generic e-commerce site with the following changes:

### Product Catalog
- ✅ Replaced 8 audio products with 32 books
- ✅ Added book-specific fields (author, format, pageCount)
- ✅ Organized into 14 literary categories
- ✅ Added bestseller, newArrival, and featured flags

### Visual Design
- ✅ Changed product images from square to portrait aspect ratio (2:3)
- ✅ Added author names to all product cards
- ✅ Updated badges (Bestseller, New Arrival, Sale)
- ✅ Modified hero section with literary messaging
- ✅ Updated all copy from generic commerce to bookstore language

### User Experience
- ✅ Enhanced search to include author names
- ✅ Updated placeholder text for book discovery
- ✅ Modified empty states with book-relevant messaging
- ✅ Changed category filters to literary genres
- ✅ Updated header branding to "PageTurner Books"

### Component Updates
- ✅ ProductCard: Added author display and portrait covers
- ✅ SearchBar: Book cover thumbnails and author matching
- ✅ Slider: Literary hero messaging and featured book card
- ✅ Product: Enhanced detail page with format and page count
- ✅ Header: Updated logo with book icon and new name

## 📄 License

This project is part of an assignment showcasing e-commerce transformation capabilities.

## 🙏 Acknowledgments

- Book cover images sourced from Goodreads
- Hero images from Unsplash
- Book metadata represents real published works
- Design inspired by independent bookstores and literary culture

---

**PageTurner Books** - Where every page is a new adventure 📚
