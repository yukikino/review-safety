import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  price_monthly: z.number().positive(),
  price_annual: z.number().positive(),
  refund_days: z.number().int().nonnegative(),
  japan_ui: z.boolean(),
  japan_payment: z.boolean(),
  japan_support: z.boolean(),
  japan_docs: z.boolean(),
  affiliate_url: z.string().url(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  source_url: z.string().url(),
});

export type Product = z.infer<typeof ProductSchema>;
