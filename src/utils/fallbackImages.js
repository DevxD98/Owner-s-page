/**
 * This file contains fallback images as data URLs for each offer type
 * Using these ensures consistent image display regardless of network conditions
 */

// Spotlight offer fallback image
export const SPOTLIGHT_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23fef3c7'/%3E%3Ccircle cx='250' cy='110' r='50' fill='%23fbbf24' opacity='0.8'/%3E%3Cpath d='M180 180 L320 180 L350 270 L150 270 Z' fill='%23f59e0b' opacity='0.7'/%3E%3Ctext x='250' y='120' font-family='Arial' font-size='24' font-weight='bold' text-anchor='middle' fill='%23ffffff'%3ESpotlight%3C/text%3E%3Ctext x='250' y='230' font-family='Arial' font-size='18' text-anchor='middle' fill='%23ffffff'%3ESpecial Offer%3C/text%3E%3C/svg%3E";

// Happy hours fallback image
export const HAPPY_HOURS_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23dbeafe'/%3E%3Ccircle cx='250' cy='120' r='80' fill='%2393c5fd' opacity='0.8'/%3E%3Cpath d='M200 180 L300 180 L320 270 L180 270 Z' fill='%233b82f6' opacity='0.7'/%3E%3Ctext x='250' y='120' font-family='Arial' font-size='24' font-weight='bold' text-anchor='middle' fill='%23ffffff'%3EHAPPY%3C/text%3E%3Ctext x='250' y='230' font-family='Arial' font-size='18' text-anchor='middle' fill='%23ffffff'%3EHOURS%3C/text%3E%3C/svg%3E";

// Spin to win fallback image
export const SPIN_TO_WIN_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3e8ff'/%3E%3Ccircle cx='250' cy='150' r='100' fill='%23ddd6fe' stroke='%238b5cf6' stroke-width='4'/%3E%3Ccircle cx='250' cy='150' r='6' fill='%238b5cf6'/%3E%3Cpath d='M250 150 L250 70' stroke='%238b5cf6' stroke-width='4'/%3E%3Ctext x='250' y='260' font-family='Arial' font-size='20' font-weight='bold' text-anchor='middle' fill='%238b5cf6'%3ESPIN TO WIN%3C/text%3E%3C/svg%3E";

// Generic fallback for any offer
export const GENERIC_OFFER_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Cpath d='M250 80 L300 180 L200 180 Z' fill='%23d1d5db'/%3E%3Crect x='180' y='200' width='140' height='40' fill='%239ca3af'/%3E%3Ctext x='250' y='225' font-family='Arial' font-size='16' text-anchor='middle' fill='%23ffffff'%3ESpecial Offer%3C/text%3E%3C/svg%3E";

// Get fallback based on offer type
export const getFallbackImageByType = (type) => {
  switch (type) {
    case 'happyhours':
      return HAPPY_HOURS_FALLBACK;
    case 'spintowin':
      return SPIN_TO_WIN_FALLBACK;
    case 'spotlight':
      return SPOTLIGHT_FALLBACK;
    default:
      return GENERIC_OFFER_FALLBACK;
  }
};
