import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Sales: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Vendas", path: "/sales/list" },
      { id: 2, label: "Relatórios", path: "/sales/report" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Sales;
