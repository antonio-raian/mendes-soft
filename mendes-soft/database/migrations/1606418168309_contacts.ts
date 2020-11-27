import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Contacts extends BaseSchema {
  protected tableName = "contacts";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.string("email");
      table.string("celphone").notNullable();
      table.boolean("active").defaultTo(true);

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
