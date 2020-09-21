import {Table, Column, Model, AllowNull, ForeignKey, BelongsTo} from "sequelize-typescript";
import User from "./user.model";

@Table
export default class Collection extends Model implements Collection {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  ownerID!: number;


  @BelongsTo(() => User)
  owner!: User;
}
