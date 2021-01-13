import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersSchema extends BaseSchema {
  protected tableName = "users";

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments("id").primary();

        table.bigInteger("employee_id").references("employes.id");

        table.string("username", 255).notNullable().unique();
        table.string("password", 180).notNullable();
        table.string("remember_me_token").nullable();
        table.boolean("active").defaultTo(true);

        table.timestamps(true);
      });
    } else this.schema.alterTable(this.tableName, (table) => {});
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
