// Reset offers in localStorage to force a fresh load from the default data
export function resetOffers() {
  localStorage.removeItem('offers');
  console.log('Removed offers from localStorage. App will use default offers on next load.');
}
