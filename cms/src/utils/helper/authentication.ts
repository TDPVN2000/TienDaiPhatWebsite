import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { postLogin, deleteLogout } from "api/auth";
import storage from "./storage";
import { useAuth } from "utils/hooks/useAuth";

export const useLogin = () => {
  const authContext = useAuth();
  const { mutate: login, isLoading: loadingLogin } = useMutation(
    (payload: any) => postLogin(payload),
    {
      onSuccess: (data: any) => {
        authContext?.login(data?.data);
      },
    }
  );

  return { login, loadingLogin };
};

export const useLogout = () => {
  const navigate = useNavigate();

  const { mutate: logout, isLoading: loadingLogout } = useMutation(
    () => deleteLogout(),
    {
      onSuccess: () => {
        storage.clearToken();
        storage.clearRefreshToken();
        navigate("/login", { replace: true });
      },
    }
  );

  return { logout, loadingLogout };
};
