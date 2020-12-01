import StorageServices from "App/Services/Stock/StorageServices";

export const toStorage = async (
  itemId,
  quantity: number,
  gain?: number,
  unit_value?
) => {
  console.log("toStore", itemId, quantity, gain, unit_value);
  const storage = await new StorageServices().read({
    item_id: itemId,
  });

  let valueGain = 0;
  if (gain) {
    if (unit_value) {
      valueGain = unit_value + unit_value * (gain / 100); //Valor com a porcentagem de ganho
    } else {
      valueGain = storage[0].value_cost + storage[0].value_cost * (gain / 100); //Valor com a porcentagem de ganho
    }
  }
  console.log("valor", valueGain, storage);

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
