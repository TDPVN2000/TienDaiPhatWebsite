import { ReactNode, createContext, useContext, useReducer } from "react";

interface PermissionContextInterface {
  permissions: any[];
  role: any;
}

const PermissionsContext = createContext<PermissionContextInterface | null>(
  null
);
const PermissionsDispatchContext = createContext<any>(null);

interface IProps {
  children: ReactNode;
}
function permissionReducer(permissions: any, action: any) {
  switch (action.type) {
    case "update": {
      return action.data;
    }
  }
}

export const PermissionsProvider = ({ children }: IProps) => {
  const [permissions, dispatch] = useReducer(permissionReducer, []);

  return (
    <PermissionsContext.Provider value={permissions}>
      <PermissionsDispatchContext.Provider value={dispatch}>
        {children}
      </PermissionsDispatchContext.Provider>
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): any => {
  return useContext(PermissionsContext);
};

export const useRole = (): any => {
  return useContext(PermissionsContext)?.role;
};

export const useDispatchPermission = () => {
  return useContext(PermissionsDispatchContext);
};
