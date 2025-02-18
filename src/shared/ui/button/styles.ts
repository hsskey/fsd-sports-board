import clsx from 'clsx'

export const focusableButtonClasses = clsx(
  'transition-all duration-200',
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
  'relative focus-visible:z-[60]',
  'focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50',
  'focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-opacity-100'
)
