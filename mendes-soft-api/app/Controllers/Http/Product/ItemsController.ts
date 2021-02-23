import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ItemServices from "App/Services/Product/ItemServices";

export default class ItemsController {
  public async create({ request }: HttpContextContract) {
    const { item, category, measure } = request.all();

    return await new ItemServices().create(item, category, measure);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new ItemServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { item } = request.all();

    return await new ItemServices().update(item);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new ItemServices().delete(params.id);
  }
}
