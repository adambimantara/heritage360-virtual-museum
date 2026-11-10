import {
  useEffect,
  useId,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Archive,
} from "lucide-react";
import { Link } from "../lib/router";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type Variant = "primary" | "outline" | "ghost" | "dark" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[2px] font-sans font-semibold tracking-[0.14em] uppercase transition-all duration-300 ease-[var(--ease-museum)] disabled:opacity-40 disabled:pointer-events-none select-none whitespace-nowrap cursor-pointer";
const variants: Record<Variant, string> = {
  primary: "bg-gold text-charcoal hover:bg-gold-soft active:bg-[#a4874f]",
  outline: "border border-ivory/35 text-ivory hover:border-gold hover:text-gold active:bg-gold/10",
  ghost: "text-ivory/80 hover:text-gold px-0!",
  dark: "bg-charcoal text-ivory hover:bg-umber active:bg-ink",
  danger: "bg-danger text-ivory hover:brightness-110",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[10px]",
  md: "h-11 px-6 text-[11px]",
  lg: "h-13 px-8 text-[11px]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return cx(base, variants[variant], sizes[size], extra);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...p} />;
}

export function LinkButton({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

export function IconButton({
  label,
  active,
  className,
  children,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; active?: boolean }) {
  return (
    <button
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cx(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:pointer-events-none",
        active
          ? "border-gold bg-gold text-charcoal"
          : "border-ivory/15 text-ivory/80 hover:border-gold/70 hover:text-gold",
        className,
      )}
      {...p}
    >
      {children}
    </button>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("eyebrow flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-gold/70" />
      {children}
    </p>
  );
}

export function Badge({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "muted" | "success" | "danger";
}) {
  const t = {
    gold: "border-gold/40 text-gold",
    muted: "border-ivory/15 text-stone",
    success: "border-success/50 text-success",
    danger: "border-danger/50 text-danger",
  }[tone];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase",
        t,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        align === "center" && "mx-auto text-center items-center",
        "flex max-w-2xl flex-col gap-5",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
      )}
      <h2 className="display text-4xl text-ivory sm:text-5xl lg:text-6xl">{title}</h2>
      {children && <p className="max-w-xl text-[15px] leading-relaxed text-stone">{children}</p>}
    </div>
  );
}

/* ---------- Form controls ---------- */

const fieldBase =
  "w-full rounded-[2px] border bg-ink/40 px-4 text-[14px] text-ivory placeholder:text-stone/60 transition-colors duration-200 outline-none focus:border-gold disabled:opacity-40 disabled:cursor-not-allowed";

export function Field({
  label,
  error,
  hint,
  children,
  id,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-[0.16em] text-cream uppercase"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="flex items-center gap-1.5 text-[12px] text-danger">
          <AlertTriangle size={12} /> {error}
        </p>
      ) : hint ? (
        <p className="text-[12px] text-stone">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({
  label,
  error,
  hint,
  className,
  ...p
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  const id = useId();
  return (
    <Field label={label} error={error} hint={hint} id={id}>
      <input
        id={id}
        aria-invalid={!!error}
        className={cx(fieldBase, "h-12", error ? "border-danger" : "border-ivory/15", className)}
        {...p}
      />
    </Field>
  );
}

export function Textarea({
  label,
  error,
  className,
  ...p
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  const id = useId();
  return (
    <Field label={label} error={error} id={id}>
      <textarea
        id={id}
        aria-invalid={!!error}
        className={cx(
          fieldBase,
          "min-h-28 py-3 leading-relaxed",
          error ? "border-danger" : "border-ivory/15",
          className,
        )}
        {...p}
      />
    </Field>
  );
}

export function Select({
  label,
  options,
  className,
  error,
  ...p
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}) {
  const id = useId();
  const control = (
    <div className={cx("relative", className)}>
      <select
        id={id}
        aria-label={label}
        className={cx(
          fieldBase,
          "h-12 cursor-pointer appearance-none pr-10",
          error ? "border-danger" : "border-ivory/15",
        )}
        {...p}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-umber">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gold"
      />
    </div>
  );
  return label ? (
    <Field label={label} error={error} id={id}>
      {control}
    </Field>
  ) : (
    control
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Cari koleksi artefak...",
  className,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className={cx("group relative", className)}>
      <Search
        size={17}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-stone transition-colors group-focus-within:text-gold"
      />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cx(
          fieldBase,
          "h-12 border-ivory/15 pr-10 pl-11 [&::-webkit-search-cancel-button]:hidden",
        )}
      />
      {value && (
        <button
          aria-label="Hapus pencarian"
          title="Hapus pencarian"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-stone hover:text-gold cursor-pointer"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-stone uppercase">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-gold/60">/</span>}
            {it.to ? (
              <Link to={it.to} className="transition-colors hover:text-gold">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ivory">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  const w = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-4xl" }[size];
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-[fade-up_.3s_ease_both]"
        onClick={onClose}
      />
      <div
        className={cx(
          "relative flex max-h-[92vh] w-full flex-col border border-gold/20 bg-umber shadow-2xl animate-fade-up",
          w,
        )}
      >
        <div className="flex items-start justify-between gap-6 border-b border-gold/15 px-6 py-5 sm:px-8">
          <div>
            {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
            <h3 className="display text-3xl text-ivory">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 p-2 text-stone hover:text-gold cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 sm:px-8">{children}</div>
        {footer && (
          <div className="flex flex-wrap justify-end gap-3 border-t border-gold/15 px-6 py-4 sm:px-8">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Navigasi Halaman" className="flex items-center justify-center gap-2">
      <IconButton
        label="Halaman sebelumnya"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft size={16} />
      </IconButton>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={cx(
            "h-11 min-w-11 px-3 font-serif text-lg transition-colors cursor-pointer",
            p === page ? "text-gold border-b border-gold" : "text-stone hover:text-ivory",
          )}
        >
          {String(p).padStart(2, "0")}
        </button>
      ))}
      <IconButton
        label="Halaman selanjutnya"
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight size={16} />
      </IconButton>
    </nav>
  );
}

export function Spinner({ size = 28 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-label="Memuat data"
      style={{ width: size, height: size }}
      className="inline-block animate-spin rounded-full border border-gold/20 border-t-gold"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-6 w-2/3" />
    </div>
  );
}

export function EmptyState({
  title,
  children,
  action,
  icon,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-5 border border-dashed border-gold/25 px-6 py-20 text-center">
      <div className="kawung-accent flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 text-gold">
        {icon ?? <Archive size={26} strokeWidth={1.2} />}
      </div>
      <h3 className="display text-3xl text-ivory">{title}</h3>
      {children && <p className="max-w-sm text-[14px] leading-relaxed text-stone">{children}</p>}
      {action}
    </div>
  );
}

export function ErrorState({
  title = "Terjadi Kendala",
  children,
  action,
}: {
  title?: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-5 border border-danger/30 bg-danger/5 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-danger/40 text-danger">
        <AlertTriangle size={24} strokeWidth={1.3} />
      </div>
      <h3 className="display text-3xl text-ivory">{title}</h3>
      {children && <p className="max-w-sm text-[14px] leading-relaxed text-stone">{children}</p>}
      {action}
    </div>
  );
}
