/**
 * Utility functions
 */

export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
