import Image from 'next/image'
import { useState } from 'react'
import { OptimizedImageProps } from '@/lib/performance'

interface ExtendedImageProps extends OptimizedImageProps {
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  loading?: 'lazy' | 'eager'
  unoptimized?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 90,
  className = '',
  sizes,
  fill = false,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  loading = 'lazy',
  unoptimized = false,
  ...props
}: ExtendedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Default sizes for responsive images
  const defaultSizes = sizes || (
    fill
      ? '100vw'
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  )

  // Generate blur placeholder if not provided
  const generateBlurDataURL = (w: number = 10, h: number = 10) => {
    const svg = `
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2D2D2D;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1C1C1C;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
      </svg>
    `
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  }

  const imageProps = {
    src,
    alt,
    priority: priority || loading === 'eager',
    quality,
    className: `transition-opacity duration-300 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    } ${className}`,
    sizes: defaultSizes,
    onLoad: handleLoad,
    onError: handleError,
    placeholder: placeholder as any,
    blurDataURL: blurDataURL || (placeholder === 'blur' ? generateBlurDataURL() : undefined),
    unoptimized,
    ...props,
  }

  if (fill) {
    return (
      <div className="relative overflow-hidden">
        <Image
          {...imageProps}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
        />
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-grey-900 text-grey-400">
            <span className="text-sm">Failed to load image</span>
          </div>
        )}
      </div>
    )
  }

  if (!width || !height) {
    console.warn('OptimizedImage: width and height should be provided when fill is false')
  }

  return (
    <div className="relative">
      <Image
        {...imageProps}
        alt={alt}
        width={width}
        height={height}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-grey-900 text-grey-400 rounded">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  )
}