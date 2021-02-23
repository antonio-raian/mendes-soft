const handleError = (error: any) => {
  console.log(error);
  const data = error.response.data;
  switch (data.code) {
    case "NO_ENOUGTH_STOCK":
      return `${data.message} não possui estoque suficiente!`;

    case "DUPLICATE":
      return `Já existe esse item cadastrado, se precisar, tente editá-lo na tela de detalhes!`;

    default:
      return "";
  }
};

export default handleError;
