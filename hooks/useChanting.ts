import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const useChanting = (): [number, (duration: number) => Promise<void>] => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["chanting"],
    queryFn: async (): Promise<number> => {
      const response = await fetch("/api/chanting");
      const jsonBody = await response.json();
      return jsonBody.count;
    },
    refetchInterval: 10000,
  });

  const startChanting = useCallback(
    (duration: number) => {
      return fetch("/api/chanting", {
        method: "POST",
        body: JSON.stringify({ duration }),
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["chanting"],
          refetchType: "all",
        });
      });
    },
    [queryClient]
  );

  return [data ?? 0, startChanting];
};

export default useChanting;
