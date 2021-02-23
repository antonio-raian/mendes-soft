import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MeasureUnitServices from 'App/Services/Product/MeaseureUnitServices';

export default class MeasureUnitsController {
  public async create({ request }: HttpContextContract) {
    const { measure } = request.all();

    return await new MeasureUnitServices().create(measure);
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new MeasureUnitServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { measure } = request.all();

    return await new MeasureUnitServices().update(measure);
  }

  public async destroy({ params }: HttpContextContract) {
    return await new MeasureUnitServices().delete(params.id);
  }
}

}
