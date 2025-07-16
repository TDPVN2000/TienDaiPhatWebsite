import { useQuery } from "@tanstack/react-query";
import { getResources } from "api/resources";
import { useDispatchResources } from "./useResourcesContext";

export default function useResources() {
  const dispatchResources = useDispatchResources();
  const {
    data: resources,
    //refetch: refetchResources,
    // isLoading: loadingResources,
    // isFetching: fetchingResources,
  } = useQuery(["resources"], getResources, {
    keepPreviousData: true,
    onSuccess: (res: any) => {
      dispatchResources({ type: "update", data: res });
    },
  });
  return { resources };
}
