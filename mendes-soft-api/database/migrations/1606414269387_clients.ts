import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Clients extends BaseSchema {
  protected tableName = "clients";

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements("id");

        table.bigInteger("person_id").references("people.id").unique();
        table.float("limit");
        table.boolean("active").defaultTo(true);

        table.timestamps(true);
      });
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
