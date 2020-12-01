import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Items extends BaseSchema {
  protected tableName = "items";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.bigInteger("category_id").references("categories.id");
      table.string("bar_code").notNullable();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.float("gain").notNullable();
      table.boolean("active").defaultTo(true);

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
