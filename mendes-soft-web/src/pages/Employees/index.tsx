import MenuOptions from "@/components/MenuOptions";
import DashboardLayout from "@/layouts/DashLayout";
import React, { useMemo } from "react";

const Employees: React.FC = () => {
  const buttons = useMemo(() => {
    return [
      { id: 1, label: "Funcionários", path: "/employees/list" },
      { id: 2, label: "Relatórios", path: "/employees/report" },
    ];
  }, []);

  return (
    <DashboardLayout>
      <MenuOptions buttons={buttons} />
    </DashboardLayout>
  );
};

export default Employees;
