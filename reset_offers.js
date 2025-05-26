// Script to clear offers in localStorage and reload
localStorage.removeItem('offers');
console.log('Cleared offers from localStorage. Reloading page...');
setTimeout(() => window.location.reload(), 500);
