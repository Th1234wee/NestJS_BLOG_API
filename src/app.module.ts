import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {  DatabaseModule } from './database/database.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { PostModule } from './module/post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule
  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule {}
