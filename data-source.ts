import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATASOURCE_HOST || 'localhost',
  port: process.env.DATA_SOURCE_PORT
    ? parseInt(process.env.DATA_SOURCE_PORT)
    : 5434,
  username: process.env.DATA_SOURCE_USERNAME || 'postgres',
  password: process.env.DATA_SOURCE_PASSWORD || 'pass123',
  database: process.env.DATA_SOURCE_DATABASE || 'postgres',
  synchronize: true, // disable in prod
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
