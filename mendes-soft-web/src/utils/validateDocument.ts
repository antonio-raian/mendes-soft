const validateDocument = (doc: string) => {
  let som_digit1 = 0;
  let som_digit2 = 0;
  let controle1 = 10;
  let controle2 = 11;

  for (var letter of doc) {
    if (letter !== "." && letter !== "-") {
      if (controle1 >= 2) som_digit1 += Number(letter) * controle1;
      som_digit2 += Number(letter) * controle2;
      controle1--;
      controle2--;
    }
    if (controle2 < 2) break;
  }
  return (
    (som_digit1 * 10) % 11 === Number(doc[12]) &&
    (som_digit2 * 10) % 11 === Number(doc[13])
  );
};

export default validateDocument;
