import User from "App/Models/User";
import Employe from "App/Models/Corporate/Employe";

export default class UserServices {
  public async create(newUser: object, employeeId: number) {
    const employee = await Employe.findOrFail(employeeId);
    const user = await User.create(newUser);
    await user.related("employee").associate(employee);
    return user;
  }

  public async read(search: object) {
    return await User.query()
      .where(search)
      .preload("employee", (q) => {
        q.preload("person", (q) => {
          q.preload("addresses").preload("contacts");
        });
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
