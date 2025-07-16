import { useQuery } from "@tanstack/react-query";

import { getProfile } from "api/auth";
import { useDispatchPermission } from "./usePermissions";

export default function useProfile(enabled = false) {
  const dispatch = useDispatchPermission();
  const {
    data: profile,
    refetch: refetchProfile,
    isLoading: loadingProfile,
    isFetching: fetchingProfile,
  } = useQuery(["profile"], getProfile, {
    enabled,
    keepPreviousData: true,
    onSuccess({ data }) {
      dispatch({ type: "update", data: data.roleIds });
    },
  });
  return { profile, refetchProfile, loadingProfile, fetchingProfile };
}
