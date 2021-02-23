import Category from "App/Models/Product/Category";
import Item from "App/Models/Product/Item";
import MeasureUnit from "App/Models/Product/MeasureUnit";
import { updateStorage } from "../Financial/utils";
import CategoryServices from "./CategoryServices";

export default class ItemServices {
  public async create(newItem: Item, categoryId: number, measureId: number) {
    const category = await Category.findOrFail(categoryId);
    const measure = await MeasureUnit.findOrFail(measureId);
    const item = new Item();
    await item.merge(newItem);
    item.gain = Number(newItem.gain);

    await item.related("category").associate(category);
    await item.related("measure").associate(measure);

    return item;
  }

  public async read(search) {
    console.log("serach", search);
    const key = Object.keys(search)[0];
    if (key === "id")
      return await Item.query()
        .where({ id: search[key] })
        .preload("category")
        .preload("storage")
        .preload("measure")
        .orderBy("id", "asc")
        .paginate(search.page, 8);
    if (key === "bar_code" || key === "name" || key === "description")
      return await Item.query()
        .whereRaw(`LOWER(${key}) like  LOWER('${search[key]}')`)
        .preload("category")
        .preload("storage")
        .preload("measure")
        .orderBy("id", "asc")
        .paginate(search.page, 8);
    if (key === "category") {
      const categories = await new CategoryServices().read({
        name: search[key],
      });
      return await Item.query()
        .whereIn(
          "category_id",
          categories.map((c) => c.id)
        )
        .preload("category")
        .preload("measure")
        .orderBy("id", "asc")
        .paginate(search.page, 8);
    }
    if (search.page)
      return await Item.query()
        .preload("category")
        .preload("measure")
        .orderBy("id", "asc")
        .paginate(search.page, 8);
    return await Item.query()
      .where(search)
      .preload("category")
      .preload("measure")
      .orderBy("name", "asc");
  }

  public async update(newItem) {
    console.log("update", newItem);
    const item = await Item.findOrFail(newItem.id);

    await item.merge(newItem);

    newItem.gain && (await updateStorage(item.id, item.gain));

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
