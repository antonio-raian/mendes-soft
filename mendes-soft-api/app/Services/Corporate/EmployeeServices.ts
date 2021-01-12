import Person from "App/Models/Corporate/Person";
import Employe from "App/Models/Corporate/Employe";

export default class EmployeeServices {
  public async create(newEmploye: object, personId: number) {
    const people = await Person.findOrFail(personId);
    const employe = new Employe();
    employe.merge(newEmploye);
    await employe.related("person").associate(people);
    return employe;
  }

  public async read(search) {
    const key = Object.keys(search)[0];
    if (key == "page")
      return await Employe.query()
        .preload("person", (q) => {
          q.preload("addresses").preload("contacts");
        })
        .preload("user")
        .paginate(search.page, 8);
    return await Employe.query()
      .where(search)
      .preload("person", (q) => {
        q.preload("addresses").preload("contacts");
      })
      .preload("user");
  }

  public async update(newEmploye) {
    const employe = await Employe.findOrFail(newEmploye.id);

    await employe.merge(newEmploye);

    return await employe.save();
  }

  public async delete(id: number) {
    const employe = await Employe.findOrFail(id);

    try {
      return await employe.delete();
    } catch (e) {
      if (!employe.active) throw { status: 400, message: "Employe inactive!" };

      employe.active = false;
      return await employe.save();
    }
  }
}
