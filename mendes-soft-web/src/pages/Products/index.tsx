import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Products: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Produtos", path: "/products/list" },
      { id: 2, label: "Categorias", path: "/categories/list" },
      { id: 3, label: "Relatórios", path: "/products/report" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Products;
