import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AddressServices from "App/Services/Corporate/AddressServices";

export default class AddressesController {
  public async create({ request }: HttpContextContract) {
    const { address, personId } = request.all();

    return await new AddressServices().create(address, personId);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new AddressServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { address } = request.all();

    return await new AddressServices().update(address);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new AddressServices().delete(params.id);
  }
}
