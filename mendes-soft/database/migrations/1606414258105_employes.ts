import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Employes extends BaseSchema {
  protected tableName = "employes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.bigInteger("person_id").references("people.id").unique();
      table.float("comission");
      table.float("salary").notNullable();
      table.boolean("active").defaultTo(true);

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
