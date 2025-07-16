import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
  children: JSX.Element;
}

export default function ScrollToTop({ children }: IProps) {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname + location.search]);

  return <>{children}</>;
}
