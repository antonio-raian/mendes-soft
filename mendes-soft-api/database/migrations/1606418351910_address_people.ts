import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AddressPeople extends BaseSchema {
  protected tableName = "address_people";

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements("id");

        table
          .bigInteger("person_id")
          .references("people.id")
          .notNullable()
          .onDelete("cascade");
        table
          .bigInteger("address_id")
          .references("addresses.id")
          .notNullable()
          .onDelete("cascade");
        table.boolean("active").defaultTo(true);

        table.timestamps(true);
      });
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
