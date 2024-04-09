import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

interface BookCreationAttrs {
  title: string;
  author: string;
  year: string;
  description: string;
  userId: number;
}

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  bookId: number;
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;
  @Column({ type: DataType.STRING, allowNull: false })
  author: string;
  @Column({ type: DataType.STRING, allowNull: false })
  year: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;
}
