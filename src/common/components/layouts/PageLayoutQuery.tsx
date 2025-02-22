"use client"
import React, { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
interface PageLayoutQueryProps {
  children: ReactNode;
}

const PageLayoutQuery: React.FC<PageLayoutQueryProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default PageLayoutQuery;
