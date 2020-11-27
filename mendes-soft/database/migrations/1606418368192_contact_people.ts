import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ContactPeople extends BaseSchema {
  protected tableName = "contact_people";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.bigInteger("person_id").references("people.id").notNullable();
      table.bigInteger("contact_id").references("contacts.id").notNullable();
      table.boolean("active").defaultTo(true);

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
