import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Address from "./Address";
import Contact from "./Contact";
import User from "../User";
import Employe from "./Employe";

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public document: string;

  @column()
  public active: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //relations
  @manyToMany(() => Address, {
    pivotTable: "address_people",
  })
  public addresses: ManyToMany<typeof Address>;

  @manyToMany(() => Contact, {
    pivotTable: "contact_people",
  })
  public contacts: ManyToMany<typeof Contact>;

  @hasOne(() => Employe, { foreignKey: "person_id" })
  public employee: HasOne<typeof Employe>;
}
