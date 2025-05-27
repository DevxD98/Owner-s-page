/**
 * Utility functions for handling images and image URLs
 */

/**
 * Converts a blob URL to a data URL for persistence
 * 
 * @param {string} blobUrl - The blob URL to convert
 * @returns {Promise<string>} A promise that resolves to the data URL
 */
export const blobUrlToDataUrl = async (blobUrl) => {
  if (!blobUrl || !blobUrl.startsWith('blob:')) {
    return blobUrl; // Not a blob URL, return as is
  }
  
  try {
    // Fetch the blob
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    
    // Convert blob to data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting blob URL to data URL:', error);
    return null; // Return null to indicate error
  }
};

/**
 * Safely check if a URL is valid or starts with appropriate protocols
 * 
 * @param {string} url - The URL to check
 * @returns {boolean} True if URL appears valid
 */
export const isValidImageUrl = (url) => {
  if (!url) return false;
  
  // Check for data URLs or http/https URLs
  return url.startsWith('data:') || 
         url.startsWith('http://') || 
         url.startsWith('https://');
};

/**
 * Provides a fallback image if the given URL is invalid
 * 
 * @param {string} url - The image URL to check
 * @param {string} fallbackUrl - Fallback URL if main URL is invalid
 * @returns {string} Either the original URL or the fallback
 */
export const getImageWithFallback = (url, fallbackUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M50 30 L70 70 L30 70 Z' fill='%23d1d5db'/%3E%3C/svg%3E") => {
  // If URL is not valid or is from an external domain that might have CORS issues, use the fallback
  if (!isValidImageUrl(url)) {
    return fallbackUrl;
  }
  
  // For data URLs, just return them directly
  if (url.startsWith('data:')) {
    return url;
  }
  
  // Return the original URL - we'll handle potential failures in the component using onError
  return url;
};
