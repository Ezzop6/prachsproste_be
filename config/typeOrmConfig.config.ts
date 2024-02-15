import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbSettings = config['db'];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE || dbSettings.type,
  host: process.env.DB_HOST || dbSettings.host,
  port: process.env.DB_PORT || dbSettings.port,
  username: process.env.DB_USER || dbSettings.username,
  password: process.env.DB_PASSWORD || dbSettings.password,
  database: process.env.DB_NAME || dbSettings.dbName,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  autoLoadEntities: true,

  synchronize: process.env.TYPE_ORM_SYNCHRONIZE || dbSettings.synchronize,
};
