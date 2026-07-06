<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('users')->insert([
            [
                'name'          => 'Admin Konselor',
                'email'         => 'admin@gmail.com',
                'whatsapp'      => '081234567000',
                'image'         => null,
                'age'           => 30,
                'gender'        => "L",
                'role'          => 'admin',
                'password'      => Hash::make('password'),
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Budi Santoso',
                'email'         => 'user@gmail.com',
                'whatsapp'      => '081234567001',
                'image'         => null,
                'age'           => 28,
                'gender'        => 'L',
                'role'          => 'user',
                'password'      => Hash::make('password'),
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Siti Rahayu',
                'email'         => 'siti.rahayu@email.com',
                'whatsapp'      => '081234567002',
                'image'         => null,
                'age'           => 25,
                'gender'        => 'P',
                'role'          => 'user',
                'password'      => Hash::make('password123'),
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Andi Wijaya',
                'email'         => 'andi.wijaya@email.com',
                'whatsapp'      => '081234567003',
                'image'         => null,
                'age'           => 30,
                'gender'        => 'L',
                'role'          => 'user',
                'password'      => Hash::make('password123'),
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Dewi Anggraini',
                'email'         => 'dewi.anggraini@email.com',
                'whatsapp'      => '081234567004',
                'image'         => null,
                'age'           => 27,
                'gender'        => 'P',
                'role'          => 'user',
                'password'      => Hash::make('password123'),
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Rizky Pratama',
                'email'         => 'rizky.pratama@email.com',
                'whatsapp'      => '081234567005',
                'image'         => null,
                'age'           => 24,
                'gender'        => 'L',
                'role'          => 'user',
                'password'      => Hash::make('password123'),
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
        ]);
    }
}
