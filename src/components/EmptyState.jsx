import { Link } from 'react-router-dom';

function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  actionLink,
  variant = 'default' // 'default' or 'compact'
}) {
  const containerClass = variant === 'compact'
    ? "text-center bg-white rounded-2xl border border-border p-12 shadow-sm space-y-6"
    : "text-center py-20 bg-white rounded-3xl border-2 border-border shadow-xl";

  const ActionButton = actionLink ? Link : 'button';
  const actionProps = actionLink 
    ? { to: actionLink, className: "inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer" }
    : { type: "button", onClick: onAction, className: "bg-primary text-white px-8 py-4 text-sm font-semibold tracking-wide rounded-xl transition-all duration-300 hover:bg-primary-dark shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer inline-flex items-center gap-2" };

  return (
    <div className={containerClass}>
      <div className={variant === 'compact' ? '' : 'max-w-md mx-auto px-6'}>
        {/* Icon */}
        {variant === 'default' && (
          <div className="w-20 h-20 bg-warm-ivory rounded-full flex items-center justify-center mx-auto mb-6">
            {Icon ? (
              <Icon className="w-10 h-10 text-text-tertiary" />
            ) : (
              <svg 
                className="w-10 h-10 text-text-tertiary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
                />
              </svg>
            )}
          </div>
        )}
        
        {/* Title */}
        <h2 className={variant === 'compact' ? "text-2xl sm:text-3xl font-medium text-text-primary" : "text-xl font-semibold text-text-primary mb-2"}>
          {title}
        </h2>
        
        {/* Description */}
        <p className={variant === 'compact' ? "text-base text-text-secondary leading-relaxed" : "text-sm text-text-secondary mb-8 leading-relaxed"}>
          {description}
        </p>
        
        {/* Action Button */}
        {actionLabel && (onAction || actionLink) && (
          <ActionButton {...actionProps}>
            {!actionLink && (
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            )}
            {actionLabel}
          </ActionButton>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
