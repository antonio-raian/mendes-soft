import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CategoryServices from "App/Services/Product/CategoryServices";

export default class CategoriesController {
  public async create({ request }: HttpContextContract) {
    const { category } = request.all();

    return await new CategoryServices().create(category);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new CategoryServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { category } = request.all();

    return await new CategoryServices().update(category);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new CategoryServices().delete(params.id);
  }
}
