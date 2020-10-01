import { Table, Column, Model, AllowNull, Unique, HasMany } from "sequelize-typescript";
// eslint-disable-next-line import/no-cycle
import Collection from "./collections.model";

@Table
export default class User extends Model implements User {
  @Unique
  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @Column
  name?: string;

  @HasMany(() => Collection)
  collections?: Collection[];
}
