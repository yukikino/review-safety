/**
 * Utility functions for the application
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Product } from './schema';

/**
 * Combines class names with Tailwind CSS conflict resolution
 * Useful for conditional Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
  }).format(price);
}

/**
 * Format date string to Japanese format
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ja-JP').format(new Date(dateString));
}

/**
 * Calculate Japan support score (0-4)
 */
export function calculateJapanScore(product: Product): number {
  return [
    product.japan_ui,
    product.japan_payment,
    product.japan_support,
    product.japan_docs,
  ].filter(Boolean).length;
}
