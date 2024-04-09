import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { JwtAuthGuard } from '../users/user.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.addBook(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  findOne(@Param('id') bookId: number) {
    return this.booksService.getBookById(bookId);
  }

  @Patch(':id')
  update(@Param('id') bookId: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBookById(bookId, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') bookId: number) {
    return this.booksService.remove(bookId);
  }
}
