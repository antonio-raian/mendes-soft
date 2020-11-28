import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ClientServices from "App/Services/Corporate/ClientServices";

export default class ClientsController {
  public async create({ request }: HttpContextContract) {
    const { client, personId } = request.all();

    return await new ClientServices().create(client, personId);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new ClientServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { client } = request.all();

    return await new ClientServices().update(client);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new ClientServices().delete(params.id);
  }
}
