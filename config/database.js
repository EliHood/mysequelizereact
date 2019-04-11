if (!process.env.PG_DB) {
    const fs = require('fs')
    const dotenv = require('dotenv')
    const envConfig = dotenv.parse(fs.readFileSync('.env'))
  
    for (var k in envConfig) {
      process.env[k] = envConfig[k]
    }
  
    console.log('[api][sequelize] Loaded database ENV vars from .env file')
  }
  
  module.exports = {
    development: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      dialect: 'postgres',
      migrationStorageTableName: 'sequelize_meta'
    },

    production: {
      username: "root",
      password: null,
      database: "postgres://zhxyfgsfxgklyn:7a47a3a5ec8fe28bd7fd2426a2c47258e4d3ca029fe4a0e478a29064891dae83@ec2-23-21-234-53.compute-1.amazonaws.com:5432/dca54vcb49ocfj",
      host: "127.0.0.1",
      dialect: "postgres",
      use_env_variable: "DATABASE_URL"
    }
  
  }
  