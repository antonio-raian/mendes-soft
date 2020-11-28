import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Categories extends BaseSchema {
  protected tableName = "categories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.string("name").notNullable();
      table.string("description").notNullable();
      table.boolean("active").defaultTo(true);

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
