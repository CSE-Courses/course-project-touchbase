import {
  Table,
  Column,
  Model,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
// eslint-disable-next-line import/no-cycle
import Resource from "./resource.model";
// eslint-disable-next-line import/no-cycle
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

  @HasMany(() => Resource)
  resources?: Resource[];
}
