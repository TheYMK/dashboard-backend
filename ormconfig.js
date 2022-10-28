require('dotenv').config()

const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  }
}

switch (process.env.NODE_ENV) {
  case 'development':
    console.log("I'm in development mode!")
    console.log('devdb: ', process.env.DEV_DATABASE_URL)
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DEV_DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
    })
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true
    })
    break;
  case 'production':
    console.log("I'm in production mode!")
    console.log('proddb: ', process.env.DATABASE_URL)
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL || process.env.PROD_DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: { rejectUnauthorized: false }
    })
    break;
  default:
    throw new Error('NODE_ENV is not set')
}

module.exports = dbConfig;