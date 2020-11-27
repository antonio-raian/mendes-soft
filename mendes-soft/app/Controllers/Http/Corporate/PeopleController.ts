import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PersonServices from "App/Services/Corporate/PersonServices";

export default class PeopleController {
  public async create({ request }: HttpContextContract) {
    const { person, addressId, contactId } = request.all();

    return await new PersonServices().create(person, addressId, contactId);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new PersonServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { person } = request.all();

    return await new PersonServices().update(person);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new PersonServices().delete(params.id);
  }
}
