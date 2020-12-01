import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Client from "../Corporate/Client";
import Employe from "../Corporate/Employe";

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null }) public "employee_id": number;
  @column({ serializeAs: null }) public "client_id": number;
  @column() public "items": string; // array de objetos contendo dados do produto + quantidade + valores
  @column() public "gross_value": number;
  @column() public "net_value": number;
  @column() public "discount": number;
  @column() public "type_payment": string;
  @column() public "form_payment": string;
  @column() public "payment_date": DateTime;
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

  @belongsTo(() => Client, { foreignKey: "client_id" })
  public client: BelongsTo<typeof Client>;
}
