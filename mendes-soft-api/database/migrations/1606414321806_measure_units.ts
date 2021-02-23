import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class MeasureUnits extends BaseSchema {
  protected tableName = "measure_units";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.string("description").unique().notNullable();
      table.string("initials", 10).notNullable().unique();
      table.boolean("active").defaultTo(true).notNullable();

      table.timestamps(true);
    });
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
