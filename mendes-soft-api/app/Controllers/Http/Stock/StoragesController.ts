import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import StorageServices from "App/Services/Stock/StorageServices";

export default class StoragesController {
  public async create({ request }: HttpContextContract) {
    const { storage, item } = request.all();

    return await new StorageServices().create(storage, item);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new StorageServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { storage } = request.all();

    return await new StorageServices().update(storage);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new StorageServices().delete(params.id);
  }
}
