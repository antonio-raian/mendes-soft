import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class People extends BaseSchema {
  protected tableName = "people";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.string("name").notNullable();
      table.string("document").notNullable().unique();
      table.boolean("active").defaultTo(true);

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
