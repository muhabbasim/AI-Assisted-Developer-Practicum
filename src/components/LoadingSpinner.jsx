function LoadingSpinner({ size = 'md', message }) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-16 h-16 border-4',
    lg: 'w-24 h-24 border-4'
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div 
          className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4`}
          role="status"
          aria-label="Loading"
        />
        {message && (
          <p className="text-text-secondary">{message}</p>
        )}
      </div>
    </div>
  );
}

export default LoadingSpinner;
