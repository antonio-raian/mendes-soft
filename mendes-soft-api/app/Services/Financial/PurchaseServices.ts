import Employe from "App/Models/Corporate/Employe";
import Purchase from "App/Models/Financial/Purchase";

export default class PurchaseServices {
  public async create(newPurchase: object, employeeId: number) {
    const employee = await Employe.findOrFail(employeeId);
    const purchase = new Purchase();
    purchase.merge(newPurchase);

    await purchase.related("employee").associate(employee);
    return purchase;
  }

  public async read(search: object) {
    return await Purchase.query()
      .where(search)
      .preload("employee", (q) => {
        q.preload("person");
      });
  }

  public async update(newPurchase) {
    const purchase = await Purchase.findOrFail(newPurchase.id);

    await purchase.merge(newPurchase);

    return await purchase.save();
  }

  public async delete(id: number) {
    const purchase = await Purchase.findOrFail(id);

    try {
      return await purchase.delete();
    } catch (e) {
      if (!purchase.active)
        throw { status: 400, message: "Purchase inactive!" };

      purchase.active = false;
      return await purchase.save();
    }
  }
}
