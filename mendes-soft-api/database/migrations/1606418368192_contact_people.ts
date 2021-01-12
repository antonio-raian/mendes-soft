import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ContactPeople extends BaseSchema {
  protected tableName = "contact_people";

  public async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      this.schema.createTable(this.tableName, (table) => {
        table.bigIncrements("id");

        table
          .bigInteger("person_id")
          .references("people.id")
          .notNullable()
          .onDelete("cascade");
        table
          .bigInteger("contact_id")
          .references("contacts.id")
          .notNullable()
          .onDelete("cascade");
        table.boolean("active").defaultTo(true);

        table.timestamps(true);
      });
    } else this.schema.alterTable(this.tableName, (table) => {});
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
