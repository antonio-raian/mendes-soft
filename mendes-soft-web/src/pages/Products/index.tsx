import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Products: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Produtos", path: "/produtos/lista" },
      { id: 2, label: "Categorias", path: "/categorias/lista" },
      { id: 3, label: "Unidades de Medida", path: "/unidades_medida/lista" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Products;
