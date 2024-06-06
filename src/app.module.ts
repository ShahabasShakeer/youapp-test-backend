import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './mongo/mongo.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [MongoModule, AuthModule, ProfileModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
