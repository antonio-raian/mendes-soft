import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UserServices from "App/Services/User/UserServices";

export default class UserController {
  public async login({ request, auth }: HttpContextContract) {
    const { username, password } = request.all();

    const token = await auth.attempt(username, password);
    const user = await User.findBy("username", username);
    return { user, token };
  }

  public async create({ request }: HttpContextContract) {
    const { user, personId } = request.all();

    return await new UserServices().create(user, personId);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new UserServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { user } = request.all();

    return await new UserServices().update(user);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new UserServices().delete(params.id);
  }
}
