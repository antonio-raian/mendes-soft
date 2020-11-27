import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Storages extends BaseSchema {
  protected tableName = "storages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.bigInteger("item_id").references("items.id").notNullable();
      table.float("quantity");
      table.float("value_sale");
      table.boolean("active").defaultTo(true);

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
