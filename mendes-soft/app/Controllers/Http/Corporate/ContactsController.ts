import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ContactServices from "App/Services/Corporate/ContactServices";

export default class ContactsController {
  public async create({ request }: HttpContextContract) {
    const { contact, personId } = request.all();

    return await new ContactServices().create(contact, personId);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new ContactServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { contact } = request.all();

    return await new ContactServices().update(contact);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new ContactServices().delete(params.id);
  }
}
