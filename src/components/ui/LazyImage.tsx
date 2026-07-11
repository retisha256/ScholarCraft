/**
 * LazyImage — Next.js Image wrapper with blur placeholder,
 * WebP optimization, and graceful error fallback.
 *
 * Usage:
 *   <LazyImage src="/hero.jpg" alt="Hero" fill priority />
 *   <LazyImage src="/blog.jpg" alt="Blog" width={400} height={250} />
 */
'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface LazyImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  /** Show skeleton while loading */
  skeleton?: boolean
  /** Wrapper className */
  wrapperClassName?: string
  /** Fallback initials shown on error */
  fallbackText?: string
}

// Tiny 1×1 blue pixel as base64 blur placeholder
const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

export default function LazyImage({
  src,
  alt,
  skeleton = true,
  wrapperClassName,
  fallbackText,
  className,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={cn(
          'bg-[#1E293B] border border-white/[0.06] flex items-center justify-center text-[#475569] text-sm font-medium rounded-xl',
          wrapperClassName
        )}
        aria-label={alt}
        role="img"
      >
        {fallbackText ?? alt?.charAt(0) ?? '?'}
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {/* Skeleton shimmer while loading */}
      {skeleton && !loaded && (
        <div
          className="absolute inset-0 bg-white/[0.04] animate-pulse rounded-inherit"
          aria-hidden="true"
        />
      )}

      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          'transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  )
}
