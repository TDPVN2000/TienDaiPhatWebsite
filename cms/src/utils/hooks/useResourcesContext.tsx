import { ReactNode, createContext, useContext, useReducer } from "react";

const ResourcesContext = createContext(null);
const ResourcesDispatchContext = createContext<any>(null);

interface IProps {
  children: ReactNode;
}
function resourcesReducer(resources: any, action: any) {
  switch (action.type) {
    case "update": {
      return action.data;
    }
  }
}

export const ResourcesProvider = ({ children }: IProps) => {
  const [resources, dispatch] = useReducer(resourcesReducer, {});

  return (
    <ResourcesContext.Provider value={resources}>
      <ResourcesDispatchContext.Provider value={dispatch}>
        {children}
      </ResourcesDispatchContext.Provider>
    </ResourcesContext.Provider>
  );
};

export const useResourcesContext = (): any => {
  return useContext(ResourcesContext);
};

export const useDispatchResources = () => {
  return useContext(ResourcesDispatchContext);
};
