# PageTurner Books - Quick Start Guide

## 🚀 Getting Started in 30 Seconds

```bash
# 1. Navigate to project
cd /Users/mugtabaali/Desktop/assignment

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:5173
```

---

## 📚 What You'll See

### Homepage
- **Hero Section**: "Find Your Next Favorite Book" with featured book showcase
- **Search Bar**: Search by title, author, or topic
- **Category Filters**: 14 literary genres to browse
- **Book Grid**: 32 books displayed in responsive grid
  - Mobile: 2 columns
  - Tablet: 3 columns
  - Desktop: 4-5 columns

### Book Cards
Each card shows:
- Book cover (portrait orientation)
- Title and author
- Category badge
- Price (with sale indicator if applicable)
- Special badges (Bestseller, New Arrival)
- Quantity selector
- Add to Cart button

### Book Detail Pages
Click any book to see:
- Large book cover
- Full title and author
- Detailed description
- Format (Paperback/Hardcover)
- Page count
- Price with savings calculation
- Add to cart functionality

### Shopping Cart
- Persistent across page refreshes
- Update quantities or remove items
- See total price calculation
- Toast notifications for actions

---

## 🎨 Design Features

### Color Scheme
- **Primary Green**: `#183D32` (forest green)
- **Sage Green**: `#A8B5A0` (muted accents)
- **Lime Green**: `#C5E86C` (highlights)
- **Warm Ivory**: `#F8F8F3` (backgrounds)

### Typography
- **Font**: Inter
- **Headings**: Semibold, tight tracking
- **Body**: Regular weight, relaxed line-height
- **Labels**: Uppercase, wide letter-spacing

---

## 📖 Book Catalog Overview

### Fiction (15 books)
- Contemporary Fiction: The Midnight Library, Normal People
- Mystery: The Silent Patient, Gone Girl
- Science Fiction: Dune, Project Hail Mary
- Fantasy: The Name of the Wind, The Hobbit, The Way of Kings
- Classics: 1984, The Great Gatsby, The Alchemist

### Nonfiction (17 books)
- Business: Atomic Habits, Deep Work, The Psychology of Money
- Technology: Clean Code, The Pragmatic Programmer
- Science: Sapiens, The Gene, Cosmos
- Psychology: Thinking Fast and Slow
- Biography: Educated, When Breath Becomes Air

**Total: 32 books across 14 categories**

---

## 🔍 Testing the Features

### Search
1. Click the search bar on homepage
2. Type "atomic" → See "Atomic Habits" in suggestions
3. Type "harari" → See "Sapiens" by Yuval Noah Harari
4. Type "fiction" → See all fiction books

### Filtering
1. Click "Fiction" category → See only fiction books
2. Click "Technology" → See programming books
3. Click "All" → See all books

### Shopping
1. Find a book you like
2. Adjust quantity (1-99)
3. Click "Add to Cart"
4. See toast notification
5. Cart badge updates in header
6. Click cart icon to review order

---

## 📱 Responsive Testing

### Mobile View (< 640px)
- Resize browser to ~375px width
- See 2-column book grid
- Compact navigation
- Touch-friendly buttons

### Tablet View (640-1024px)
- Resize to ~768px width
- See 3-column grid
- Enhanced spacing

### Desktop View (> 1024px)
- Full screen
- 4-5 column grid
- Sticky book covers on detail pages

---

## 🛠️ Development Commands

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check build output
ls -la dist/
```

---

## 📂 Key Files to Explore

### Data
- `src/data/products.js` - All 32 books with metadata

### Components
- `src/components/product_card/ProductCard.jsx` - Book card design
- `src/components/SearchBar.jsx` - Search with suggestions
- `src/components/Slider.jsx` - Hero section
- `src/components/Header.jsx` - Navigation and branding

### Pages
- `src/pages/Home.jsx` - Homepage with catalog
- `src/pages/Product.jsx` - Book detail page
- `src/pages/CartPage.jsx` - Shopping cart

### Context & Hooks
- `src/context/CartContext.jsx` - Cart state management
- `src/hooks/useCart.js` - Cart operations logic

### Styling
- `src/index.css` - Theme colors and global styles

---

## 🎯 Quick Feature Checklist

When exploring the site, verify:

✅ **Homepage**
- [ ] Hero shows "Find Your Next Favorite Book"
- [ ] Search bar has book-specific placeholder
- [ ] Category filters show literary genres
- [ ] Books display in portrait orientation
- [ ] Author names visible on cards

✅ **Search**
- [ ] Can search by book title
- [ ] Can search by author name
- [ ] Results show book covers
- [ ] Suggestions include author info

✅ **Filters**
- [ ] 14 categories available
- [ ] Selected category highlights in green
- [ ] Results counter updates
- [ ] Clear filters button works

✅ **Book Cards**
- [ ] Portrait book covers (2:3 ratio)
- [ ] Title, author, and price visible
- [ ] Badges show (Bestseller, New, Sale)
- [ ] Hover effects work smoothly
- [ ] Add to cart functions

✅ **Detail Pages**
- [ ] Large book cover displays
- [ ] Format and page count shown
- [ ] Author prominently displayed
- [ ] Description is readable
- [ ] Quantity selector works

✅ **Shopping Cart**
- [ ] Items add to cart
- [ ] Quantities can be updated
- [ ] Items can be removed
- [ ] Total calculates correctly
- [ ] Toast notifications appear

✅ **Responsive Design**
- [ ] Works on mobile (2 columns)
- [ ] Works on tablet (3 columns)
- [ ] Works on desktop (4-5 columns)
- [ ] Touch targets are adequate

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# If port 5173 is busy, Vite will auto-select next port
# Check terminal output for actual port number
```

### Changes Not Showing
```bash
# Hard refresh browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Or clear cache and restart dev server
npm run dev
```

### Images Not Loading
- Book covers load from Goodreads CDN
- Requires internet connection
- Check browser console for errors

---

## 📚 Documentation

For more details, see:

- **BOOKSTORE_README.md** - Comprehensive project documentation
- **TRANSFORMATION_SUMMARY.md** - Complete transformation details
- **BEFORE_AFTER_COMPARISON.md** - Visual comparison guide
- **ARCHITECTURE.md** - Technical architecture (original)
- **README.md** - Original project documentation

---

## 💡 Pro Tips

1. **Best Books to Test**
   - Fiction: "The Midnight Library" (featured, bestseller)
   - Business: "Atomic Habits" (popular, great reviews)
   - Technology: "Clean Code" (higher price point)
   - Science Fiction: "Dune" (classic with sale)

2. **Search Tests**
   - Search "james" → Finds "James Clear" (Atomic Habits)
   - Search "tech" → Finds Technology category books
   - Search "dune" → Direct title match

3. **Filter Combinations**
   - Select "Fiction" + search "2024" → New releases
   - Select "Business" → See all business books
   - Select "Bestseller" content via featured flags

4. **Responsive Testing**
   - Use Chrome DevTools (F12)
   - Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
   - Test various device presets

---

## 🎉 You're Ready!

The bookstore is fully functional and ready to explore. Every feature works, all 32 books are browseable, and the shopping experience is smooth from discovery to checkout.

**Enjoy browsing PageTurner Books! 📚**
