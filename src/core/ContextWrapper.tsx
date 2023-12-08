"use client";

import { AlertProvider } from "@/context/alertContext";
import { ApiProvider } from "@/context/apiContext";
import { RequestProvider } from "@/context/requestContext";
import { UserProvider } from "@/context/userContext";
import React, { ReactElement } from "react";

const ContextWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <AlertProvider>
      <UserProvider>
        <RequestProvider>
          <ApiProvider>{children}</ApiProvider>
        </RequestProvider>
      </UserProvider>
    </AlertProvider>
  );
};

export default ContextWrapper;
