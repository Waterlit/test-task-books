import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private bookRepository: typeof Book) {}
  async addBook(createBookDto: CreateBookDto) {
    return this.bookRepository.create(createBookDto);
  }

  async getAllBooks() {
    const books = await this.bookRepository.findAll();
    if (!books) {
      throw new HttpException('Не найдено', HttpStatus.NOT_FOUND);
    }
    return books.map((books) => books.title);
  }

  async getBookById(bookId: number) {
    const book = await this.bookRepository.findByPk(bookId);
    if (!book) {
      throw new HttpException('Не найдено', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async updateBookById(bookId: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findByPk(bookId);
    if (!book) {
      throw new HttpException('Не найдено', HttpStatus.NOT_FOUND);
    }
    return book.update(updateBookDto);
  }

  async remove(bookId: number) {
    const book = await this.bookRepository.findByPk(bookId);
    if (!book) {
      throw new HttpException('Не найдено', HttpStatus.NOT_FOUND);
    }
    await book.destroy();
  }
}
