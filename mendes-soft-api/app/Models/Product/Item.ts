import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Category from "./Category";
import Storage from "../Stock/Storage";

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public "category_id": number;
  @column()
  public "internal_code": string;
  @column()
  public "bar_code": string;
  @column()
  public "name": string;
  @column()
  public "description": string;
  @column()
  public "gain": number;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relations
  @belongsTo(() => Category, { foreignKey: "category_id" })
  public category: BelongsTo<typeof Category>;

  @hasOne(() => Storage, { foreignKey: "id" })
  public storage: HasOne<typeof Storage>;
}
