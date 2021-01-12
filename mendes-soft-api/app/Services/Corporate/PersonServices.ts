import Person from "App/Models/Corporate/Person";

export default class PersonServices {
  public async create(
    newPerson: object,
    addressId?: number,
    contactId?: number
  ) {
    const person = await Person.firstOrCreate(newPerson);

    addressId && (await person.related("addresses").sync([addressId]));
    contactId && (await person.related("contacts").sync([contactId]));

    return person;
  }

  public async read(search: object) {
    return await Person.query()
      .where(search)
      .preload("addresses")
      .preload("contacts")
      .orderBy("name", "asc");
  }

  public async update(newPerson) {
    const person = await Person.findOrFail(newPerson.id);
    await person.merge(newPerson);

    return await person.save();
  }

  public async delete(id: number) {
    const person = await Person.findOrFail(id);

    try {
      return await person.delete();
    } catch (e) {
      if (!person.active) throw { status: 400, message: "Person inactive!" };

      person.active = false;
      return await person.save();
    }
  }
}
