import z from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  street: z.string().min(1, 'Street Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z
    .string()
    .regex(/^\d{1,4}$/, 'Postal code must be 1 to 4 digits'),
  country: z.string().min(1, 'Country is required'),
  cardHolder: z.string().min(1, 'Cardholder Name is required'),
  cardNumber: z
    .string()
    .regex(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      'Card number must be in format 1234 5678 9012 3456'
    ),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvc: z.string().regex(/^\d+$/, 'CVC must be numbers'),
});
