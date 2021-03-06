const env = process.env;
const {
  NODE_ENV,
  REACT_APP_DEV_URL,
  REACT_APP_SUPABSE_URL,
  REACT_APP_SUPABSE_KEY
} = env;

/**
 * @description We'll use this object to iterate on it and check
 * if the env vars has the value assigned and if not then we'll
 * throw a warning in the console.
 */
const env_required: { [key: string]: string } = {
  REACT_APP_DEV_URL,
  REACT_APP_SUPABSE_URL,
  REACT_APP_SUPABSE_KEY
};

export const isDevelopment = NODE_ENV === 'development';
// export const API_URL = isDevelopment ? REACT_APP_DEV_URL : REACT_APP_PROD_URL;
export const API_URL = REACT_APP_DEV_URL;
export const supabseConfig = {
  URL: REACT_APP_SUPABSE_URL,
  KEY: REACT_APP_SUPABSE_KEY
};

const checkEnv = () => {
  Object.keys(env_required).forEach(key => {
    const value = env_required[key];
    if (!value) {
      console.error(
        `Please set the env var: ${key} in .env for development and in your development server for production/staging`
      );
    }
  });
};

checkEnv();
