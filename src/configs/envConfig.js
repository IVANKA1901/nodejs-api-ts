require("dotenv").config();

const envConfig = {
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  BASE_URL: process.env.BASE_URL,
};

module.exports = envConfig;
