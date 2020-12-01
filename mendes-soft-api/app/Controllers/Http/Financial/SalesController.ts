import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SaleServices from "App/Services/Financial/SaleServices";
import ItemServices from "App/Services/Product/ItemServices";
import StorageServices from "App/Services/Stock/StorageServices";
import { fromStorage, toStorage } from "../../../Services/Financial/utils";

export default class SalesController {
  public async create({ request, auth }: HttpContextContract) {
    const { sale, client } = request.all();
    let value = 0;

    const user = await auth.authenticate();

    await Promise.all(
      sale.items.map(async (item) => {
        const i = (await new ItemServices().read({ id: item.id }))[0];

        await fromStorage(i.id, item.quantity);

        const storage = (
          await new StorageServices().read({ item_id: i.id })
        )[0];

        item["unit_value"] = storage.value_sale;
        item["total_value"] = item.quantity * storage.value_sale;

        value += item.quantity * storage.value_sale;
      })
    );

    return await new SaleServices().create(
      {
        ...sale,
        items: JSON.stringify(sale.items),
        gross_value: value,
        net_value: value - value * sale.discount,
      },
      user.employee_id,
      client
    );
  }

  public async show({ request }: HttpContextContract) {
    const search = request.all();

    return await new SaleServices().read(search);
  }

  public async update({ request }: HttpContextContract) {
    const { sale } = request.all();

    return await new SaleServices().update(sale);
  }

  public async destroy({ params }: HttpContextContract) {
    const sale = await new SaleServices().read({ id: params.id });

    const items = JSON.parse(sale[0].items);

    await Promise.all(
      items.map(async (item) => {
        await toStorage(item.id, item.quantity);
      })
    );

    return await new SaleServices().update({
      id: params.id,
      status: "canceled",
    });
  }
}
