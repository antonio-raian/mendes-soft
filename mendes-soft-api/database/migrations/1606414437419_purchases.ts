import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Purchases extends BaseSchema {
  protected tableName = "purchases";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.bigInteger("employee_id").references("employes.id");
      table.string("items").notNullable(); // array de objetos contendo dados do produto + quantidade + valores
      table.float("value");
      table.enu("type_payment", ["money", "card"]);
      table.timestamp("expected_payment_date");
      table.enu("status", ["paid", "pending", "canceled"]);
      table.boolean("active").defaultTo(true);

      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
