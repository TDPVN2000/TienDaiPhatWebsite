import Cookies from "js-cookie";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ELocalStorageKey } from "constants/enums";
import { useDispatchPermission } from "./usePermissions";
import { EXPIRES } from "utils/const/const";

interface ILogin {
  token: string;
  refreshToken: string;
  expiresIn: Date;
  user?: {
    id: number;
    role: number;
    first_name?: string;
    last_name?: string;
  };
}
interface AuthContextInterface {
  token: string | undefined;
  refreshToken: string | undefined;
  login: (data: ILogin) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

interface IAuthProvider {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const token = Cookies.get("token");
  const refreshToken = Cookies.get("refreshToken");
  const navigate = useNavigate();
  const dispatchPermission = useDispatchPermission();

  const login = async (payload: ILogin) => {
    Cookies.set("token", payload.token, {
      expires: EXPIRES,
    });
    Cookies.set("refreshToken", payload?.refreshToken, {
      expires: EXPIRES,
    });
    if (payload?.user?.first_name || payload?.user?.last_name) {
      localStorage.setItem(
        ELocalStorageKey.USERNAME,
        `${payload?.user?.first_name} ${payload?.user?.last_name}`
      );
    }
    if (payload?.user?.role) {
      localStorage.setItem(
        ELocalStorageKey.ROLE_TYPE,
        `${payload?.user?.role}`
      );
    }

    dispatchPermission({
      type: "update",
      data: { role: payload?.user?.role },
    });
    navigate("/");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    dispatchPermission({
      type: "update",
      data: { permissions: {}, role: {} },
    });

    navigate("/login", { replace: true });
  };

  const value: AuthContextInterface = useMemo(
    () => ({
      token,
      refreshToken,
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
