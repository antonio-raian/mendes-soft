import Client from "App/Models/Corporate/Client";
import Sale from "App/Models/Financial/Sale";
import User from "App/Models/User";

export default class SaleServices {
  public async create(newSale: object, userId: number, clientId?: number) {
    const user = await User.findOrFail(userId);
    const sale = new Sale();
    sale.merge(newSale);

    if (clientId) {
      const client = await Client.findOrFail(clientId);

      await sale.related("client").associate(client);
    }

    await sale.related("user").associate(user);
    return sale;
  }

  public async read(search: object) {
    return await Sale.query().where(search).preload("user").preload("client");
  }

  public async update(newSale) {
    const sale = await Sale.findOrFail(newSale.id);

    await sale.merge(newSale);

    return await sale.save();
  }

  public async delete(id: number) {
    const sale = await Sale.findOrFail(id);

    try {
      return await sale.delete();
    } catch (e) {
      if (!sale.active) throw { status: 400, message: "Sale inactive!" };

      sale.active = false;
      return await sale.save();
    }
  }
}
