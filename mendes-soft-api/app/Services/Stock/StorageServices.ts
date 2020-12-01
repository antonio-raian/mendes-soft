import Item from "App/Models/Product/Item";
import Storage from "App/Models/Stock/Storage";

export default class StorageServices {
  public async create(newStorage: object, itemId: number) {
    const item = await Item.findOrFail(itemId);
    const storage = new Storage();
    storage.merge(newStorage);
    await storage.related("item").associate(item);
    return storage;
  }

  public async read(search: object) {
    return await Storage.query()
      .where(search)
      .preload("item", (q) => {
        q.preload("category");
      });
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
