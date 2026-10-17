import { useEffect } from 'react';

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-slide-up"
    >
      <div
        className={`
          flex items-center gap-3 px-4 py-3.5 rounded-lg shadow-lg border backdrop-blur-sm
          min-w-[280px] max-w-[90vw] sm:max-w-md
          ${isSuccess ? 'bg-white/95 border-primary/20' : ''}
          ${isError ? 'bg-white/95 border-red-200' : ''}
        `}
      >
        {/* Icon */}
        <div className="flex-shrink-0">
          {isSuccess && (
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {isError && (
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        {/* Message */}
        <p
          className={`
            text-sm font-medium flex-1
            ${isSuccess ? 'text-text-primary' : ''}
            ${isError ? 'text-red-700' : ''}
          `}
        >
          {message}
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 text-text-tertiary hover:text-text-primary transition-colors p-1 rounded hover:bg-warm cursor-pointer"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;
