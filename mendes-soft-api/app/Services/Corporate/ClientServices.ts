import Person from "App/Models/Corporate/Person";
import Client from "App/Models/Corporate/Client";

export default class ClientServices {
  public async create(newClient: Client, personId: number) {
    const people = await Person.findOrFail(personId);
    const client = new Client();
    client.merge(newClient);
    client.limit = Number(newClient.limit);
    await client.related("person").associate(people);
    return client;
  }

  public async read(search: object) {
    return await Client.query()
      .where(search)
      .preload("person", (q) => {
        q.preload("addresses").preload("contacts");
      });
  }

  public async update(newClient) {
    const client = await Client.findOrFail(newClient.id);

    await client.merge(newClient);

    return await client.save();
  }

  public async delete(id: number) {
    const client = await Client.findOrFail(id);

    try {
      return await client.delete();
    } catch (e) {
      if (!client.active) throw { status: 400, message: "Client inactive!" };

      client.active = false;
      return await client.save();
    }
  }
}
