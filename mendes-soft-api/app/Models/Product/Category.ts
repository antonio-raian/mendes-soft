import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Item from "./Item";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public "name": string;
  @column()
  public "description": string;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relations
  @hasMany(() => Item, { foreignKey: "category_id" })
  public items: HasMany<typeof Item>;
}
