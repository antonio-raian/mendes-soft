import StorageServices from "App/Services/Stock/StorageServices";

export const toStorage = async (
  itemId,
  quantity: number,
  unit_value?: number,
  gain?: number
) => {
  console.log("toStore", itemId, quantity, gain, unit_value);
  const storage = await new StorageServices().read({
    item_id: itemId,
  });

  let valueGain =
    gain && unit_value ? unit_value + unit_value * (gain / 100) : 0;

  if (storage.length > 0) {
    await new StorageServices().update({
      ...storage[0].toJSON(),
      quantity: storage[0].quantity + quantity,
      value_sale: gain ? valueGain + valueGain * 0.12 : storage[0].value_sale,
      value_cost: unit_value || storage[0].value_cost,
    });
  } else {
    await new StorageServices().create(
      {
        quantity,
        value_sale: gain && valueGain + valueGain * 0.12,
        value_cost: unit_value,
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

export const updateStorage = async (itemId, gain: number) => {
  const storage = await new StorageServices().read({ item_id: itemId });

  if (storage.length > 0) {
    let valueGain =
      storage[0].value_cost + storage[0].value_cost * (gain / 100);
    await new StorageServices().update({
      ...storage[0].toJSON(),
      value_sale: valueGain + valueGain * 0.12,
    });
  }
};
