import React, { SetStateAction } from "react";

const changeSearchBy = (
  module: string,
  set: React.Dispatch<SetStateAction<string>>,
  handle: any[]
) => {
  set(module);
  handle.forEach((h) => {
    if (h.id === module) {
      document.getElementById(h.id)?.classList.add("selected");
    } else {
      document.getElementById(h.id)?.classList.remove("selected");
    }
  });
};

export default changeSearchBy;
