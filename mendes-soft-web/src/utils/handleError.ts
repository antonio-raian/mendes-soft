const handleError = (error: any) => {
  console.log(error);
  const data = error.response.data;
  switch (data.code) {
    case "NO_ENOUGTH_STOCK":
      return `${data.message} não possui estoque suficiente!`;
    default:
      return "";
  }
};

export default handleError;
