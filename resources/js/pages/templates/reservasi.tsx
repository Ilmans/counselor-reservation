import React from "react";

const COUNSELOR = {
  name: "Arini Setyawati, M.Psi",
  title: "Psikolog Klinis",
  initials: "AS",
  rating: 4.9,
  reviews: 127,
  tags: ["Kecemasan", "Depresi", "CBT", "Trauma & PTSD"],
  price: 250000,
};

// Dummy: hari yang konselor punya jadwal (0=Min,1=Sen,...,4=Kam,5=Jum,6=Sab)
const AVAILABLE_DAYS = [1, 2, 4, 5, 6]; // Sen, Sel, Kam, Jum, Sab

const SLOTS = {
  0: [], 1: ["09:00", "11:00", "14:00"], 2: ["10:00", "13:00"],
  3: [], 4: ["09:00", "15:00", "16:00"], 5: ["10:00", "11:00"], 6: ["09:00"],
};

// Dummy slot status
const SLOT_STATUS = {
  "09:00": "tersedia", "11:00": "penuh", "14:00": "terbatas",
  "10:00": "tersedia", "13:00": "tersedia", "15:00": "tersedia",
  "16:00": "terbatas",
};

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTH_NAMES = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function ReservationPage() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedSlot, setSelectedSlot] = React.useState(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const todayDate = today.getDate();

  const daySlots = selectedDate
    ? (SLOTS[new Date(year, month, selectedDate).getDay()] || [])
    : [];

  const formatDate = (d) => {
    if (!d) return null;
    const dt = new Date(year, month, d);
    return `${DAY_NAMES[dt.getDay()]}, ${d} ${MONTH_NAMES[month]} ${year}`;
  };

  const statusColor = {
    tersedia: "text-emerald-500 dark:text-emerald-400",
    terbatas: "text-amber-500 dark:text-amber-400",
    penuh: "text-red-400 dark:text-red-500",
  };
  const statusDot = {
    tersedia: "bg-emerald-400",
    terbatas: "bg-amber-400",
    penuh: "bg-red-400",
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-[#0d0d0f] dark:text-zinc-200">
      <div className="mx-auto max-w-4xl px-4 py-8">

        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-[11px] text-zinc-400">
          <a href="#" className="hover:text-zinc-600">Beranda</a>
          <span>/</span>
          <a href="#" className="hover:text-zinc-600">Konselor</a>
          <span>/</span>
          <span className="text-zinc-600 dark:text-zinc-400">Reservasi</span>
        </nav>

        {/* Steps */}
        <div className="mb-8 flex items-center gap-0">
          {["Jadwal", "Data Diri", "Konfirmasi"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-1.5">
                <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                  i === 0 ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "border border-zinc-300 text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"
                }`}>{i + 1}</div>
                <span className={`text-[12px] ${i === 0 ? "font-medium text-zinc-800 dark:text-zinc-200" : "text-zinc-400 dark:text-zinc-600"}`}>{s}</span>
              </div>
              {i < 2 && <div className="mx-3 h-px w-8 bg-zinc-200 dark:bg-zinc-800" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
              {/* Konselor */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[13px] font-semibold text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400">
                  {COUNSELOR.initials}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-zinc-900 dark:text-zinc-100">{COUNSELOR.name}</p>
                  <p className="text-[11px] text-zinc-500">{COUNSELOR.title}</p>
                  <div className="mt-0.5 flex items-center gap-1">
                    <span className="text-[10px] text-amber-400">★★★★★</span>
                    <span className="text-[11px] text-zinc-400">{COUNSELOR.rating} · {COUNSELOR.reviews} ulasan</span>
                  </div>
                </div>
              </div>

              <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />

              <div className="flex flex-wrap gap-1.5">
                {COUNSELOR.tags.map(t => (
                  <span key={t} className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">{t}</span>
                ))}
              </div>

              {/* Ringkasan — tampil jika sudah pilih */}
              {selectedDate && selectedSlot && (
                <>
                  <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />
                  <p className="mb-2.5 text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">Ringkasan</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Tanggal", value: formatDate(selectedDate) },
                      { label: "Waktu", value: `${selectedSlot} – ${String(Number(selectedSlot.split(":")[0]) + 1).padStart(2,"0")}:00 WIB` },
                      { label: "Durasi", value: "60 menit" },
                      { label: "Total", value: `Rp ${COUNSELOR.price.toLocaleString("id-ID")}` },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between">
                        <span className="text-[11px] text-zinc-500">{r.label}</span>
                        <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Legend */}
            <div className="mt-3 flex items-center gap-4 px-1">
              {[["tersedia","Tersedia"],["terbatas","Terbatas"],["penuh","Penuh"]].map(([k,l]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${statusDot[k]}`} />
                  <span className="text-[11px] text-zinc-500">{l}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main */}
          <main className="flex flex-col gap-5 lg:col-span-2">

            {/* Mode Sesi */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
              <p className="mb-3 text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">Mode Sesi</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "online", label: "Online", sub: "Video call", icon: "🎥", active: true },
                  { id: "offline", label: "Tatap Muka", sub: "Di klinik", icon: "🏥", active: false },
                ].map(m => (
                  <label key={m.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                    m.active
                      ? "border-zinc-900 bg-zinc-50 dark:border-zinc-400 dark:bg-zinc-900/50"
                      : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#111113]"
                  }`}>
                    <input type="radio" name="mode" className="hidden" defaultChecked={m.active} />
                    <span className="text-base">{m.icon}</span>
                    <div>
                      <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{m.label}</p>
                      <p className="text-[11px] text-zinc-400">{m.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Kalender */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">Pilih Tanggal</p>
                  <p className="mt-0.5 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{MONTH_NAMES[month]} {year}</p>
                </div>
                <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800">Hanya bulan ini</p>
              </div>

              {/* Grid header */}
              <div className="mb-1 grid grid-cols-7 text-center">
                {DAY_NAMES.map(d => (
                  <div key={d} className="py-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-600">{d}</div>
                ))}
              </div>

              {/* Grid days */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dt = new Date(year, month, day);
                  const dow = dt.getDay();
                  const isPast = day < todayDate;
                  const isAvailable = AVAILABLE_DAYS.includes(dow) && !isPast;
                  const isSelected = selectedDate === day;

                  return (
                    <button
                      key={day}
                      disabled={!isAvailable}
                      onClick={() => { setSelectedDate(day); setSelectedSlot(null); }}
                      className={`relative flex h-9 w-full items-center justify-center rounded-lg text-[12px] font-medium transition-colors ${
                        !isAvailable
                          ? "cursor-not-allowed text-zinc-300 dark:text-zinc-700"
                          : isSelected
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {day}
                      {isAvailable && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot Jam */}
            {selectedDate && (
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
                <p className="mb-1 text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">Pilih Jam</p>
                <p className="mb-4 text-[12px] text-zinc-500">{formatDate(selectedDate)}</p>

                {daySlots.length === 0 ? (
                  <p className="text-[12px] text-zinc-400">Tidak ada slot tersedia di tanggal ini.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {daySlots.map(slot => {
                      const st = SLOT_STATUS[slot] || "tersedia";
                      const isFull = st === "penuh";
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          disabled={isFull}
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex flex-col items-center gap-1 rounded-xl border py-3 transition-colors ${
                            isFull
                              ? "cursor-not-allowed border-zinc-100 bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-900/20"
                              : isSelected
                              ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100"
                              : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#111113]"
                          }`}
                        >
                          <span className={`text-[13px] font-semibold ${
                            isFull ? "text-zinc-300 dark:text-zinc-700"
                            : isSelected ? "text-white dark:text-zinc-900"
                            : "text-zinc-700 dark:text-zinc-300"
                          }`}>{slot}</span>
                          <div className="flex items-center gap-1">
                            <span className={`h-1.5 w-1.5 rounded-full ${isFull ? "bg-zinc-300 dark:bg-zinc-700" : isSelected ? "bg-white dark:bg-zinc-900" : statusDot[st]}`} />
                            <span className={`text-[10px] ${
                              isFull ? "text-zinc-300 dark:text-zinc-700"
                              : isSelected ? "text-zinc-400 dark:text-zinc-600"
                              : statusColor[st]
                            }`}>{st}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between">
              <button className="rounded-lg border border-zinc-200 px-5 py-2.5 text-[13px] font-medium text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500">
                ← Kembali
              </button>
              <button
                disabled={!selectedDate || !selectedSlot}
                className={`rounded-lg px-7 py-2.5 text-[13px] font-medium transition-colors ${
                  selectedDate && selectedSlot
                    ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                    : "cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
                }`}
              >
                Lanjut ke Data Diri →
              </button>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
