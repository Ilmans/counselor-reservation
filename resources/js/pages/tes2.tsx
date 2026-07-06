import { useState, useEffect } from "react";
import {
  Home,
  ClipboardList,
  CalendarDays,
  Users,
  Star,
  Wallet,
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
  Video,
  MapPin,
  ChevronRight,
  Check,
  XCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  UserCog,
  FileWarning,
  BarChart3,
  ChevronDown,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────
   1) DESIGN TOKENS
   Satu sumber warna untuk semua komponen, dark & light.
──────────────────────────────────────────────────────────────────────── */
const lightVars = {
  "--background": "#F4FAF9",
  "--foreground": "#1E3635",
  "--card": "#FBFEFE",
  "--card-foreground": "#1E3635",
  "--primary": "#1F6F66",
  "--primary-foreground": "#F2FBFA",
  "--secondary": "#CDEAE4",
  "--secondary-foreground": "#1B4F49",
  "--muted": "#E7F2F0",
  "--muted-foreground": "#5E7D79",
  "--border": "#D1E6E2",
};

const darkVars = {
  "--background": "#0F2120",
  "--foreground": "#DEEEEB",
  "--card": "#142826",
  "--card-foreground": "#DEEEEB",
  "--primary": "#5FC2B4",
  "--primary-foreground": "#112221",
  "--secondary": "#234A45",
  "--secondary-foreground": "#CDE9E4",
  "--muted": "#1B3330",
  "--muted-foreground": "#91B6B0",
  "--border": "#213F3B",
};

