const configs = {
  APP_ENV: process.env.REACT_APP_ENV,
  API_DOMAIN: process.env.REACT_APP_API_DOMAIN,
  DEBUG_MODE: process.env.REACT_APP_DEBUG_MODE || false,
  GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY || false,
};

export default configs;
