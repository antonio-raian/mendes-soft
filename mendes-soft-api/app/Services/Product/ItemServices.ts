import Category from "App/Models/Product/Category";
import Item from "App/Models/Product/Item";
import { toStorage } from "../Financial/utils";

export default class ItemServices {
  public async create(newItem: Item, categoryId: number) {
    const category = await Category.findOrFail(categoryId);
    const item = new Item();
    await item.merge(newItem);
    item.gain = Number(newItem.gain);

    await item.related("category").associate(category);
    return item;
  }

  public async read(search: object) {
    const key = Object.keys(search)[0];
    if (key === "bar_code" || key === "name" || key === "description")
      return await Item.query()
        .whereRaw(`LOWER(${key}) like  LOWER('${search[key]}')`)
        .preload("category")
        .preload("storage")
        .orderBy("id", "asc");
    if (key === "category")
      return await Item.query()
        .preload("category", (q) => {
          q.whereRaw(`LOWER(name) like  LOWER('${search[key]}')`);
        })
        .orderBy("id", "asc");
    return await Item.query()
      .where(search)
      .preload("category")
      .orderBy("id", "asc");
  }

  public async update(newItem) {
    console.log("update", newItem);
    const item = await Item.findOrFail(newItem.id);

    await item.merge(newItem);

    newItem.gain && (await toStorage(item.id, 0, newItem.gain));

    return await item.save();
  }

  public async delete(id: number) {
    const item = await Item.findOrFail(id);

    try {
      return await item.delete();
    } catch (e) {
      if (!item.active) throw { status: 400, message: "Item inactive!" };

      item.active = false;
      return await item.save();
    }
  }
}
