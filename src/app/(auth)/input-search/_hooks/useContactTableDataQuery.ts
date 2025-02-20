import { QueryClient, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { fetchContacts } from "../_actions/getContactData";

const QUERY_KEY = ["contact-table-page-data"];
const useContactTableDataQuery = async () => {
  const queryClient = new QueryClient();
  const reset = useCallback(
    () => ({ queryKey: QUERY_KEY, exact: true }),
    [queryClient]
  );
  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchContacts,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 500,
    retryOnMount: false,
  });
  return { ...query, reset };
};

export default useContactTableDataQuery;
