import { useState, useEffect, useCallback, useMemo, createContext, useContext } from "react";

const RouterContext = createContext({
  path: "/",
  navigate: () => {},
});

function getCurrentRoute() {
  if (typeof window === "undefined") return "/";
  if (window.location.hash && window.location.hash.startsWith("#/")) {
    return window.location.hash.slice(1);
  }
  return window.location.pathname;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => getCurrentRoute());

  useEffect(() => {
    const handlePopState = () => {
      setPath(getCurrentRoute());
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  const navigate = useCallback((to, { scrollToTop = true } = {}) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", to);
      const cleanPath = to.split("#")[0] || "/";
      setPath(cleanPath);
      if (scrollToTop && !to.includes("#")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ to, children, className = "", onClick, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    // Don't intercept if modifier keys are pressed (e.g. Cmd/Ctrl for new tab)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
