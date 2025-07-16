import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootWrapper from "./wrappers/RootWrapper";
import { PermissionsProvider } from "./utils/hooks/usePermissions";
import { AuthProvider } from "utils/hooks/useAuth";
import { ResourcesProvider } from "utils/hooks/useResourcesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PermissionsProvider>
        <AuthProvider>
          <ResourcesProvider>
            <React.Suspense fallback={null}>
              <RootWrapper />
            </React.Suspense>
          </ResourcesProvider>
        </AuthProvider>
      </PermissionsProvider>
    </QueryClientProvider>
  );
}

export default App;
