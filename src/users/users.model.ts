import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Book } from '../books/books.model';

interface UserCreationAttrs {
  userName: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  userId: number;
  @Column({ type: DataType.STRING, allowNull: false })
  userName: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @HasMany(() => Book)
  books: Book[];
}
