// API configuration
const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  baseURL: isDevelopment 
    ? 'http://localhost:8000' 
    : 'https://wmf-scraper.fly.dev',
  // For production, we'll fetch the API key from the backend or use a different auth method
  apiKey: process.env.REACT_APP_API_KEY
};

// Default axios configuration
export const getApiHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  // Add API key for production
  if (!isDevelopment && API_CONFIG.apiKey) {
    headers['X-API-Key'] = API_CONFIG.apiKey;
  }

  return headers;
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};