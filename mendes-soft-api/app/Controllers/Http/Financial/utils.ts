import StorageServices from "App/Services/Stock/StorageServices";

export const toStorage = async (
  itemId,
  quantity: number,
  gain?: number,
  unit_value?
) => {
  const storage = await new StorageServices().read({
    item_id: itemId,
  });
  if (storage.length > 0) {
    await new StorageServices().update({
      ...storage[0].toJSON(),
      quantity: storage[0].quantity + quantity,
      value_sale:
        gain && unit_value
          ? unit_value + unit_value * (gain / 100)
          : storage[0].value_sale,
    });
  } else {
    await new StorageServices().create(
      {
        quantity,
        value_sale: gain && unit_value + unit_value * (gain / 100),
      },
      itemId
    );
  }
};

export const fromStorage = async (itemId, quantity: number) => {
  const storage = await new StorageServices().read({ item_id: itemId });

  if (storage.length <= 0 || storage[0].quantity == 0)
    throw { status: 400, code: "NO_STOCK" };

  if (storage[0].quantity < quantity)
    throw { status: 400, code: "NO_ENOUGTH_STOCK" };

  await new StorageServices().update({
    ...storage[0].toJSON(),
    quantity: storage[0].quantity - quantity,
  });
};
