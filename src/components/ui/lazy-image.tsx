import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  className,
  style,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Generate a low-res placeholder URL by adding blur and low quality parameters
  const getPlaceholderSrc = (originalSrc: string): string => {
    if (placeholder) return placeholder;
    
    // For images with existing query params, add blur params
    if (originalSrc.includes('?')) {
      return `${originalSrc}&w=40&q=10&blur=10`;
    }
    // For simple URLs, add blur params
    return `${originalSrc}?w=40&q=10&blur=10`;
  };

  const placeholderSrc = getPlaceholderSrc(src);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.unobserve(img);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before image comes into view
      }
    );

    observerRef.current.observe(img);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {/* Low-res placeholder - always visible initially */}
      <img
        ref={imgRef}
        src={placeholderSrc}
        alt={alt}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoaded ? "opacity-0" : "opacity-100",
          "blur-sm scale-110" // Slight blur and scale to hide pixelation
        )}
        {...props}
      />
      
      {/* Full-res image - loads when in view */}
      {isInView && !error && (
        <img
          src={src}
          alt={alt}
          className={cn(
            "absolute inset-0 object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          decoding="async"
          {...props}
        />
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-muted-foreground text-sm">Failed to load image</div>
        </div>
      )}
    </div>
  );
};

export { LazyImage };