const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : 'https://college-lost-found-2i20.onrender.com/api');

/**
 * Generic fetch wrapper for CampusFind API
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('campusfind_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || 'API Request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (!error.status) {
      error.message = (error.message === 'Failed to fetch' || error.name === 'TypeError')
        ? 'Unable to connect to CampusFind AI server. Please verify the backend server is running.'
        : error.message;
    }
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
};

// API Services
export const authService = {
  register: (userData) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => apiFetch('/auth/me')
};

export const itemService = {
  createReport: (itemData) => apiFetch('/items', { method: 'POST', body: JSON.stringify(itemData) }),
  getItems: (params = '') => apiFetch(`/items?${params}`),
  getItemById: (id) => apiFetch(`/items/${id}`)
};

export const matchService = {
  evaluate: (lostItem, foundItem) => apiFetch('/matches/evaluate', { method: 'POST', body: JSON.stringify({ lostItem, foundItem }) }),
  getMyMatches: () => apiFetch('/matches/my-matches')
};

export const claimService = {
  submitClaim: (claimData) => apiFetch('/claims/submit', { method: 'POST', body: JSON.stringify(claimData) })
};

export const statsService = {
  getOverview: () => apiFetch('/stats/overview')
};

export default {
  API_BASE_URL,
  authService,
  itemService,
  matchService,
  claimService,
  statsService
};
