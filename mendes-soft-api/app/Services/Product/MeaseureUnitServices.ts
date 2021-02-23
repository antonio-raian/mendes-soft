import MeasureUnit from "App/Models/Product/MeasureUnit";

export default class MeasureUnitServices {
  public async create(newMeasure: object) {
    return await MeasureUnit.create(newMeasure);
  }

  public async read(search: object) {
    const key = Object.keys(search)[0];
    if (key === "name") {
      console.log(search);
      return await MeasureUnit.query().whereRaw(
        `LOWER(${key}) LIKE LOWER('${search[key]}')`
      );
    }
    return await MeasureUnit.query().where(search).orderBy("id", "asc");
  }

  public async update(newMeasure) {
    const measure = await MeasureUnit.findOrFail(newMeasure.id);

    await measure.merge(newMeasure);

    return await measure.save();
  }

  public async delete(id: number) {
    const measure = await MeasureUnit.findOrFail(id);

    try {
      return await measure.delete();
    } catch (e) {
      if (!measure.active)
        throw { status: 400, message: "MeasureUnit inactive!" };

      measure.active = false;
      return await measure.save();
    }
  }
}
