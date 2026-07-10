<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ConseulorSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        $password = Hash::make('11111111');

        DB::table('specializations')->insert([
            ['id' => 1, 'name' => 'Psikolog Klinis',        'description' => 'Menangani gangguan mental dan perilaku secara klinis.'],
            ['id' => 2, 'name' => 'Konselor Umum',          'description' => 'Membantu pasangan mengatasi konflik dan komunikasi.'],
            ['id' => 3, 'name' => 'Konselor Remaja',        'description' => 'Pendampingan psikologis khusus usia remaja.'],
            ['id' => 4, 'name' => 'Psikolog Pendidikan',    'description' => 'Fokus pada isu belajar, motivasi, dan pengembangan akademik.'],
            ['id' => 5, 'name' => 'Konselor Karier',        'description' => 'Membantu individu menemukan arah karier yang sesuai.'],
            ['id' => 6, 'name' => 'Psikolog Industri',      'description' => 'Menangani isu psikologis di lingkungan kerja dan organisasi.'],
        ]);

        DB::table('categories')->insert([
            ['id' => 1,  'name' => 'Kecemasan',               'slug' => 'kecemasan'],
            ['id' => 2,  'name' => 'Depresi',                 'slug' => 'depresi'],
            ['id' => 3,  'name' => 'Hubungan',                'slug' => 'hubungan'],
            ['id' => 4,  'name' => 'Trauma & PTSD',           'slug' => 'trauma-ptsd'],
            ['id' => 5,  'name' => 'Stres Kerja',             'slug' => 'stres-kerja'],
            ['id' => 6,  'name' => 'Pengembangan Diri',       'slug' => 'pengembangan-diri'],
            ['id' => 7,  'name' => 'Masalah Keluarga',        'slug' => 'masalah-keluarga'],
            ['id' => 8,  'name' => 'Remaja & Tumbuh Kembang', 'slug' => 'remaja-tumbuh-kembang'],
            ['id' => 9,  'name' => 'Karier & Akademik',       'slug' => 'karier-akademik'],
            ['id' => 10, 'name' => 'Kesehatan Mental Umum',   'slug' => 'kesehatan-mental-umum'],
        ]);

        // ==============================
        // DATA POOL UNTUK GENERATE 50 KONSELOR
        // ==============================
        $firstNamesMale = [
            'Budi',
            'Andi',
            'Rizky',
            'Fajar',
            'Dedi',
            'Agus',
            'Bayu',
            'Doni',
            'Eko',
            'Fadli',
            'Gilang',
            'Hendra',
            'Irfan',
            'Joko',
            'Krisna',
            'Lutfi',
            'Mario',
            'Nanda',
            'Oscar',
            'Putra',
            'Rian',
            'Surya',
            'Taufik',
            'Umar',
            'Wahyu',
        ];

        $firstNamesFemale = [
            'Siti',
            'Dewi',
            'Nadia',
            'Melati',
            'Ayu',
            'Bella',
            'Citra',
            'Dinda',
            'Eka',
            'Fitri',
            'Gita',
            'Hana',
            'Indah',
            'Julia',
            'Kirana',
            'Laras',
            'Mira',
            'Nia',
            'Olivia',
            'Putri',
            'Ratna',
            'Sinta',
            'Tania',
            'Vina',
            'Wulan',
        ];

        $lastNames = [
            'Santoso',
            'Wijaya',
            'Anggraini',
            'Pratama',
            'Kurniawan',
            'Setiawan',
            'Hidayat',
            'Ramadhan',
            'Saputra',
            'Permana',
            'Nugroho',
            'Wibowo',
            'Susanto',
            'Firmansyah',
            'Maulana',
            'Handayani',
            'Lestari',
            'Rahmawati',
            'Susanti',
            'Yulianto',
            'Zainuddin',
            'Wahyudi',
            'Prasetyo',
            'Kusuma',
            'Halim',
        ];

        $titleBySpecialization = [
            1 => 'M.Psi.',
            2 => 'S.Psi.',
            3 => 'S.Psi.',
            4 => 'S.Pd.',
            5 => 'S.Psi.',
            6 => 'M.Psi.',
        ];

        $cities = [
            ['city' => 'Jakarta Pusat',   'province' => 'DKI Jakarta',    'postal_code' => '10220'],
            ['city' => 'Jakarta Selatan', 'province' => 'DKI Jakarta',    'postal_code' => '12930'],
            ['city' => 'Bandung',         'province' => 'Jawa Barat',     'postal_code' => '40132'],
            ['city' => 'Surabaya',        'province' => 'Jawa Timur',     'postal_code' => '60241'],
            ['city' => 'Semarang',        'province' => 'Jawa Tengah',    'postal_code' => '50132'],
            ['city' => 'Yogyakarta',      'province' => 'DI Yogyakarta',  'postal_code' => '55281'],
            ['city' => 'Makassar',        'province' => 'Sulawesi Selatan', 'postal_code' => '90222'],
            ['city' => 'Medan',           'province' => 'Sumatera Utara', 'postal_code' => '20111'],
            ['city' => 'Denpasar',        'province' => 'Bali',           'postal_code' => '80111'],
            ['city' => 'Palembang',       'province' => 'Sumatera Selatan', 'postal_code' => '30111'],
        ];

        $streetNames = [
            'Jl. Sudirman',
            'Jl. Gatot Subroto',
            'Jl. Diponegoro',
            'Jl. Ahmad Yani',
            'Jl. Pahlawan',
            'Jl. Merdeka',
            'Jl. Veteran',
            'Jl. Cendrawasih',
            'Jl. Melati',
            'Jl. Kenanga',
        ];

        $bioTemplates = [
            '<p>Sebagai <strong>%1$s</strong> dengan <strong>%2$d tahun pengalaman</strong>, saya berdedikasi membantu klien mengatasi berbagai tantangan psikologis di %3$s.</p><p>Saya menggunakan pendekatan yang <em>berbasis bukti (evidence-based)</em> dan disesuaikan dengan kebutuhan masing-masing klien, sehingga proses konseling terasa relevan dan aplikatif.</p><p>Saya percaya setiap orang punya potensi untuk pulih dan berkembang, dan tugas saya adalah mendampingi proses tersebut dengan penuh empati.</p>',
            '<p>Dengan latar belakang sebagai <strong>%1$s</strong> dan pengalaman <strong>%2$d tahun</strong>, saya telah mendampingi banyak klien di wilayah %3$s dalam menghadapi berbagai persoalan hidup.</p><p>Pendekatan saya bersifat <em>hangat dan tidak menghakimi</em>, menciptakan ruang aman bagi klien untuk terbuka dan menemukan solusi terbaik bagi diri mereka sendiri.</p><p>Saya juga aktif mengikuti pelatihan dan seminar untuk terus memperbarui keilmuan saya di bidang psikologi.</p>',
            '<p>Saya adalah <strong>%1$s</strong> yang telah berpraktik selama <strong>%2$d tahun</strong>, dengan fokus utama membantu klien di %3$s menemukan keseimbangan hidup yang lebih baik.</p><p>Metode yang saya gunakan menggabungkan teknik konseling modern dengan pemahaman konteks budaya lokal, agar solusi yang diberikan benar-benar relevan.</p><p>Saya percaya proses konseling adalah kolaborasi, bukan sekadar memberi nasihat satu arah.</p>',
        ];

        $specializationName = [
            1 => 'Psikolog Klinis',
            2 => 'Konselor Umum',
            3 => 'Konselor Remaja',
            4 => 'Psikolog Pendidikan',
            5 => 'Konselor Karier',
            6 => 'Psikolog Industri',
        ];

        // kategori relevan per spesialisasi (dipakai untuk isi counselor_categories)
        $categoriesBySpecialization = [
            1 => [1, 4, 10],
            2 => [3, 7, 1],
            3 => [8, 6, 7],
            4 => [9, 6, 8],
            5 => [9, 6, 5],
            6 => [5, 6, 3],
        ];

        $totalCounselors = 50;
        $fixedEmails = [
            1 => 'konselor1@gmail.com',
            2 => 'konselor2@gmail.com',
            3 => 'konselor3@gmail.com',
        ];

        $counselors = [];
        $usedEmails = [];

        for ($i = 1; $i <= $totalCounselors; $i++) {
            $isFemale = ($i % 2 === 0);
            $firstName = $isFemale
                ? $firstNamesFemale[($i * 3) % count($firstNamesFemale)]
                : $firstNamesMale[($i * 3) % count($firstNamesMale)];
            $lastName = $lastNames[($i * 5) % count($lastNames)];

            $specializationId = (($i - 1) % 6) + 1;
            $title = $titleBySpecialization[$specializationId];
            $fullName = "{$firstName} {$lastName}, {$title}";

            $cityData = $cities[($i - 1) % count($cities)];
            $streetName = $streetNames[($i - 1) % count($streetNames)];

            // Email: 3 pertama fixed sesuai request, sisanya digenerate unik
            if (isset($fixedEmails[$i])) {
                $email = $fixedEmails[$i];
            } else {
                $baseEmail = Str::slug($firstName . '.' . $lastName, '.') . $i . '@konselor.com';
                $email = $baseEmail;
            }
            $usedEmails[] = $email;

            $experienceYears = 2 + ($i % 14); // 2 - 15 tahun
            $bioTemplate = $bioTemplates[$i % count($bioTemplates)];
            $bio = sprintf(
                $bioTemplate,
                $specializationName[$specializationId],
                $experienceYears,
                $cityData['city']
            );

            // Foto konselor pakai randomuser.me, beda angka = beda foto
            $photoNumber = ($i - 1) % 100; // randomuser mendukung index 0-99
            $photoGender = $isFemale ? 'women' : 'men';
            $photoPath = "https://randomuser.me/api/portraits/{$photoGender}/{$photoNumber}.jpg";

            $isFree = ($i % 3 === 0); // sebagian gratis, sisanya berbayar
            $pricePerHour = $isFree ? 0 : (100000 + (($i % 15) * 10000));
            $sessionDurations = [45, 60, 90];
            $sessionDuration = $sessionDurations[$i % count($sessionDurations)];

            $counselors[] = [
                'id' => $i,
                'specialization_id' => $specializationId,
                'name' => $fullName,
                'slug' => Str::slug($fullName) . '-' . $i,
                'email' => $email,
                'whatsapp' => '0821' . str_pad((string) $i, 8, '0', STR_PAD_LEFT),
                'experience_years' => $experienceYears,
                'bio' => $bio,
                'photo_path' => $photoPath,
                'pricing_type' => $isFree ? 'free' : 'paid',
                'price_per_hour' => $pricePerHour,
                'session_duration_minutes' => $sessionDuration,
                'visibility' => 'active',
                'gender' => $isFemale ? 'P' : 'L',
                'address' => [
                    'address' => "{$streetName} No. " . (10 + $i),
                    'city' => $cityData['city'],
                    'province' => $cityData['province'],
                    'postal_code' => $cityData['postal_code'],
                    'maps_url' => null,
                ],
            ];
        }

        $addressIds = [];
        $userIds = [];

        foreach ($counselors as $counselor) {
            $addressData = $counselor['address'];

            // Insert alamat
            DB::table('counselor_addresses')->insert([
                'name' => "Klinik " . $counselor['name'],
                'address' => $addressData['address'],
                'city' => $addressData['city'],
                'province' => $addressData['province'],
                'postal_code' => $addressData['postal_code'],
                'maps_url' => $addressData['maps_url'],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            $addressIds[$counselor['id']] = DB::table('counselor_addresses')->max('id');

            // Insert user untuk konselor ini
            $userId = DB::table('users')->insertGetId([
                'name'       => $counselor['name'],
                'email'      => $counselor['email'],
                'whatsapp'   => $counselor['whatsapp'],
                'avatar_path' => null, // foto user dikosongkan, hanya photo konselor yang diisi
                'age'        => 20 + ($counselor['id'] % 25),
                'gender'     => $counselor['gender'],
                'role'       => 'counselor',
                'password'   => $password,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            $userIds[$counselor['id']] = $userId;
        }

        // Insert counselors dengan address_id & user_id
        foreach ($counselors as $counselor) {
            unset($counselor['address'], $counselor['gender']);

            DB::table('counselors')->insert(array_merge($counselor, [
                'address_id' => $addressIds[$counselor['id']],
                'user_id'    => $userIds[$counselor['id']],
                'created_at' => $now,
                'updated_at' => $now,
            ]));
        }

        // ==============================
        // COUNSELOR CATEGORIES (2-3 kategori relevan per konselor)
        // ==============================
        $counselorCategoryRows = [];
        foreach ($counselors as $counselor) {
            $relevantCategories = $categoriesBySpecialization[$counselor['specialization_id']];
            foreach ($relevantCategories as $categoryId) {
                $counselorCategoryRows[] = [
                    'counselor_id' => $counselor['id'],
                    'category_id' => $categoryId,
                ];
            }
        }
        DB::table('counselor_categories')->insert($counselorCategoryRows);

        // ==============================
        // COUNSELOR SCHEDULES (2 slot jadwal per konselor)
        // ==============================
        $methods = ['online', 'offline', 'both'];
        $scheduleRows = [];
        foreach ($counselors as $counselor) {
            $id = $counselor['id'];

            $dayOne = (($id * 2) % 7) + 1;
            $dayTwo = (($id * 2 + 3) % 7) + 1;

            $scheduleRows[] = [
                'counselor_id' => $id,
                'day_of_week' => $dayOne,
                'open_time' => '09:00',
                'close_time' => '12:00',
                'method' => $methods[$id % 3],
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ];
            $scheduleRows[] = [
                'counselor_id' => $id,
                'day_of_week' => $dayTwo,
                'open_time' => '13:00',
                'close_time' => '17:00',
                'method' => $methods[($id + 1) % 3],
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }
        DB::table('counselor_schedules')->insert($scheduleRows);
    }
}
