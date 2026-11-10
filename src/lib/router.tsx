import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from "react";

const readPath = () => {
  const h = window.location.hash.replace(/^#/, "");
  return h.startsWith("/") ? h : "/" + h;
};

export function navigate(path: string) {
  if (readPath() === path) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = path;
}

export function useRoute() {
  const [path, setPath] = useState(readPath);
  useEffect(() => {
    const on = () => {
      setPath(readPath());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const parts = path.split("?")[0].split("/").filter(Boolean);
  return { path, parts };
}

export function Link({
  to,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return (
    <a
      href={"#" + to}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (readPath() === to) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      {...rest}
    />
  );
}
