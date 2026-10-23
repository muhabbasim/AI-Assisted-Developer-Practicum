import { Link } from 'react-router-dom';

function NotFound({ title, message, linkText = 'Go back', linkTo = '/' }) {
  return (
    <main className="w-full flex-auto">
      <div className="container py-16">
        <div className="text-center bg-white rounded-2xl border border-border p-12 max-w-md mx-auto shadow-sm">
          <h2 className="text-2xl font-medium text-text-primary mb-4">
            {title}
          </h2>
          {message && (
            <p className="text-text-secondary mb-6">{message}</p>
          )}
          <Link 
            to={linkTo} 
            className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2 cursor-pointer"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            {linkText}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
