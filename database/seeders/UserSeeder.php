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
        $password = Hash::make('11111111');

        DB::table('users')->insert([
            [
                'name'          => 'Admin Satu',
                'email'         => 'admin1@gmail.com',
                'whatsapp'      => '081234567000',
                'avatar_path'   => null,
                'age'           => 30,
                'gender'        => 'L',
                'role'          => 'admin',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Admin Dua',
                'email'         => 'admin2@gmail.com',
                'whatsapp'      => '081234567001',
                'avatar_path'   => null,
                'age'           => 32,
                'gender'        => 'P',
                'role'          => 'admin',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Budi Santoso',
                'email'         => 'user1@gmail.com',
                'whatsapp'      => '081234567002',
                'avatar_path'   => null,
                'age'           => 28,
                'gender'        => 'L',
                'role'          => 'user',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Siti Rahayu',
                'email'         => 'user2@gmail.com',
                'whatsapp'      => '081234567003',
                'avatar_path'   => null,
                'age'           => 25,
                'gender'        => 'P',
                'role'          => 'user',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Andi Wijaya',
                'email'         => 'andi.wijaya@email.com',
                'whatsapp'      => '081234567004',
                'avatar_path'   => null,
                'age'           => 30,
                'gender'        => 'L',
                'role'          => 'user',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Dewi Anggraini',
                'email'         => 'dewi.anggraini@email.com',
                'whatsapp'      => '081234567005',
                'avatar_path'   => null,
                'age'           => 27,
                'gender'        => 'P',
                'role'          => 'user',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Rizky Pratama',
                'email'         => 'rizky.pratama@email.com',
                'whatsapp'      => '081234567006',
                'avatar_path'   => null,
                'age'           => 24,
                'gender'        => 'L',
                'role'          => 'user',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Nadia Putri',
                'email'         => 'nadia.putri@email.com',
                'whatsapp'      => '081234567007',
                'avatar_path'   => null,
                'age'           => 26,
                'gender'        => 'P',
                'role'          => 'user',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Fajar Ramadhan',
                'email'         => 'fajar.ramadhan@email.com',
                'whatsapp'      => '081234567008',
                'avatar_path'   => null,
                'age'           => 29,
                'gender'        => 'L',
                'role'          => 'user',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'Melati Sari',
                'email'         => 'melati.sari@email.com',
                'whatsapp'      => '081234567009',
                'avatar_path'   => null,
                'age'           => 23,
                'gender'        => 'P',
                'role'          => 'user',
                'password'      => $password,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
        ]);
    }
}
