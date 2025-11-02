import { z } from 'zod';
import fs from 'fs';
import { ProductSchema } from '../lib/schema.ts';

try {
  const products = JSON.parse(fs.readFileSync('data/products.json', 'utf-8'));
  z.array(ProductSchema).parse(products);
  console.log(`✓ Data validation passed (${products.length} products)`);
} catch (error) {
  console.error('✗ Data validation failed:', error.message);
  if (error.errors) {
    console.error('Details:', JSON.stringify(error.errors, null, 2));
  }
  process.exit(1);
}
