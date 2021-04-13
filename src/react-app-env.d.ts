/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_DEV_URL: string;
    REACT_APP_SUPABSE_URL: string;
    REACT_APP_SUPABSE_KEY: string;
  }
}
