const configs = {
  API_DOMAIN: import.meta.env.VITE_API_DOMAIN || 'http://localhost:5000/api/',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
};

export default configs;
