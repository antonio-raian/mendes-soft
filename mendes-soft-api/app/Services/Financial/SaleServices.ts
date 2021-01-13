import Client from "App/Models/Corporate/Client";
import Employe from "App/Models/Corporate/Employe";
import Sale from "App/Models/Financial/Sale";

export default class SaleServices {
  public async create(newSale: object, employeeId: number, clientId?: number) {
    const user = await Employe.findOrFail(employeeId);
    const sale = new Sale();
    sale.merge(newSale);

    if (clientId) {
      const client = await Client.findOrFail(clientId);

      await sale.related("client").associate(client);
    }

    await sale.related("employee").associate(user);
    return sale;
  }

  public async read(search) {
    const key = Object.keys(search)[0];
    if (key == "page")
      return await Sale.query()
        .preload("employee", (q) => {
          q.preload("person");
        })
        .preload("client", (q) => {
          q.preload("person");
        })
        .orderBy("createdAt", "desc")
        .paginate(search.page, 8);
    return await Sale.query()
      .where(search)
      .preload("employee", (q) => {
        q.preload("person");
      })
      .preload("client", (q) => {
        q.preload("person");
      })
      .orderBy("createdAt", "desc");
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
