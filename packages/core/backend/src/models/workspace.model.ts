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
// eslint-disable-next-line import/no-cycle
import Collection from "./collection.model";
// eslint-disable-next-line import/no-cycle
import Resource from "./resource.model";

@Table
export default class Workspace extends Model implements Workspace {
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
  resources!: Resource[];

  @HasMany(() => Collection)
  collections!: Collection[];
}
