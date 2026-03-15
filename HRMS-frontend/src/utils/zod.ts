import {
  AcceptedAllFileTypesMimeTypes,
  AcceptedImageExtensions,
  AcceptedImageMimeTypes,
  AllowedAllFileExtensions,
  MaxImageFileSize,
} from '@/lib/constants';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import z from 'zod';

export const imageSchema = z
  .instanceof(File, { message: 'Image is required' })
  .refine(file => file.size > 0, 'File is empty.')
  .refine(file => file.size <= MaxImageFileSize, 'Max file size is 5MB.')
  .refine(
    file => AcceptedImageMimeTypes.includes(file.type),
    `Only ${AcceptedImageExtensions.join(', ')} formats are supported`
  );

export const fileSchema = (name: string) =>
  z
    .instanceof(File, { message: `${name} is required` })
    .refine(file => file.size > 0, 'File is empty.')
    // .refine(file => file.size <= MaxImageFileSize, 'Max file size is 5MB.')
    .refine(
      file => AcceptedAllFileTypesMimeTypes.includes(file.type),
      `Only ${AllowedAllFileExtensions.join(', ')} formats are supported`
    );

export const stringSchema = (name?: string, max = 200, min = 1) =>
  z
    .string({ message: name ? `${name} is required` : 'Required' })
    .trim()
    .min(
      min,
      min === 1
        ? name
          ? `${name} is required`
          : 'Required'
        : `Can't be be less then ${min} characters`
    )
    .max(max, `Can't be be more then ${max} characters long`);

export const longStringSchema = (name: string, max = 2000, min = 1) =>
  z
    .string({ message: `${name} is required` })
    .trim()
    .min(min, min === 1 ? `${name} is required` : `Can't be be less then ${min} characters`)
    .max(max, `Can't be be more then ${max} characters long`);

export const numberSchema = (label: string) =>
  z.union([
    z
      .string({ message: `${label} is required` })
      .min(1, `${label} is required`)
      .regex(/^-?\d+(\.\d+)?$/, 'Should be a valid number'),
    z.number({ message: `${label} is required` }),
  ]);

export const numberSchemaOptional = (label: string) =>
  z
    .union([
      z
        .string({ message: `${label} is required` })
        .regex(/^-?\d+(\.\d+)?$/, 'Should be a valid number')
        .or(z.literal('')),
      z.number({ message: `${label} is required` }),
    ])
    .optional();

export const stringWithNoSpecialCharactersAndNumbersSchema = (label: string) =>
  z
    .string({ message: `${label} is required` })
    .min(1, `${label} is required`)
    .regex(/^[a-zA-Z ]+$/, 'Special characters and numbers are not allowed');

export const phoneNumberSchema = z
  .string({ message: 'Phone number is required' })
  .min(1, 'Phone number is required')
  .refine(
    val => {
      const phone = parsePhoneNumberFromString(`+${val}`);
      return phone && phone.isValid();
    },
    { message: 'Please enter a valid phone number' }
  );

export const emailSchema = z.email({ message: 'Email is required' }).min(1, 'Email is required');

export const createPasswordSchema = z
  .string({ message: 'Password is required' })
  .min(1, 'Password is required')
  .min(8, { message: 'Must be at least 8 characters' })
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain at least one letter, one number and one special character (@$!%*?&)'
  );

export const pinCodeSchema = z
  .string('PIN code is required')
  .min(1, 'PIN code is required')
  .regex(/^[1-9][0-9]{5}$/, 'Invalid PIN code');
