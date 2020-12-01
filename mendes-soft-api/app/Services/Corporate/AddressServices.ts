import Address from "App/Models/Corporate/Address";

export default class AddressServices {
  public async create(newAddress: object, personId: number) {
    const address = await Address.create(newAddress);

    await address.related("person").sync([personId]);
    return address;
  }

  public async read(search: object) {
    return await Address.query().where(search).orderBy("createAt", "asc");
  }

  public async update(newAddress) {
    const address = await Address.findOrFail(newAddress.id);

    await address.merge(newAddress);

    return await address.save();
  }

  public async delete(id: number) {
    const address = await Address.findOrFail(id);

    try {
      return await address.delete();
    } catch (e) {
      if (!address.active) throw { status: 400, message: "Address inactive!" };

      address.active = false;
      return await address.save();
    }
  }
}
