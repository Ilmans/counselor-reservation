
## Konsep Utama Sistem

Platform **reservasi sesi konseling** dengan fitur:
- Booking konsultasi ke konselor
- Queue management model antrian (seperti antrian pasien)
- Opsi anonim untuk user
- Feedback pasca sesi

---

## Struktur Konselor

Konselor memiliki:
- **1 spesialisasi** (one-to-many, misal: Psikolog Klinis)
- **Banyak kategori** (many-to-many via `counselor_categories`, digunakan untuk filtering)
- **Pricing**: bisa `free` atau `paid` (per jam, field `price_per_hour`)
- **Durasi sesi**: `session_duration_minutes` — durasi tetap per konselor, bervariasi antar konselor

---

## Jadwal Konselor (`counselor_schedules`)

- Menyimpan **hari dan jam buka–tutup** secara tetap (recurring mingguan)
- `day_of_week` menggunakan **integer 1–7** (1 = Senin, 7 = Minggu) bukan string
- Fungsi: ditampilkan di profil konselor + digunakan sebagai **validasi** saat booking
- Tidak berelasi langsung ke tabel konsultasi — hanya sebagai acuan logika

**Kapasitas per hari dihitung di logika kode:**
```
kapasitas = (close_time - open_time) / session_duration_minutes
```
Jika antrian sudah penuh kapasitas → booking ditolak otomatis.

---

## Alur Booking & Queue

1. User pilih konselor + tanggal
2. Sistem validasi: apakah hari itu ada di jadwal konselor?
   - Tidak ada → tolak, notifikasi "konselor tidak tersedia"
3. Sistem hitung kapasitas vs jumlah antrian aktif di tanggal itu
   - Penuh → tolak, notifikasi "jadwal penuh"
4. Lolos → buat data `consultations` baru dengan `queue_position` dan `estimated_time`

**Estimasi waktu dihitung otomatis:**
```
estimated_time = open_time + (queue_position - 1) × session_duration_minutes
```

---

## Tabel `consultations`

Menggantikan nama `sessions` untuk menghindari konflik dengan session login (Laravel/Django).

### Enum `method`:
| Value | Keterangan |
|-------|-----------|
| `online` | Sesi via meeting link |
| `offline` | Tatap muka langsung |

### Enum `status`:
| Value | Keterangan |
|-------|-----------|
| `pending` | Baru booking, menunggu konfirmasi konselor |
| `confirmed` | Konselor konfirmasi |
| `in_queue` | Sudah dikonfirmasi, menunggu giliran di hari H |
| `in_progress` | Sedang berlangsung, konselor panggil nomor antrian |
| `completed` | Sesi selesai |
| `cancelled` | Dibatalkan oleh user atau konselor |
| `rejected` | Ditolak konselor |

---

## Tabel Final (9 tabel)

| Tabel | Fungsi |
|-------|--------|
| `users` | Data klien, support mode anonim |
| `admins` | Admin sistem, terpisah dari users |
| `specializations` | Master spesialisasi konselor |
| `categories` | Master kategori untuk filtering |
| `counselors` | Data konselor lengkap |
| `counselor_categories` | Pivot many-to-many konselor & kategori |
| `counselor_schedules` | Jadwal tetap mingguan konselor |
| `consultations` | Data booking + queue |
| `consultation_notes` | Catatan konselor pasca sesi (bisa private) |
| `consultation_feedbacks` | Rating & komentar dari user pasca sesi |

---

## Keputusan Desain Penting

- **Tidak ada `SESSION_SLOT`** — slot tidak di-generate di muka, kapasitas dihitung real-time dari jadwal + durasi
- **Queue = antrian per tanggal**, bukan waitlist per slot waktu — lebih mirip antrian rumah sakit
- **Sesi aktif** menggunakan external meeting link (Google Meet/Zoom) — tidak perlu fitur chat internal, karena fokus tugas adalah **reservasi**
- **Anonim**: field `is_anonymous` ada di `users`, `consultations`, dan `consultation_feedbacks` untuk konsistensi privasi di setiap lapisan
