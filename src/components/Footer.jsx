import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-primary text-white mt-24 sm:mt-32 rounded-t-3xl">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 py-16 sm:py-20">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-primary rounded-sm"></div>
              </div>
              <span className="text-base font-semibold tracking-tight">Novelle</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Your destination for premium audio experiences and beautiful products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/90">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors w-fit cursor-pointer">
                Home
              </Link>
              <Link to="/cart" className="text-sm text-white/70 hover:text-white transition-colors w-fit cursor-pointer">
                Shopping Cart
              </Link>
              <Link to="/login" className="text-sm text-white/70 hover:text-white transition-colors w-fit cursor-pointer">
                Account
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/90">Categories</h3>
            <nav className="flex flex-col gap-3">
              <span className="text-sm text-white/70">Audio</span>
              <span className="text-sm text-white/70">Headphones</span>
              <span className="text-sm text-white/70">Earbuds</span>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/90">Contact</h3>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <p>info@Novelle.com</p>
              <p>+966 50 123 4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              &copy; {new Date().getFullYear()} Novelle. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="hover:text-white/90 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white/90 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
