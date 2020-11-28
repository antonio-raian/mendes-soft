import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import EmployeeServices from "App/Services/Corporate/EmployeeServices";

export default class EmployesController {
  public async create({ request }: HttpContextContract) {
    const { employee, personId } = request.all();

    return await new EmployeeServices().create(employee, personId);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new EmployeeServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { employee } = request.all();

    return await new EmployeeServices().update(employee);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new EmployeeServices().delete(params.id);
  }
}
