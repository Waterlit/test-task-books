import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { UsersModule } from '../users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './books.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [SequelizeModule.forFeature([Book]), UsersModule, JwtModule],
})
export class BooksModule {}
