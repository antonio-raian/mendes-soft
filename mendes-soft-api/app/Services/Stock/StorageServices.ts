import Item from "App/Models/Product/Item";
import Storage from "App/Models/Stock/Storage";
import ItemServices from "../Product/ItemServices";

export default class StorageServices {
  public async create(newStorage: object, itemId: number) {
    const item = await Item.findOrFail(itemId);
    const storage = new Storage();
    storage.merge(newStorage);
    await storage.related("item").associate(item);
    return storage;
  }

  public async read(search) {
    const key = Object.keys(search)[0];
    if (key === "bar_code" || key === "name") {
      const itens = (await new ItemServices().read(search)).rows;

      return await Storage.query()
        .whereIn(
          "item_id",
          itens.map((i) => i.id)
        )
        .preload("item", (q) => q.preload("category"))
        .orderBy("id", "asc")
        .paginate(search.page, 8);
    }
    if (search.page)
      return await Storage.query()
        .preload("item", (q) => {
          q.preload("category");
        })
        .orderBy("id", "asc")
        .paginate(search.page, 8);
    return await Storage.query()
      .where(search)
      .preload("item", (q) => {
        q.preload("category");
      })
      .orderBy("id", "asc");
  }

  public async update(newStorage) {
    const storage = await Storage.findOrFail(newStorage.id);

    await storage.merge(newStorage);

    return await storage.save();
  }

  public async delete(id: number) {
    const storage = await Storage.findOrFail(id);

    try {
      return await storage.delete();
    } catch (e) {
      if (!storage.active) throw { status: 400, message: "Storage inactive!" };

      storage.active = false;
      return await storage.save();
    }
  }
}
