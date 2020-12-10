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
import Workspace from "./workspace.model";
// eslint-disable-next-line import/no-cycle
import Resource from "./resource.model";

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

  @ForeignKey(() => Collection)
  @Column
  collectionID?: number;

  @BelongsTo(() => Collection, { onDelete: "CASCADE" })
  parentCollection?: Collection;

  @HasMany(() => Resource)
  resources!: Resource[];

  @HasMany(() => Collection)
  collections!: Collection[];

  @AllowNull(false)
  @ForeignKey(() => Workspace)
  @Column
  workspaceID!: number;

  @BelongsTo(() => Workspace)
  workspace!: Workspace;
}
