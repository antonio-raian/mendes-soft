import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Item from "../Product/Item";

export default class Storage extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null }) public "item_id": number;
  @column() public "quantity": number;
  @column() public "value_sale": number;
  @column() public "value_cost": number;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relations
  @belongsTo(() => Item, { foreignKey: "item_id" })
  public item: BelongsTo<typeof Item>;
}
