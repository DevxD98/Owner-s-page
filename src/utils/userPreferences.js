// Utility functions to handle user preferences and visit tracking

/**
 * Check if this is the first time a user is visiting a specific page
 * @param {string} pageId - Unique identifier for the page
 * @returns {boolean} - True if this is the first visit, false otherwise
 */
export const isFirstVisit = (pageId) => {
  try {
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];
    return !visitedPages.includes(pageId);
  } catch (e) {
    return true;
  }
};

/**
 * Mark a page as visited
 * @param {string} pageId - Unique identifier for the page
 */
export const markPageVisited = (pageId) => {
  try {
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];
    if (!visitedPages.includes(pageId)) {
      visitedPages.push(pageId);
      localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    }
  } catch (e) {
    // Silently fail if localStorage is unavailable
  }
};

/**
 * Reset visited pages (for testing)
 */
export const resetVisitedPages = () => {
  localStorage.removeItem('visitedPages');
};
