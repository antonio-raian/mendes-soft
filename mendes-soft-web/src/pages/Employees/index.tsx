import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Employees: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Funcionários", path: "/funcionarios/lista" },
      { id: 2, label: "Relatórios", path: "/funcionarios/relatorios" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Employees;
