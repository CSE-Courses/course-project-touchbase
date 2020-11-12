import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
// eslint-disable-next-line import/no-cycle
import Collection from "./collection.model";
// eslint-disable-next-line import/no-cycle
import User from "./user.model";

@Table
export default class Resource extends Model implements Resource {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  type!: string;

  @Column
  data?: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  ownerID!: number;

  @BelongsTo(() => User)
  owner!: User;

  @ForeignKey(() => Collection)
  @Column
  collectionID!: number;

  @BelongsTo(() => Collection, { onDelete: "CASCADE" })
  collection!: Collection;
}
