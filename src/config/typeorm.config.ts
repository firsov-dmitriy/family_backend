import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres' as const,
    url: configService.getOrThrow<string>('DATABASE_URL'),
    synchronize: configService.get<string>('POSTGRES_SYNCHRONIZE', 'false') === 'true',
    logging: configService.get<string>('POSTGRES_LOGGING', 'false') === 'true',
    autoLoadEntities: true,
  }),
};
