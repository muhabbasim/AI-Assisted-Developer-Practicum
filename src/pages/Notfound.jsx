import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-warm px-4">
      <div className="max-w-md space-y-6 bg-white rounded-2xl border border-border p-12 shadow-md">
        <h1 className="text-8xl sm:text-9xl font-semibold text-text-primary tracking-tight">404</h1>
        <h2 className="text-2xl sm:text-3xl font-medium text-text-primary tracking-tight">Page Not Found</h2>
        <p className="text-base text-text-secondary leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 mt-6 shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default Notfound;
