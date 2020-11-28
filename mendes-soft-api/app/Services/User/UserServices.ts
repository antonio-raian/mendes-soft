import User from "App/Models/User";
import Person from "App/Models/Corporate/Person";

export default class UserServices {
  public async create(newUser: object, personId: number) {
    const people = await Person.findOrFail(personId);
    const user = await User.create(newUser);
    await user.related("person").associate(people);
    return user;
  }

  public async read(search: object) {
    return await User.query()
      .where(search)
      .preload("person", (q) => {
        q.preload("addresses").preload("contacts");
      });
  }

  public async update(newUser) {
    const user = await User.findOrFail(newUser.id);

    await user.merge(newUser);

    return await user.save();
  }

  public async delete(id: number) {
    const user = await User.findOrFail(id);

    try {
      return await user.delete();
    } catch (e) {
      if (!user.active) throw { status: 400, message: "User inactive!" };

      user.active = false;
      return await user.save();
    }
  }
}
