/**
 * Storefront constants
 */

export const DEFAULT_STOREFRONT_CODE = 'us';
export const DEFAULT_LANGUAGE_BCP47 = 'en-US';

export const STOREFRONTS = {
  US: 'us',
  GB: 'gb',
  CA: 'ca',
  AU: 'au',
  DE: 'de',
  FR: 'fr',
  IT: 'it',
  ES: 'es',
  JP: 'jp',
  CN: 'cn',
} as const;

export type StorefrontCode = typeof STOREFRONTS[keyof typeof STOREFRONTS];

