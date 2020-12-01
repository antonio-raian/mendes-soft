import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Storage: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Estoques", path: "/estoques/lista" },
      { id: 2, label: "Relatórios", path: "/estoques/relatorios" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Storage;
