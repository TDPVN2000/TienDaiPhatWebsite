import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { QueryKey } from 'constants/enum';

export default function useToggleSideNav() {
  const queryClient = useQueryClient();
  const { data: collapsed } = useQuery<boolean>(
    [QueryKey.SHOW_SIDE_NAV],
    () => false,
    {
      enabled: false,
    }
  );
  const toggleSideNav = useCallback(() => {
    queryClient.setQueryData([QueryKey.SHOW_SIDE_NAV], (data: any) => !data);
  }, [queryClient]);
  return { collapsed: Boolean(collapsed), toggleSideNav };
}
