import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { COLLECTIONS, type Collection } from "../data";

type Toast = { id: number; text: string };
export type Activity = { id: number; action: string; target: string; at: string };

type Store = {
  collections: Collection[];
  saveCollection: (c: Collection) => void;
  deleteCollection: (id: string) => void;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  admin: string | null;
  login: (email: string) => void;
  logout: () => void;
  toasts: Toast[];
  notify: (text: string) => void;
  activity: Activity[];
};

const Ctx = createContext<Store | null>(null);

function usePersisted<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {
      /* storage unavailable */
    }
  }, [key, v]);
  return [v, setV] as const;
}

const seedActivity: Activity[] = [
  { id: 1, action: "Updated", target: "Kain Lurik", at: "2025-05-14 10:24" },
  { id: 2, action: "Uploaded 3D model", target: "Keris Yogyakarta", at: "2025-05-12 16:02" },
  { id: 3, action: "Added", target: "Wayang Kulit", at: "2025-05-10 09:41" },
  { id: 4, action: "Published documentary", target: "Hand-drawn Batik", at: "2025-05-06 14:15" },
  { id: 5, action: "Edited audio guide", target: "Keris Yogyakarta (ID)", at: "2025-05-03 11:30" },
];

const stamp = () => new Date().toISOString().slice(0, 16).replace("T", " ");

export function StoreProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = usePersisted<Collection[]>(
    "h360.collections.v1",
    COLLECTIONS,
  );
  const [favorites, setFavorites] = usePersisted<string[]>("h360.favorites", [
    "keris-yogyakarta",
    "batik-parang",
  ]);
  const [admin, setAdmin] = usePersisted<string | null>("h360.admin", null);
  const [activity, setActivity] = usePersisted<Activity[]>("h360.activity", seedActivity);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const log = useCallback(
    (action: string, target: string) =>
      setActivity((a) => [{ id: Date.now(), action, target, at: stamp() }, ...a].slice(0, 12)),
    [setActivity],
  );

  const value = useMemo<Store>(
    () => ({
      collections,
      saveCollection: (c) => {
        const exists = collections.some((x) => x.id === c.id);
        setCollections((list) =>
          exists ? list.map((x) => (x.id === c.id ? c : x)) : [...list, c],
        );
        log(exists ? "Updated" : "Added", c.name);
      },
      deleteCollection: (id) => {
        const c = collections.find((x) => x.id === id);
        setCollections((list) => list.filter((x) => x.id !== id));
        setFavorites((f) => f.filter((x) => x !== id));
        if (c) log("Deleted", c.name);
      },
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite: (id) => {
        const name = collections.find((c) => c.id === id)?.name ?? "Collection";
        if (favorites.includes(id)) {
          setFavorites((f) => f.filter((x) => x !== id));
          notify(`${name} removed from favorites`);
        } else {
          setFavorites((f) => [...f, id]);
          notify(`${name} saved to favorites`);
        }
      },
      removeFavorite: (id) => setFavorites((f) => f.filter((x) => x !== id)),
      admin,
      login: (email) => setAdmin(email),
      logout: () => setAdmin(null),
      toasts,
      notify,
      activity,
    }),
    [
      collections,
      favorites,
      admin,
      toasts,
      activity,
      notify,
      log,
      setCollections,
      setFavorites,
      setAdmin,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
