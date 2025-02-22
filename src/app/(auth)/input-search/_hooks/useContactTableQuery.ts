import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { getContactData } from "../_actions/getContactData";

const QUERY_KEY = ["contact-table-page-data"];

const useContactTableQuery = () => {
  const queryClient =  useQueryClient();

  const reset = useCallback(
    () => queryClient.resetQueries({ queryKey: QUERY_KEY, exact: true }),
    [queryClient]
  );
  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getContactData,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 500,
    retryOnMount: false,
  });
  return { ...query, reset };
};

export default useContactTableQuery;
