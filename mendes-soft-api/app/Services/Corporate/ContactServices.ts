import Contact from "App/Models/Corporate/Contact";

export default class ContactServices {
  public async create(newContact: object, personId: number) {
    const contact = await Contact.create(newContact);
    await contact.related("person").sync([personId]);
    return contact;
  }

  public async read(search: object) {
    return await Contact.query().where(search).orderBy("createAt", "asc");
  }

  public async update(newContact) {
    const contact = await Contact.findOrFail(newContact.id);

    await contact.merge(newContact);

    return await contact.save();
  }

  public async delete(id: number) {
    const contact = await Contact.findOrFail(id);

    try {
      return await contact.delete();
    } catch (e) {
      if (!contact.active) throw { status: 400, message: "Contact inactive!" };

      contact.active = false;
      return await contact.save();
    }
  }
}
