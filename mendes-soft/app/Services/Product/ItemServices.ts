import Category from "App/Models/Product/Category";
import Item from "App/Models/Product/Item";

export default class ItemServices {
  public async create(newItem: object, categoryId: number) {
    const category = await Category.findOrFail(categoryId);
    const item = new Item();
    await item.merge(newItem);

    await item.related("category").associate(category);
    return item;
  }

  public async read(search: object) {
    return await Item.query().where(search).preload("category");
  }

  public async update(newItem) {
    const item = await Item.findOrFail(newItem.id);

    await item.merge(newItem);

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
