import Purchase from "App/Models/Financial/Purchase";
import User from "App/Models/User";

export default class PurchaseServices {
  public async create(newPurchase: object, userId: number) {
    const user = await User.findOrFail(userId);
    const purchase = new Purchase();
    purchase.merge(newPurchase);

    await purchase.related("user").associate(user);
    return purchase;
  }

  public async read(search: object) {
    return await Purchase.query().where(search).preload("user");
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
