import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5001,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: ['dist/**/entities/*.entity.js'],
  subscribers: [],
  migrations: ['dist/**/migration/*.js'],
} as DataSourceOptions;
