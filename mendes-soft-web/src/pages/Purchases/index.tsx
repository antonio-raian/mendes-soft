import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Purchases: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Compras", path: "/purchases/list" },
      { id: 2, label: "Relatórios", path: "/purchases/report" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Purchases;
