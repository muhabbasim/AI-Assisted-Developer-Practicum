function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-border transition-all duration-300 animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        {/* Author skeleton */}
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        
        {/* Price and button skeleton */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-9 bg-gray-200 rounded-lg w-9"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
