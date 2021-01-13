import Category from "App/Models/Product/Category";

export default class CategoryServices {
  public async create(newCategory: object) {
    return await Category.create(newCategory);
  }

  public async read(search: object) {
    const key = Object.keys(search)[0];
    if (key === "name") {
      console.log(search);
      return await Category.query()
        .whereRaw(`LOWER(${key}) LIKE LOWER('${search[key]}')`)
        .preload("items");
    }
    return await Category.query()
      .where(search)
      .preload("items")
      .orderBy("id", "asc");
  }

  public async update(newCategory) {
    const category = await Category.findOrFail(newCategory.id);

    await category.merge(newCategory);

    return await category.save();
  }

  public async delete(id: number) {
    const category = await Category.findOrFail(id);

    try {
      return await category.delete();
    } catch (e) {
      if (!category.active)
        throw { status: 400, message: "Category inactive!" };

      category.active = false;
      return await category.save();
    }
  }
}
