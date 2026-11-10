import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import { navigate, Link } from "../../lib/router";
import { useStore } from "../../lib/store";
import { Logo } from "../../components/Layout";
import { Art } from "../../components/Art";
import { Button, Input } from "../../components/ui";

export default function AdminLogin() {
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!email) errs.email = "Email wajib diisi.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Format email tidak valid.";
    if (!password) errs.password = "Kata sandi wajib diisi.";
    else if (password.length < 6) errs.password = "Kata sandi minimal 6 karakter.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase() === "admin@heritage360.id" && password === "heritage360") {
        login(email);
        navigate("/admin");
      } else {
        setErrors({
          form: "Email atau kata sandi tidak cocok. Silakan gunakan akun demo di bawah.",
        });
      }
    }, 600);
  };

  return (
    <div className="grid min-h-[100svh] bg-ink lg:grid-cols-[1fr_560px]">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 opacity-40">
          <Art art="parang" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/80 to-ink" />
        <div className="relative flex h-full flex-col justify-between p-14">
          <Logo />
          <div className="max-w-md">
            <p className="eyebrow mb-5">Manajemen Arsip Museum</p>
            <h1 className="display text-6xl text-ivory">Penjaga Warisan Digital Yogyakarta</h1>
            <p className="mt-6 text-[15px] leading-relaxed text-stone">
              Kelola koleksi artefak, model 3D, film dokumenter, panduan audio, dan publikasi jurnal
              kebudayaan Heritage360.
            </p>
          </div>
          <p className="text-[12px] text-stone">Area Khusus Kurator & Administrator Terdaftar</p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-14 sm:px-14">
        <div className="mb-14 flex items-center justify-between lg:hidden">
          <Logo />
        </div>
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-stone uppercase hover:text-gold"
        >
          <ArrowLeft size={14} /> Kembali ke Beranda Museum
        </Link>
        <div className="flex flex-col gap-3">
          <p className="eyebrow flex items-center gap-2">
            <ShieldCheck size={14} /> Autentikasi Pengelola
          </p>
          <h2 className="display text-4xl text-ivory sm:text-5xl">Masuk Panel Admin</h2>
          <p className="text-[14px] text-stone">
            Silakan masuk untuk mengakses dasbor pengelolaan konten museum virtual.
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
          {errors.form && (
            <div className="border border-danger/40 bg-danger/10 px-4 py-3 text-[13px] text-danger">
              {errors.form}
            </div>
          )}

          <Input
            label="Alamat Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@heritage360.id"
            error={errors.email}
            autoComplete="username"
          />

          <div className="relative">
            <Input
              label="Kata Sandi"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.password}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              className="absolute top-9 right-3 p-2 text-stone hover:text-gold cursor-pointer"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Button type="submit" size="lg" disabled={loading} className="mt-3">
            <Lock size={15} /> {loading ? "Memverifikasi..." : "Masuk ke Dasbor"}
          </Button>

          {/* Demo account hint */}
          <div className="mt-6 border border-gold/20 bg-charcoal p-4 text-[12px] text-stone">
            <p className="font-semibold text-gold mb-1">Kredensial Demo Pengujian Frontend:</p>
            <p>
              Email: <code className="text-ivory font-mono">admin@heritage360.id</code>
            </p>
            <p>
              Kata Sandi: <code className="text-ivory font-mono">heritage360</code>
            </p>
            <p className="mt-2 text-[11px] text-stone/80 italic">
              *Pada tahap frontend ini, data sesi tersimpan di penyimpanan lokal browser
              (localStorage).
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
