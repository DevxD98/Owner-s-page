// This file contains utility functions for dealing with React navigation and routing

/**
 * Adds URL parameters to a route
 * @param {string} baseRoute - The base route without parameters
 * @param {Object} params - Key-value pairs of parameters to add
 * @returns {string} The route with parameters
 */
export const addParamsToRoute = (baseRoute, params = {}) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${baseRoute}?${queryString}` : baseRoute;
};

/**
 * Creates state object to pass to navigate from React Router
 * @param {Object} state - State object to pass to navigate
 * @returns {Object} State with timestamp for cache busting
 */
export const createNavigationState = (state = {}) => {
  return {
    ...state,
    _timestamp: Date.now() // Add timestamp for cache busting
  };
};
