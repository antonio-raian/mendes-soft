import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PurchaseServices from "App/Services/Financial/PurchaseServices";
import ItemServices from "App/Services/Product/ItemServices";
import { fromStorage, toStorage } from "../../../Services/Financial/utils";

export default class PurchasesController {
  public async create({ request, auth }: HttpContextContract) {
    const { purchase } = request.all();
    console.log("DAta purch", purchase);
    let value = 0;
    const user = await auth.authenticate();

    await Promise.all(
      purchase.items.map(async (item) => {
        const i = (await new ItemServices().read({ id: item.id }))[0];

        item["name"] = i.name;
        item["internal_code"] = i.internal_code;
        item["bar_code"] = i.bar_code;
        value += Number(item.quantity) * Number(item.unit_value);

        await toStorage(
          i.id,
          Number(item.quantity),
          Number(item.unit_value),
          i.gain
        );
      })
    );

    return await new PurchaseServices().create(
      { ...purchase, items: JSON.stringify(purchase.items), value },
      user.employee_id
    );
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new PurchaseServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { purchase } = request.all();

    return await new PurchaseServices().update(purchase);
  }

  public async destroy({ params }: HttpContextContract) {
    const purchase = await new PurchaseServices().read({ id: params.id });

    const items = JSON.parse(purchase[0].items);

    await Promise.all(
      items.map(async (item) => {
        await fromStorage(item.id, item.quantity);
      })
    );

    return await new PurchaseServices().update({
      id: params.id,
      status: "canceled",
    });
    // return await new PurchaseServices().delete(params.id);
  }
}
