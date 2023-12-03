"use client";

import { AlertProvider } from "@/context/alertContext";
import React, { ReactElement } from "react";

const ContextWrapper = ({ children }: { children: ReactElement }) => {
  return <AlertProvider>{children}</AlertProvider>;
};

export default ContextWrapper;
