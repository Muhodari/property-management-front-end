import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simulated initial commit note on 2025-02-19T15:23:31.409Z

// Feature: Implement property image gallery
// Added on 2025-02-27T18:40:38.703Z
