import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config(); // Load .env file

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + 'src/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
});

export default AppDataSource;