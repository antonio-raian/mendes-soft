import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Addresses extends BaseSchema {
  protected tableName = "addresses";

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements("id");

        table.string("cep").notNullable();
        table.string("public_name").notNullable();
        table.string("number").notNullable();
        table.string("aditional");
        table.string("district").notNullable();
        table.string("city").notNullable();
        table.string("state").notNullable();
        table.boolean("active").defaultTo(true);

        table.timestamps(true);
      });
    else this.schema.alterTable(this.tableName, (table) => {});
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
