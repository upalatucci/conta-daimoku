import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const useDaimoku = (): [number, (newDaimoku: number) => Promise<void>] => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["daimoku"],
    queryFn: async (): Promise<number> => {
      const response = await fetch("/api/daimoku");
      const jsonBody = await response.json();
      return jsonBody.daimoku;
    },
  });

  const setDaimoku = useCallback(
    (newDaimoku: number) => {
      return fetch("/api/daimoku", {
        method: "POST",
        body: JSON.stringify({ daimoku: newDaimoku }),
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["daimoku"],
          refetchType: "all",
        });
      });
    },
    [queryClient]
  );

  return [data ?? 0, setDaimoku];
};

export default useDaimoku;
