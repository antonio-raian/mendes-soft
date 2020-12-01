import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
} from "@ioc:Adonis/Lucid/Orm";
import Employe from "../Corporate/Employe";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public password: string;

  @column({ serializeAs: null })
  public employee_id: number;

  @column()
  public rememberMeToken?: string;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  //Relations
  @belongsTo(() => Employe, { foreignKey: "employee_id" })
  public employee: BelongsTo<typeof Employe>;
}
