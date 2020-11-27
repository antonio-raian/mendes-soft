import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Person from "./Person";

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column() public "email": string;
  @column() public "celphone": string;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relations
  @manyToMany(() => Person, {
    pivotTable: "contact_people",
  })
  public person: ManyToMany<typeof Person>;
}
