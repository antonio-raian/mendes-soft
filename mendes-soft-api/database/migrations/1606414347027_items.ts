import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Items extends BaseSchema {
  protected tableName = "items";

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements("id");

        table.bigInteger("category_id").references("categories.id");
        table.string("bar_code");
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.float("gain").notNullable();
        table.boolean("active").defaultTo(true);

        table.timestamps(true);
      });
    } else
      this.schema.alterTable(this.tableName, (table) => {
        table.string("bar_code").alter();
      });
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
