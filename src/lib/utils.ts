import { type ClassValue } from "tailwind-merge"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(inputs)
}