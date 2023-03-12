import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientInfo } from './client-info.entity';
import { ClientInfoController } from './client-info.controller';
import { ClientInfoService } from './client-info.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql12.freesqldatabase.com',
      port: 3306,
      username: 'sql12604856',
      password: 'cfwZ4lPRg2',
      database: 'sql12604856',
      entities: [ClientInfo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ClientInfo]),
  ],
  controllers: [AppController, ClientInfoController],
  providers: [AppService, ClientInfoService],
})
export class AppModule {}
