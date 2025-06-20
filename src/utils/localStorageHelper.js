// TEMP LOCAL STORAGE HELPER - NOT TO BE COMMITTED TO GITHUB
// This file provides temporary local storage functionality for development purposes only

// Keys for local storage
const STORAGE_KEYS = {
  ACCOUNT_INFO: 'owner_page_account_info',
  STORE_INFO: 'owner_page_store_info',
  APP_STATE: 'owner_page_app_state'
};

/**
 * Save account information to local storage
 * @param {Object} data - The account data to save
 */
export const saveAccountInfo = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCOUNT_INFO, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving account info to local storage:', error);
  }
};

/**
 * Load account information from local storage
 * @returns {Object|null} The saved account data or null if none exists
 */
export const loadAccountInfo = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACCOUNT_INFO);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading account info from local storage:', error);
    return null;
  }
};

/**
 * Save store information to local storage
 * @param {Object} data - The store data to save
 */
export const saveStoreInfo = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STORE_INFO, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving store info to local storage:', error);
  }
};

/**
 * Load store information from local storage
 * @returns {Object|null} The saved store data or null if none exists
 */
export const loadStoreInfo = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STORE_INFO);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading store info from local storage:', error);
    return null;
  }
};

/**
 * Save entire app state to local storage
 * @param {Object} state - The app state to save
 */
export const saveAppState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving app state to local storage:', error);
  }
};

/**
 * Load app state from local storage
 * @returns {Object|null} The saved app state or null if none exists
 */
export const loadAppState = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APP_STATE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading app state from local storage:', error);
    return null;
  }
};

/**
 * Update account verification status
 * @param {boolean} isVerified - Whether the account is verified
 */
export const updateVerificationStatus = (isVerified) => {
  try {
    const accountInfo = loadAccountInfo() || {};
    accountInfo.isVerified = isVerified;
    saveAccountInfo(accountInfo);
  } catch (error) {
    console.error('Error updating verification status:', error);
  }
};

/**
 * Clear all saved data from local storage
 */
export const clearAllStoredData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing local storage data:', error);
  }
};
