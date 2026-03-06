import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres' as const,
    url: configService.get<string>('DATABASE_URL'),
    host: configService.get<string>('POSTGRES_HOST', 'localhost'),
    port: configService.get<number>('POSTGRES_PORT', 5432),
    username: configService.get<string>('POSTGRES_USER', 'postgres'),
    password: configService.get<string>('POSTGRES_PASSWORD', 'postgres'),
    database: configService.get<string>('POSTGRES_DB', 'family_db'),
    synchronize: configService.get<string>('POSTGRES_SYNCHRONIZE', 'true') === 'true',
    logging: configService.get<string>('POSTGRES_LOGGING', 'false') === 'true',
    autoLoadEntities: true,
  }),
};
