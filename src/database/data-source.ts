import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Wishlist } from '../wishlists/entities/wishlist.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Wishlist],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  synchronize: false,
  logging: process.env.POSTGRES_LOGGING === 'true',
});
