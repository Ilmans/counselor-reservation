<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ConseulorSeeder::class,
        ]);

        $paymentMethods = [
            [
                'code' => 'bca',
                'name' => 'Bank BCA',
                'type' => 'bank_transfer',
                'is_active' => true,
                'metadata' => json_encode([
                    'logo' => 'https://images.seeklogo.com/logo-png/23/2/bca-bank-logo-png_seeklogo-232742.png',
                    'account_name' => 'PT Tenang Aja',
                    'account_number' => '1234567890',
                ]),
            ],
            [
                'code' => 'bri',
                'name' => 'Bank BRI',
                'type' => 'bank_transfer',
                'is_active' => true,
                'metadata' => json_encode([
                    'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Bendera_BRI_2025_%28Putih%29.svg/1280px-Bendera_BRI_2025_%28Putih%29.svg.png?_=20251221004429',
                    'account_name' => 'PT Tenang Aja',
                    'account_number' => '9876543210',
                ]),
            ],
            [
                'code' => 'qris',
                'name' => 'QRIS',
                'type' => 'qris',
                'is_active' => true,
                'metadata' => json_encode([
                    'logo' => 'https://gkjw.or.id/wp-content/uploads/2023/05/QRIS-Dummy.jpg',
                    'qr_image' => 'https://gkjw.or.id/wp-content/uploads/2023/05/QRIS-Dummy.jpg',
                    'merchant_name' => 'PT Tenang Aja',
                ]),
            ],
        ];

        foreach ($paymentMethods as $paymentMethod) {
            PaymentMethod::updateOrCreate(
                ['code' => $paymentMethod['code']],
                $paymentMethod
            );
        }
    }
}
