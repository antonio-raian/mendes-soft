import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/auth";
import { Category } from "@/interfaces";
import DashboardLayout from "@/layouts/DashLayout";
import api from "@/services/api";
import React, { ReactText, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useHistory } from "react-router-dom";
import { Container } from "./styles";

const DashBoard = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [dataCategory, setDataCategory] = useState<ReactText[][]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProds, setTotalProds] = useState(0);

  useEffect(() => {
    async function handleLoad() {
      await api
        .get<Category[]>("/category")
        .then((response) => {
          let totalItens = 0;
          const aux: ReactText[][] = [["Category", "Itens"]];
          response.data.forEach((cat) => {
            totalItens += cat.items.length;
            aux.push([cat.name, cat.items.length]);
          });
          setDataCategory(aux);
          setTotalProds(totalItens);
          setLoading(false);
          console.log(aux);
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response?.status === 401) {
            signOut();
            history.goBack();
          }
        });
    }
    handleLoad();
  }, [history, signOut]);

  return (
    <DashboardLayout>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <Chart
            chartType="PieChart"
            width={"500px"}
            height={"500px"}
            data={dataCategory}
            options={{
              legend: "none",
              pieSliceText: "label",
              title: `Quantidade de Produtos por Categoria\nTotal de Produtos: ${totalProds}`,
            }}
          />
        )}
      </Container>
    </DashboardLayout>
  );
};

export default DashBoard;
