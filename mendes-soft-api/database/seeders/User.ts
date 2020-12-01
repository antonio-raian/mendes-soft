import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Address from "App/Models/Corporate/Address";
import Contact from "App/Models/Corporate/Contact";
import Person from "App/Models/Corporate/Person";
import User from "App/Models/User";
import Employe from "../../app/Models/Corporate/Employe";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const person = await Person.create({
      name: "Desenvolvedor",
      document: "123.123.123-12",
    });

    const address = await Address.create({
      cep: "44900-000",
      public_name: "Rua A",
      number: "2",
      city: "IRC",
      district: "Centro",
      state: "BA",
    });

    const contact = await Contact.create({ celphone: "(74) 9.9976-2668" });

    person.related("addresses").sync([address.id]);
    person.related("contacts").sync([contact.id]);

    const employee = await Employe.create({
      person_id: person.id,
      salary: 1500,
      comission: 50,
    });

    await User.create({
      employee_id: employee.id,
      username: "develope",
      password: "123456",
    });
  }
}
