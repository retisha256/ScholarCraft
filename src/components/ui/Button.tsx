'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  loading?: boolean
  disabled?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  external?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      loading = false,
      disabled = false,
      className,
      children,
      onClick,
      type = 'button',
      external = false,
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

    const variants = {
      primary: 'btn-base btn-primary',
      secondary: 'btn-base btn-secondary',
      outline: 'btn-base btn-outline',
      ghost: 'inline-flex items-center justify-center min-h-[52px] px-8 rounded-xl text-sm text-[var(--text-primary)] hover:bg-[#f1f1f1] focus:ring-[var(--border)]',
      danger: 'btn-base bg-[var(--error)] text-white hover:bg-[#b91c1c] shadow-md hover:shadow-lg',
    }

    const sizes = {
      sm: 'px-6 py-2 text-sm gap-1.5',
      md: 'px-8 py-3 text-base gap-2',
      lg: 'px-8 py-3 text-lg gap-2.5',
    }

    const classes = cn(baseStyles, variants[variant], sizes[size], className)

    const content = loading ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Loading...
      </>
    ) : (
      children
    )

    if (href) {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={href}
            className={classes}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {content}
          </Link>
        </motion.div>
      )
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={classes}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      >
        {content}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
