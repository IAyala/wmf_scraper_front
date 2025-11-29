// API configuration
const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  baseURL: isDevelopment
    ? 'http://localhost:8000'
    : 'https://wmf-scraper.fly.dev',
  apiKey: process.env.REACT_APP_API_KEY
};



// Default axios configuration
export const getApiHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  // Add API key for production using Authorization Bearer header
  if (!isDevelopment && API_CONFIG.apiKey) {
    headers['Authorization'] = `Bearer ${API_CONFIG.apiKey}`;
  }

  return headers;
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};