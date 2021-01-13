import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Person from "./Person";
import User from "../User";

export default class Employe extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public person_id: number;
  @column()
  public comission: number;
  @column()
  public salary: number;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relations
  @belongsTo(() => Person, { foreignKey: "person_id" })
  public person: BelongsTo<typeof Person>;

  @hasOne(() => User { foreignKey: "employee_id" })
  public user: HasOne<typeof User>;
}
