import { Table, Column, Model, AllowNull, Unique } from "sequelize-typescript";

@Table
export default class User extends Model<User> {
  @Unique
  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @Column
  name?: string;
}
