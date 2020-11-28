import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Sales: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Vendas", path: "/vendas/lista" },
      { id: 2, label: "Relatórios", path: "/vendas/relatorios" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Sales;
