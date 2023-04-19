import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { OMDBService } from '../services/omdb.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [OMDBService],
})
export class AppModule {}
