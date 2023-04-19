import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [UsersModule, AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
      logging: false,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {
  constructor() {
    console.log([join(__dirname, '**', '*.entity.{ts,js}')],);
  }
}
