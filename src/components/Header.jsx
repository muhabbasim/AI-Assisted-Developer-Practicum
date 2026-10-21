import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header({ cartCount = 0 }) {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };
  return (
    <header className="w-full bg-white border-b border-border fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary-dark group-hover:scale-105">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-base font-semibold text-text-primary tracking-tight leading-none">
                PageTurner Books
              </span>
              <span className="text-xs text-text-tertiary font-normal mt-0.5">Curated Reads</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link 
              to="/" 
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors hidden sm:block px-4 py-2 rounded-lg hover:bg-warm cursor-pointer"
            >
              Home
            </Link>

            {loading ? (
              // Skeleton loader while checking authentication
              <>
                <div className="hidden md:block h-5 w-24 bg-warm/100 rounded animate-pulse"></div>
                <div className="h-10 w-16 sm:w-24 bg-warm/100 rounded-lg animate-pulse"></div>
                <div className="h-10 w-16 sm:w-24 bg-warm/100 rounded-lg animate-pulse"></div>
              </>
            ) : isAuthenticated ? (
              <>
                <span className="text-sm text-text-secondary hidden md:block">
                  Welcome, {user?.name}
                </span>
                <Link 
                  to="/cart" 
                  className="relative text-sm font-medium bg-primary text-white px-5 sm:px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-primary-dark shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <span className="hidden sm:inline">Cart</span>
                  </span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-lime text-primary text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-warm cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-warm cursor-pointer"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm font-medium bg-primary text-white px-5 sm:px-6 py-2.5 rounded-lg transition-all duration-300 hover:bg-primary-dark shadow-sm hover:shadow-md cursor-pointer"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
