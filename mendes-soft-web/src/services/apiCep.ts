import axios from "axios";

export interface CEP {
  logradouro: string;
  complemento: string;
  localidade: string; // cidade
  ddd: string;
  bairro: string;
  uf: string;
  cep: string;
}

export async function findCEP(cep: string | number): Promise<CEP | undefined> {
  if (cep) {
    return axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res: any) => {
        const info = res.data;
        if (!info.error) {
          return info;
        }
        return null;
      })
      .catch((err) => {
        throw err;
      });
  }
  return undefined;
}
