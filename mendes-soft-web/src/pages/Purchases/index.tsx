import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Purchases: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Compras", path: "/compras/lista" },
      { id: 2, label: "Relatórios", path: "/compras/relatorios" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Purchases;
