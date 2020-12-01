import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Sales extends BaseSchema {
  protected tableName = "sales";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements("id");

      table.bigInteger("employee_id").references("employes.id");
      table.bigInteger("client_id").references("clients.id");
      table.string("items").notNullable(); // array de objetos contendo dados do produto + quantidade + valores
      table.float("gross_value");
      table.float("net_value");
      table.float("discount");
      table.enu("type_payment", ["money", "card"]);
      table.enu("form_payment", ["incash", "interm"]);
      table.timestamp("payment_date");
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
