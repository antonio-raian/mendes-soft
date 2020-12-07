import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Employe from "../Corporate/Employe";

export default class Purchase extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null }) public "employee_id": number;
  @column() public "items": JSON; // array de objetos contendo dados do produto + quantidade + valores
  @column() public "value": number;
  @column() public "type_payment": string;
  @column() public "expected_payment_date": DateTime;
  @column() public "status": string;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Employe, { foreignKey: "employee_id" })
  public employee: BelongsTo<typeof Employe>;
}
