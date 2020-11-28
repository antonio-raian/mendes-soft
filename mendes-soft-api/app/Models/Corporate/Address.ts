import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Person from "./Person";

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column() public "cep": string;
  @column() public "public_name": string;
  @column() public "number": string;
  @column() public "aditional": string;
  @column() public "district": string;
  @column() public "city": string;
  @column() public "state": string;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relations
  @manyToMany(() => Person, {
    pivotTable: "address_people",
  })
  public person: ManyToMany<typeof Person>;
}
