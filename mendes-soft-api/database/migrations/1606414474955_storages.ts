import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Storages extends BaseSchema {
  protected tableName = "storages";

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements("id");

        table
          .bigInteger("item_id")
          .references("items.id")
          .unique()
          .notNullable();
        table.float("quantity");
        table.float("value_sale");
        table.float("value_cost");
        table.boolean("active").defaultTo(true);

        table.timestamps(true);
      });
    else
      this.schema.alterTable(this.tableName, (table) => {
        table.bigInteger("item_id").notNullable().unique().alter();
      });
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
