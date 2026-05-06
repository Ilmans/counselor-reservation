<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConseulorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        // specialization
        DB::table('specializations')->insert([
            ['id' => 1, 'name' => 'Psikolog Klinis',        'description' => 'Menangani gangguan mental dan perilaku secara klinis.',],
            ['id' => 2, 'name' => 'Konselor Umum',    'description' => 'Membantu pasangan mengatasi konflik dan komunikasi.',],
            ['id' => 3, 'name' => 'Konselor Remaja',        'description' => 'Pendampingan psikologis khusus usia remaja.',],
            ['id' => 4, 'name' => 'Psikolog Pendidikan',    'description' => 'Fokus pada isu belajar, motivasi, dan pengembangan akademik.',],
            ['id' => 5, 'name' => 'Konselor Karier',        'description' => 'Membantu individu menemukan arah karier yang sesuai.',],
            ['id' => 6, 'name' => 'Psikolog Industri',      'description' => 'Menangani isu psikologis di lingkungan kerja dan organisasi.',],
        ]);
        // categories
        DB::table('categories')->insert([
            ['id' => 1,  'name' => 'Kecemasan',               'slug' => 'kecemasan',],
            ['id' => 2,  'name' => 'Depresi',                 'slug' => 'depresi',],
            ['id' => 3,  'name' => 'Hubungan',                'slug' => 'hubungan',],
            ['id' => 4,  'name' => 'Trauma & PTSD',           'slug' => 'trauma-ptsd',],
            ['id' => 5,  'name' => 'Stres Kerja',             'slug' => 'stres-kerja',],
            ['id' => 6,  'name' => 'Pengembangan Diri',       'slug' => 'pengembangan-diri',],
            ['id' => 7,  'name' => 'Masalah Keluarga',        'slug' => 'masalah-keluarga',],
            ['id' => 8,  'name' => 'Remaja & Tumbuh Kembang', 'slug' => 'remaja-tumbuh-kembang',],
            ['id' => 9,  'name' => 'Karier & Akademik',       'slug' => 'karier-akademik',],
            ['id' => 10, 'name' => 'Kesehatan Mental Umum',   'slug' => 'kesehatan-mental-umum',],
        ]);

        //conselor
        DB::table('counselors')->insert([
            ['id' => 1,  'specialization_id' => 1, 'name' => 'Delon Fahry Gunawan, M.Psi.',        'email' => 'delon.fahry@konselor.com',       'whatsapp' => '082100000001', 'bio' => 'Psikolog klinis berpengalaman dengan fokus pada gangguan kecemasan dan trauma.',              'photo_url' => 'https://ui-avatars.com/api/?name=Delon+Fahry+Gunawan',    'pricing_type' => 'paid', 'price_per_hour' => 150000, 'session_duration_minutes' => 60, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2,  'specialization_id' => 3, 'name' => 'Nurlaelatunnisa, S.Psi.',              'email' => 'nurlaelatunnisa@konselor.com',    'whatsapp' => '082100000002', 'bio' => 'Konselor remaja yang berdedikasi membantu generasi muda menavigasi tantangan hidup.',        'photo_url' => 'https://ui-avatars.com/api/?name=Nurlaelatunnisa',         'pricing_type' => 'free', 'price_per_hour' => 0,      'session_duration_minutes' => 45, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3,  'specialization_id' => 6, 'name' => 'Muhammad Pahrisal, M.Psi.',            'email' => 'muhammad.pahrisal@konselor.com',  'whatsapp' => '082100000003', 'bio' => 'Psikolog industri dengan pengalaman di berbagai perusahaan multinasional.',                  'photo_url' => 'https://ui-avatars.com/api/?name=Muhammad+Pahrisal',       'pricing_type' => 'paid', 'price_per_hour' => 200000, 'session_duration_minutes' => 60, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4,  'specialization_id' => 2, 'name' => 'Hendricus Gatot Ariwidayanto, M.Psi.', 'email' => 'hendricus.gatot@konselor.com',    'whatsapp' => '082100000004', 'bio' => 'Konselor pernikahan dan keluarga dengan pendekatan berbasis komunikasi empatik.',           'photo_url' => 'https://ui-avatars.com/api/?name=Hendricus+Gatot',         'pricing_type' => 'paid', 'price_per_hour' => 175000, 'session_duration_minutes' => 90, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5,  'specialization_id' => 4, 'name' => 'Enris, S.Pd.',                         'email' => 'enris@konselor.com',              'whatsapp' => '082100000005', 'bio' => 'Psikolog pendidikan yang membantu siswa dan mahasiswa meraih potensi akademik terbaik.',    'photo_url' => 'https://ui-avatars.com/api/?name=Enris',                   'pricing_type' => 'free', 'price_per_hour' => 0,      'session_duration_minutes' => 45, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6,  'specialization_id' => 1, 'name' => 'Ririn Kayla Putri, M.Psi.',            'email' => 'ririn.kayla@konselor.com',        'whatsapp' => '082100000006', 'bio' => 'Psikolog klinis dengan spesialisasi depresi dan kesehatan mental perempuan.',              'photo_url' => 'https://ui-avatars.com/api/?name=Ririn+Kayla+Putri',       'pricing_type' => 'paid', 'price_per_hour' => 160000, 'session_duration_minutes' => 60, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7,  'specialization_id' => 5, 'name' => 'Ali Alan Wari, S.Psi.',                'email' => 'ali.alan@konselor.com',           'whatsapp' => '082100000007', 'bio' => 'Konselor karier yang membantu individu menemukan passion dan jalur karier yang tepat.',     'photo_url' => 'https://ui-avatars.com/api/?name=Ali+Alan+Wari',           'pricing_type' => 'paid', 'price_per_hour' => 125000, 'session_duration_minutes' => 60, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8,  'specialization_id' => 1, 'name' => 'M Zulfikri Nurhasan, M.Psi.',          'email' => 'zulfikri.nurhasan@konselor.com',  'whatsapp' => '082100000008', 'bio' => 'Psikolog klinis dengan pendekatan CBT untuk penanganan trauma dan PTSD.',                  'photo_url' => 'https://ui-avatars.com/api/?name=M+Zulfikri+Nurhasan',     'pricing_type' => 'paid', 'price_per_hour' => 180000, 'session_duration_minutes' => 60, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9,  'specialization_id' => 3, 'name' => 'Meisita Khaniza, S.Psi.',              'email' => 'meisita.khaniza@konselor.com',    'whatsapp' => '082100000009', 'bio' => 'Konselor remaja yang berfokus pada isu identitas diri dan kesehatan mental generasi Z.',   'photo_url' => 'https://ui-avatars.com/api/?name=Meisita+Khaniza',         'pricing_type' => 'free', 'price_per_hour' => 0,      'session_duration_minutes' => 45, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'specialization_id' => 6, 'name' => 'Reihan Zulfan Nurjaman, M.Psi.',       'email' => 'reihan.zulfan@konselor.com',      'whatsapp' => '082100000010', 'bio' => 'Psikolog industri dengan keahlian manajemen stres dan pengembangan organisasi.',            'photo_url' => 'https://ui-avatars.com/api/?name=Reihan+Zulfan',           'pricing_type' => 'paid', 'price_per_hour' => 190000, 'session_duration_minutes' => 60, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'specialization_id' => 2, 'name' => 'Ilman Sunanuddin, S.Psi.',             'email' => 'ilman.sunanuddin@konselor.com',   'whatsapp' => '082100000011', 'bio' => 'Konselor pernikahan dengan pendekatan holistik dan berbasis nilai keluarga.',               'photo_url' => 'https://ui-avatars.com/api/?name=Ilman+Sunanuddin',        'pricing_type' => 'paid', 'price_per_hour' => 155000, 'session_duration_minutes' => 90, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'specialization_id' => 4, 'name' => 'Karnadi, S.Pd.',                       'email' => 'karnadi@konselor.com',            'whatsapp' => '082100000012', 'bio' => 'Psikolog pendidikan berpengalaman dalam bimbingan belajar dan pemilihan jurusan.',          'photo_url' => 'https://ui-avatars.com/api/?name=Karnadi',                 'pricing_type' => 'free', 'price_per_hour' => 0,      'session_duration_minutes' => 45, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
        ]);


        DB::table('counselor_categories')->insert([
            // Delon Fahry Gunawan — kecemasan, trauma, kesehatan mental umum
            ['counselor_id' => 1, 'category_id' => 1],
            ['counselor_id' => 1, 'category_id' => 4],
            ['counselor_id' => 1, 'category_id' => 10],

            // Nurlaelatunnisa — remaja, pengembangan diri, keluarga
            ['counselor_id' => 2, 'category_id' => 8],
            ['counselor_id' => 2, 'category_id' => 6],
            ['counselor_id' => 2, 'category_id' => 7],

            // Muhammad Pahrisal — stres kerja, pengembangan diri
            ['counselor_id' => 3, 'category_id' => 5],
            ['counselor_id' => 3, 'category_id' => 6],

            // Hendricus Gatot Ariwidayanto — hubungan, keluarga, kecemasan
            ['counselor_id' => 4, 'category_id' => 3],
            ['counselor_id' => 4, 'category_id' => 7],
            ['counselor_id' => 4, 'category_id' => 1],

            // Enris — karier akademik, pengembangan diri, remaja
            ['counselor_id' => 5, 'category_id' => 9],
            ['counselor_id' => 5, 'category_id' => 6],
            ['counselor_id' => 5, 'category_id' => 8],

            // Ririn Kayla Putri — depresi, kecemasan, kesehatan mental umum
            ['counselor_id' => 6, 'category_id' => 2],
            ['counselor_id' => 6, 'category_id' => 1],
            ['counselor_id' => 6, 'category_id' => 10],

            // Ali Alan Wari — karier, pengembangan diri, stres kerja
            ['counselor_id' => 7, 'category_id' => 9],
            ['counselor_id' => 7, 'category_id' => 6],
            ['counselor_id' => 7, 'category_id' => 5],

            // M Zulfikri Nurhasan — trauma, depresi, kecemasan
            ['counselor_id' => 8, 'category_id' => 4],
            ['counselor_id' => 8, 'category_id' => 2],
            ['counselor_id' => 8, 'category_id' => 1],

            // Meisita Khaniza — remaja, hubungan, pengembangan diri
            ['counselor_id' => 9, 'category_id' => 8],
            ['counselor_id' => 9, 'category_id' => 3],
            ['counselor_id' => 9, 'category_id' => 6],

            // Reihan Zulfan Nurjaman — stres kerja, pengembangan diri, hubungan
            ['counselor_id' => 10, 'category_id' => 5],
            ['counselor_id' => 10, 'category_id' => 6],
            ['counselor_id' => 10, 'category_id' => 3],

            // Ilman Sunanuddin — hubungan, keluarga, trauma
            ['counselor_id' => 11, 'category_id' => 3],
            ['counselor_id' => 11, 'category_id' => 7],
            ['counselor_id' => 11, 'category_id' => 4],

            // Karnadi — karier akademik, remaja, pengembangan diri
            ['counselor_id' => 12, 'category_id' => 9],
            ['counselor_id' => 12, 'category_id' => 8],
            ['counselor_id' => 12, 'category_id' => 6],
        ]);


        DB::table('counselor_schedules')->insert([
            // Delon Fahry Gunawan — Senin, Rabu, Jumat
            ['counselor_id' => 1,  'day_of_week' => 1, 'open_time' => '09:00', 'close_time' => '12:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 1,  'day_of_week' => 3, 'open_time' => '13:00', 'close_time' => '17:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 1,  'day_of_week' => 5, 'open_time' => '10:00', 'close_time' => '13:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Nurlaelatunnisa — Selasa, Kamis, Sabtu
            ['counselor_id' => 2,  'day_of_week' => 2, 'open_time' => '14:00', 'close_time' => '17:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 2,  'day_of_week' => 4, 'open_time' => '09:00', 'close_time' => '12:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 2,  'day_of_week' => 6, 'open_time' => '10:00', 'close_time' => '14:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Muhammad Pahrisal — Senin, Selasa, Kamis
            ['counselor_id' => 3,  'day_of_week' => 1, 'open_time' => '13:00', 'close_time' => '17:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 3,  'day_of_week' => 2, 'open_time' => '09:00', 'close_time' => '12:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 3,  'day_of_week' => 4, 'open_time' => '14:00', 'close_time' => '18:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Hendricus Gatot Ariwidayanto — Rabu, Jumat
            ['counselor_id' => 4,  'day_of_week' => 3, 'open_time' => '09:00', 'close_time' => '15:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 4,  'day_of_week' => 5, 'open_time' => '13:00', 'close_time' => '18:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Enris — Senin, Rabu, Sabtu
            ['counselor_id' => 5,  'day_of_week' => 1, 'open_time' => '08:00', 'close_time' => '11:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 5,  'day_of_week' => 3, 'open_time' => '13:00', 'close_time' => '16:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 5,  'day_of_week' => 6, 'open_time' => '09:00', 'close_time' => '12:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Ririn Kayla Putri — Selasa, Kamis, Minggu
            ['counselor_id' => 6,  'day_of_week' => 2, 'open_time' => '10:00', 'close_time' => '14:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 6,  'day_of_week' => 4, 'open_time' => '14:00', 'close_time' => '18:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 6,  'day_of_week' => 7, 'open_time' => '09:00', 'close_time' => '12:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Ali Alan Wari — Senin, Jumat
            ['counselor_id' => 7,  'day_of_week' => 1, 'open_time' => '14:00', 'close_time' => '18:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 7,  'day_of_week' => 5, 'open_time' => '09:00', 'close_time' => '14:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // M Zulfikri Nurhasan — Selasa, Rabu, Kamis
            ['counselor_id' => 8,  'day_of_week' => 2, 'open_time' => '09:00', 'close_time' => '13:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 8,  'day_of_week' => 3, 'open_time' => '14:00', 'close_time' => '18:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 8,  'day_of_week' => 4, 'open_time' => '09:00', 'close_time' => '12:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Meisita Khaniza — Rabu, Sabtu
            ['counselor_id' => 9,  'day_of_week' => 3, 'open_time' => '10:00', 'close_time' => '14:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 9,  'day_of_week' => 6, 'open_time' => '09:00', 'close_time' => '13:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Reihan Zulfan Nurjaman — Senin, Kamis, Jumat
            ['counselor_id' => 10, 'day_of_week' => 1, 'open_time' => '09:00', 'close_time' => '13:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 10, 'day_of_week' => 4, 'open_time' => '14:00', 'close_time' => '17:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 10, 'day_of_week' => 5, 'open_time' => '10:00', 'close_time' => '14:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Ilman Sunanuddin — Selasa, Sabtu
            ['counselor_id' => 11, 'day_of_week' => 2, 'open_time' => '13:00', 'close_time' => '18:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 11, 'day_of_week' => 6, 'open_time' => '09:00', 'close_time' => '15:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],

            // Karnadi — Senin, Rabu, Jumat
            ['counselor_id' => 12, 'day_of_week' => 1, 'open_time' => '08:00', 'close_time' => '11:00', 'method' => 'online',  'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 12, 'day_of_week' => 3, 'open_time' => '13:00', 'close_time' => '16:00', 'method' => 'both',    'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['counselor_id' => 12, 'day_of_week' => 5, 'open_time' => '09:00', 'close_time' => '12:00', 'method' => 'offline', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
