import fs from 'fs';
import path from 'path';
import type { Product } from '@/lib/schema';

const productsPath = path.join(process.cwd(), 'data', 'products.json');

/**
 * Get all product IDs from products.json
 */
export function getAllProductIds(): string[] {
  try {
    const fileContents = fs.readFileSync(productsPath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    return products.map((p) => p.id);
  } catch (error) {
    console.error('Error reading products.json:', error);
    return [];
  }
}

/**
 * Get product by ID from products.json
 */
export function getProductById(id: string): Product | null {
  try {
    const fileContents = fs.readFileSync(productsPath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    return products.find((p) => p.id === id) || null;
  } catch (error) {
    console.error('Error reading products.json:', error);
    return null;
  }
}

/**
 * Validate that product article IDs match products.json
 */
export function validateProductLinks(
  articleProductIds: string[]
): {
  valid: boolean;
  missingInProductsJson: string[];
  unusedInProductsJson: string[];
} {
  const productsJsonIds = getAllProductIds();

  const missingInProductsJson = articleProductIds.filter(
    (id) => !productsJsonIds.includes(id)
  );

  const unusedInProductsJson = productsJsonIds.filter(
    (id) => !articleProductIds.includes(id)
  );

  return {
    valid: missingInProductsJson.length === 0,
    missingInProductsJson,
    unusedInProductsJson,
  };
}
