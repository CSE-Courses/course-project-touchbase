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
import User from "./user.model";

@Table
export default class Setting extends Model implements Setting {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  ownerID!: number;

  @BelongsTo(() => User)
  owner!: User;

  @Column
  darkmode!: boolean;

  @Column
  color!: string;
}
