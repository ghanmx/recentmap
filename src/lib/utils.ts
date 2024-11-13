import { twMerge } from 'tailwind-merge'

export function cn(...inputs: any[]) {
  // Changed ClassValue to any[]
  return twMerge(inputs)
}
