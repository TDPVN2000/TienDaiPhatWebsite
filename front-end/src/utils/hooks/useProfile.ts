import { useQuery } from '@tanstack/react-query';

import { getProfile } from 'api/auth';
import { QueryKey } from 'constants/enum';

export default function useProfile(enabled = false) {
  const {
    data: profile,
    refetch: refetchProfile,
    isLoading: loadingProfile,
    isFetching: fetchingProfile,
  } = useQuery([QueryKey.PROFILE], getProfile, {
    enabled,
    keepPreviousData: true,
  });
  return { profile, refetchProfile, loadingProfile, fetchingProfile };
}