const STATUS_META = {
  pending_confirmation: { label: "Menunggu", bg: "#FEF3C7", fg: "#92400E" },
  confirmed: { label: "Terkonfirmasi", bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
  in_queue: { label: "Dalam Antrean", bg: "var(--muted)", fg: "var(--muted-foreground)" },
  in_progress: { label: "Berlangsung", bg: "var(--primary)", fg: "var(--primary-foreground)" },
  completed: { label: "Selesai", bg: "var(--muted)", fg: "var(--muted-foreground)" },
  cancelled: { label: "Dibatalkan", bg: "#FEE2E2", fg: "#991B1B" },
  rejected: { label: "Ditolak", bg: "#FEE2E2", fg: "#991B1B" },
  active: { label: "Aktif", bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
  suspended: { label: "Ditangguhkan", bg: "#FEE2E2", fg: "#991B1B" },
  review: { label: "Perlu Ditinjau", bg: "#FEF3C7", fg: "#92400E" },
};

/* ────────────────────────────────────────────────────────────────────────
   2) KONFIGURASI PER-ROLE
   Setiap role (konselor / admin) cukup mendefinisikan navigasi, identitas,
   dan datanya sendiri — komponen layout (Sidebar, Header, dst) tetap sama.
──────────────────────────────────────────────────────────────────────── */
const ROLE_CONFIG = {
  konselor: {
    label: "Konselor",
    brand: "Tenang Aja",
    user: { name: "Billie Eilish, M.Psi.", role: "Psikolog Klinis · Tersedia", initials: "BE" },
    nav: [
      { key: "beranda", label: "Beranda", icon: Home },
      { key: "konsultasi", label: "Konsultasi", icon: ClipboardList, badge: 3 },
      { key: "jadwal", label: "Jadwal Praktik", icon: CalendarDays },
      { key: "klien", label: "Klien", icon: Users },
      { key: "ulasan", label: "Ulasan", icon: Star },
      { key: "keuangan", label: "Keuangan", icon: Wallet },
      { key: "profil", label: "Profil & Layanan", icon: Settings },
    ],
    alerts: [
      { icon: Clock, text: "2 klien menunggu konfirmasi hari ini. Sesi lainnya berjalan sesuai jadwal.", when: "Baru saja" },
      { icon: Star, text: "Ulasan baru dari Ratna — 5 bintang", when: "2 jam lalu" },
    ],
    searchPlaceholder: "Cari klien, sesi, atau catatan...",
  },
  admin: {
    label: "Admin",
    brand: "Tenang Aja",
    user: { name: "Rani Kusuma", role: "Admin Platform · Online", initials: "RK" },
    nav: [
      { key: "beranda", label: "Beranda", icon: Home },
      { key: "konselor", label: "Manajemen Konselor", icon: UserCog, badge: 5 },
      { key: "pengguna", label: "Pengguna", icon: Users },
      { key: "verifikasi", label: "Verifikasi", icon: ShieldCheck, badge: 2 },
      { key: "laporan", label: "Laporan Masuk", icon: FileWarning },
      { key: "keuangan", label: "Keuangan", icon: Wallet },
      { key: "pengaturan", label: "Pengaturan", icon: Settings },
    ],
    alerts: [
      { icon: UserCog, text: "5 konselor baru menunggu verifikasi dokumen.", when: "10 menit lalu" },
      { icon: FileWarning, text: "1 laporan pengguna baru perlu ditinjau.", when: "1 jam lalu" },
    ],
    searchPlaceholder: "Cari konselor, pengguna, atau laporan...",
  },
};

/* Data contoh khusus konselor */
const QUEUE = [
  { id: 1, time: "09:00", client: "Siti Rahayu", anon: false, category: "Kecemasan", method: "online", status: "confirmed" },
  { id: 2, time: "10:30", client: null, anon: true, category: "Trauma & PTSD", method: "offline", status: "pending_confirmation" },
  { id: 3, time: "13:00", client: "Andi Wijaya", anon: false, category: "Kesehatan Mental Umum", method: "online", status: "in_progress" },
  { id: 4, time: "15:30", client: null, anon: true, category: "Kecemasan", method: "online", status: "pending_confirmation" },
  { id: 5, time: "16:30", client: "Dewi Anggraini", anon: false, category: "Trauma & PTSD", method: "offline", status: "completed" },
];

const SCHEDULE = [
  { day: "Senin", time: "09.00 – 12.00", method: "Online & tatap muka" },
  { day: "Rabu", time: "13.00 – 17.00", method: "Online" },
  { day: "Jumat", time: "10.00 – 13.00", method: "Tatap muka" },
];

const REVIEWS = [
  { name: "Ratna", anon: false, rating: 5, comment: "Sesi sangat membantu, konselor mendengarkan tanpa menghakimi.", when: "2 hari lalu" },
  { name: null, anon: true, rating: 4, comment: "Penjelasannya jelas, hanya jadwalnya agak mepet.", when: "5 hari lalu" },
];

/* Data contoh khusus admin */
const VERIFICATIONS = [
  { id: 1, name: "Dr. Farah Amalia", role: "Psikolog Klinis", submitted: "2 jam lalu", status: "review" },
  { id: 2, name: "Reza Pratama, M.Psi.", role: "Konselor Pernikahan", submitted: "5 jam lalu", status: "review" },
  { id: 3, name: "Nadia Putri", role: "Psikolog Anak", submitted: "Kemarin", status: "confirmed" },
  { id: 4, name: "Budi Santoso", role: "Konselor Karier", submitted: "2 hari lalu", status: "active" },
];

const USER_GROWTH = [80, 95, 70, 120, 140, 110, 160];
const CHART_DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const REPORTS = [
  { id: 1, subject: "Sesi tidak sesuai jadwal", from: "Pengguna anonim", when: "1 jam lalu", status: "review" },
  { id: 2, subject: "Konselor tidak merespons chat", from: "Dewi A.", when: "1 hari lalu", status: "review" },
];

/* ────────────────────────────────────────────────────────────────────────
   3) KOMPONEN KECIL (presentational, dipakai lintas role)
──────────────────────────────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.in_queue;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: meta.bg, color: meta.fg }}
    >
      {status === "in_progress" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="pulse-dot absolute inline-flex h-full w-full rounded-full" style={{ backgroundColor: "var(--primary-foreground)" }} />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--primary-foreground)" }} />
        </span>
      )}
      {meta.label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl p-4 md:p-5 flex flex-col gap-3" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
        <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}>
          <Icon size={14} strokeWidth={2.2} />
        </div>
      </div>
      <div>
        <span style={{ fontFamily: "'Fraunces', serif", color: "var(--foreground)" }} className="text-2xl md:text-3xl">
          {value}
        </span>
      </div>
      {hint && (
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--muted-foreground)" }}>
      {children}
    </p>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   4) SIDEBAR (reusable — nav item datang dari config role)
──────────────────────────────────────────────────────────────────────── */
function Sidebar({ role, config, activeKey, onNavigate, isDesktop, visible, onClose, onRoleSwitch }) {
  return (
    <aside
      className={`${isDesktop ? "sticky" : "fixed"} top-0 h-screen z-40 w-64 shrink-0 flex flex-col transition-transform duration-300`}
      style={{
        backgroundColor: "var(--card)",
        borderRight: "1px solid var(--border)",
        transform: visible ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
            <span style={{ fontFamily: "'Fraunces', serif" }} className="text-sm">T</span>
          </div>
          <span style={{ fontFamily: "'Fraunces', serif" }} className="text-base truncate">{config.brand}</span>
        </div>
        {!isDesktop && (
          <button className="shrink-0" onClick={onClose} style={{ color: "var(--muted-foreground)" }} aria-label="Tutup menu">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="px-4 mb-1">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1"
          style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}
        >
          <Sparkles size={11} /> Panel {config.label}
        </span>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto">
        {config.nav.map((item) => {
          const isActive = item.key === activeKey;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? "var(--secondary)" : "transparent",
                color: isActive ? "var(--secondary-foreground)" : "var(--muted-foreground)",
              }}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={16} strokeWidth={2} />
                {item.label}
              </span>
              {item.badge && (
                <span className="text-[10px] font-semibold rounded-full px-1.5 py-0.5" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        {/* Role switcher — demo dua role berbagi layout yang sama */}
        <button
          onClick={onRoleSwitch}
          className="mb-2 w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-medium"
          style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
        >
          <span>Lihat sebagai {role === "konselor" ? "Admin" : "Konselor"}</span>
          <ChevronDown size={13} />
        </button>

        <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5">
          <div className="relative shrink-0">
            <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
              {config.user.initials}
            </div>
            <span className="pulse-dot absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2" style={{ backgroundColor: "var(--primary)", borderColor: "var(--card)" }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{config.user.name}</p>
            <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{config.user.role}</p>
          </div>
        </div>
        <button className="mt-1 w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   5) NOTIFIKASI (dropdown, isinya datang dari config.alerts per role)
──────────────────────────────────────────────────────────────────────── */
function NotificationBell({ alerts, open, onToggle }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="relative h-9 w-9 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }}
        aria-label="Notifikasi"
      >
        <Bell size={16} />
        {alerts.length > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: "var(--primary)", boxShadow: "0 0 0 2px var(--muted)" }} />
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-3 w-80 max-w-[85vw] rounded-2xl overflow-hidden z-40"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 12px 32px rgba(0,0,0,0.14)" }}
        >
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-sm font-semibold">Notifikasi</p>
            <span className="text-[11px] font-semibold rounded-full px-2 py-0.5" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}>
              {alerts.length} baru
            </span>
          </div>
          <div>
            {alerts.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3 px-4 py-3.5" style={{ borderBottom: i < alerts.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}>
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm leading-snug">{a.text}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>{a.when}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   6) HEADER / TOPBAR (reusable — menerima judul, search placeholder, dst)
──────────────────────────────────────────────────────────────────────── */
function Header({ title, subtitle, searchPlaceholder, isDesktop, onMenuClick, dark, onToggleDark, alerts, notifOpen, onToggleNotif }) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-3 md:gap-4 px-4 md:px-7 py-3.5 md:py-4"
      style={{ backgroundColor: "var(--card)", borderBottom: "1px solid var(--border)" }}
    >
      {!isDesktop && (
        <button className="shrink-0" onClick={onMenuClick} style={{ color: "var(--foreground)" }} aria-label="Buka menu">
          <Menu size={20} />
        </button>
      )}

      {isDesktop && (
        <div className="min-w-0 shrink-0">
          <p style={{ fontFamily: "'Fraunces', serif" }} className="text-base leading-tight truncate">{title}</p>
          <p className="text-[11px] capitalize truncate" style={{ color: "var(--muted-foreground)" }}>{subtitle}</p>
        </div>
      )}

      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-sm rounded-full px-3.5 py-2 md:ml-4" style={{ backgroundColor: "var(--muted)" }}>
        <Search size={15} style={{ color: "var(--muted-foreground)" }} />
        <input
          placeholder={searchPlaceholder}
          className="bg-transparent outline-none text-sm w-full placeholder:opacity-70"
          style={{ color: "var(--foreground)" }}
        />
      </div>

      <div className="ml-auto flex items-center gap-2 shrink-0">
        <button
          onClick={onToggleDark}
          className="h-9 w-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--muted)", color: "var(--foreground)" }}
          aria-label="Ganti tema"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <NotificationBell alerts={alerts} open={notifOpen} onToggle={onToggleNotif} />
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   7) KONTEN — KONSELOR
──────────────────────────────────────────────────────────────────────── */
function KonselorContent({ greeting }) {
  const EARNINGS_7D = [120, 90, 150, 80, 200, 175, 150];
  const maxEarn = Math.max(...EARNINGS_7D);
  const totalEarn = EARNINGS_7D.reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1 flex items-center gap-1.5" style={{ color: "var(--primary)" }}>
            <Sparkles size={12} /> Ruang Konselor
          </p>
          <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl md:text-3xl">
            {greeting}, Billie
          </h1>
        </div>
        <button className="rounded-full px-5 py-2.5 text-sm font-semibold shrink-0" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
          Tinjau konfirmasi
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={ClipboardList} label="Sesi Hari Ini" value="4" hint="2 online · 2 tatap muka" />
        <StatCard icon={Clock} label="Menunggu Konfirmasi" value="3" hint="Perlu tindakan Anda" />
        <StatCard icon={CheckCircle2} label="Sesi Selesai Bulan Ini" value="42" hint="dari 50 sesi terjadwal" />
        <StatCard icon={Star} label="Rating Rata-rata" value="4.9" hint="dari 96 ulasan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 rounded-2xl p-4 md:p-5" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="min-w-0">
              <Eyebrow>Aktivitas Hari Ini</Eyebrow>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-lg">Antrean Konsultasi</h2>
            </div>
            <button className="flex items-center gap-1 text-sm font-medium shrink-0" style={{ color: "var(--primary)" }}>
              <span className="hidden sm:inline">Lihat semua</span> <ChevronRight size={15} />
            </button>
          </div>

          <div className="space-y-2.5">
            {QUEUE.map((q) => (
              <div key={q.id} className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 rounded-xl px-3.5 py-3" style={{ backgroundColor: "var(--muted)" }}>
                <div className="flex items-center justify-between sm:justify-start sm:w-24 shrink-0 gap-2">
                  <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    <Clock size={13} style={{ color: "var(--muted-foreground)" }} />
                    {q.time}
                  </span>
                  <span className="sm:hidden">
                    <StatusBadge status={q.status} />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{q.anon ? "Klien Anonim" : q.client}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{q.category}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium shrink-0" style={{ color: "var(--muted-foreground)" }}>
                  {q.method === "online" ? <Video size={13} /> : <MapPin size={13} />}
                  {q.method === "online" ? "Online" : "Tatap muka"}
                </div>

                <span className="hidden sm:inline-flex shrink-0">
                  <StatusBadge status={q.status} />
                </span>

                {q.status === "pending_confirmation" && (
                  <div className="flex items-center gap-1.5 shrink-0 justify-end sm:justify-start">
                    <button className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }} aria-label="Konfirmasi">
                      <Check size={13} />
                    </button>
                    <button className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }} aria-label="Tolak">
                      <XCircle size={13} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-4 md:p-5" style={{ backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
          <Eyebrow>Minggu Ini</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", color: "var(--secondary-foreground)" }} className="text-lg mb-3">Jadwal Praktik</h2>
          <div className="space-y-2">
            {SCHEDULE.map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-lg p-2.5" style={{ backgroundColor: "var(--card)" }}>
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                  {s.day.slice(0, 3)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{s.time}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{s.method}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full text-sm font-semibold rounded-xl py-2.5" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
            Atur jadwal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 rounded-2xl p-4 md:p-5" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <Eyebrow>Performa</Eyebrow>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 mb-4">
            <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-lg">Pendapatan 7 Hari Terakhir</h2>
            <p style={{ fontFamily: "'Fraunces', serif" }} className="text-xl md:text-2xl">Rp{totalEarn.toLocaleString("id-ID")}rb</p>
          </div>
          <div className="flex items-end justify-between gap-2 md:gap-3 h-24 md:h-28">
            {EARNINGS_7D.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${(v / maxEarn) * 100}%`,
                    backgroundColor: i === EARNINGS_7D.length - 1 ? "var(--primary)" : "var(--secondary)",
                    minHeight: "8px",
                  }}
                />
                <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>{["Sen","Sel","Rab","Kam","Jum","Sab","Min"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-4 md:p-5" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="min-w-0">
              <Eyebrow>Umpan Balik</Eyebrow>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-lg">Ulasan Terbaru</h2>
            </div>
            <span className="text-xs font-semibold rounded-full px-2.5 py-1 flex items-center gap-1 shrink-0" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}>
              <Star size={11} fill="currentColor" /> 4.9
            </span>
          </div>
          <div className="space-y-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="pb-4" style={{ borderBottom: i < REVIEWS.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <p className="text-sm font-medium truncate">{r.anon ? "Klien Anonim" : r.name}</p>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={12} fill={s < r.rating ? "var(--primary)" : "none"} style={{ color: "var(--primary)" }} />
                    ))}
                  </div>
                </div>
                <p className="text-xs mb-1.5 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{r.comment}</p>
                <p className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>{r.when}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   8) KONTEN — ADMIN
   Layout & komponen dasar sama (StatCard, StatusBadge, Eyebrow), datanya beda.
──────────────────────────────────────────────────────────────────────── */
function AdminContent({ greeting }) {
  const maxGrowth = Math.max(...USER_GROWTH);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1 flex items-center gap-1.5" style={{ color: "var(--primary)" }}>
            <ShieldCheck size={12} /> Panel Admin
          </p>
          <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl md:text-3xl">
            {greeting}, Rani
          </h1>
        </div>
        <button className="rounded-full px-5 py-2.5 text-sm font-semibold shrink-0" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
          Tinjau verifikasi
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={Users} label="Total Pengguna" value="12.4rb" hint="+320 minggu ini" />
        <StatCard icon={UserCog} label="Konselor Aktif" value="286" hint="5 menunggu verifikasi" />
        <StatCard icon={FileWarning} label="Laporan Terbuka" value="2" hint="Perlu ditinjau" />
        <StatCard icon={Wallet} label="Pendapatan Platform" value="Rp84jt" hint="Bulan ini" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 rounded-2xl p-4 md:p-5" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="min-w-0">
              <Eyebrow>Antrean Persetujuan</Eyebrow>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-lg">Verifikasi Konselor</h2>
            </div>
            <button className="flex items-center gap-1 text-sm font-medium shrink-0" style={{ color: "var(--primary)" }}>
              <span className="hidden sm:inline">Lihat semua</span> <ChevronRight size={15} />
            </button>
          </div>

          <div className="space-y-2.5">
            {VERIFICATIONS.map((v) => (
              <div key={v.id} className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 rounded-xl px-3.5 py-3" style={{ backgroundColor: "var(--muted)" }}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{v.name}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{v.role}</p>
                </div>
                <span className="text-xs shrink-0" style={{ color: "var(--muted-foreground)" }}>{v.submitted}</span>
                <span className="shrink-0">
                  <StatusBadge status={v.status} />
                </span>
                {v.status === "review" && (
                  <div className="flex items-center gap-1.5 shrink-0 justify-end sm:justify-start">
                    <button className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }} aria-label="Setujui">
                      <Check size={13} />
                    </button>
                    <button className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }} aria-label="Tolak">
                      <XCircle size={13} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-4 md:p-5" style={{ backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
          <Eyebrow>Perlu Perhatian</Eyebrow>
          <h2 style={{ fontFamily: "'Fraunces', serif", color: "var(--secondary-foreground)" }} className="text-lg mb-3">Laporan Masuk</h2>
          <div className="space-y-2">
            {REPORTS.map((r) => (
              <div key={r.id} className="flex items-start gap-2.5 rounded-lg p-2.5" style={{ backgroundColor: "var(--card)" }}>
                <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                  <FileWarning size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">{r.subject}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{r.from} · {r.when}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full text-sm font-semibold rounded-xl py-2.5" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
            Buka semua laporan
          </button>
        </div>
      </div>

      <div className="rounded-2xl p-4 md:p-5" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        <Eyebrow>Pertumbuhan</Eyebrow>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 mb-4">
          <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-lg flex items-center gap-2">
            <BarChart3 size={17} /> Pengguna Baru — 7 Hari Terakhir
          </h2>
          <p style={{ fontFamily: "'Fraunces', serif" }} className="text-xl md:text-2xl">{USER_GROWTH.reduce((a, b) => a + b, 0)} pengguna</p>
        </div>
        <div className="flex items-end justify-between gap-2 md:gap-3 h-24 md:h-28">
          {USER_GROWTH.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg transition-all"
                style={{
                  height: `${(v / maxGrowth) * 100}%`,
                  backgroundColor: i === USER_GROWTH.length - 1 ? "var(--primary)" : "var(--secondary)",
                  minHeight: "8px",
                }}
              />
              <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>{CHART_DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   9) SHELL — menyatukan Sidebar + Header + konten sesuai role
   Ini "layout" bersama yang dipakai admin maupun konselor.
──────────────────────────────────────────────────────────────────────── */
export default function DashboardShell() {
  const [role, setRole] = useState("konselor");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("beranda");
  const [isDesktop, setIsDesktop] = useState(() => (typeof window !== "undefined" ? window.innerWidth >= 1024 : true));

  const vars = dark ? darkVars : lightVars;
  const config = ROLE_CONFIG[role];

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarVisible = isDesktop || sidebarOpen;

  const hour = new Date().getHours();
  const greeting = hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 18 ? "Selamat sore" : "Selamat malam";
  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div
      style={{ ...vars, backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="min-h-screen w-full flex"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(31,111,102,0.55); }
          70% { box-shadow: 0 0 0 6px rgba(31,111,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(31,111,102,0); }
        }
        .pulse-dot { animation: pulse-ring 2.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .pulse-dot { animation: none; }
        }
      `}</style>

      {!isDesktop && sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30" onClick={() => setSidebarOpen(false)} />}
      {notifOpen && <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />}

      <Sidebar
        role={role}
        config={config}
        activeKey={activeKey}
        onNavigate={(key) => {
          setActiveKey(key);
          if (!isDesktop) setSidebarOpen(false);
        }}
        isDesktop={isDesktop}
        visible={sidebarVisible}
        onClose={() => setSidebarOpen(false)}
        onRoleSwitch={() => {
          const next = role === "konselor" ? "admin" : "konselor";
          setRole(next);
          setActiveKey("beranda");
        }}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Header
          title="Dashboard"
          subtitle={today}
          searchPlaceholder={config.searchPlaceholder}
          isDesktop={isDesktop}
          onMenuClick={() => setSidebarOpen(true)}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
          alerts={config.alerts}
          notifOpen={notifOpen}
          onToggleNotif={() => setNotifOpen((v) => !v)}
        />

        <main className="flex-1 px-4 md:px-7 py-5 md:py-7 space-y-6 md:space-y-7 max-w-6xl w-full mx-auto">
          {role === "konselor" ? <KonselorContent greeting={greeting} /> : <AdminContent greeting={greeting} />}
        </main>
      </div>
    </div>
  );
}
