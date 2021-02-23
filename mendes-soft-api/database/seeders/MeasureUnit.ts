import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import MeasureUnit from "App/Models/Product/MeasureUnit";

export default class MeasureUnitSeeder extends BaseSeeder {
  public async run() {
    await MeasureUnit.createMany([
      { description: "Kilograma", initials: "Kg" },
      { description: "Caixa", initials: "Cx" },
    ]);
  }
}
