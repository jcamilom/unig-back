module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  jwtSecretKey: process.env.JWT_SECTRET_KEY,
};