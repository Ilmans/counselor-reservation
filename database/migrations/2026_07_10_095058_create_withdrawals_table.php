<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->foreignId('counselor_id')
                ->constrained('counselors')
                ->cascadeOnDelete();
            $table->decimal('amount', 12, 2);

            // Snapshot data bank saat request dibuat,
            // supaya histori tetap akurat walau rekening diganti belakangan
            $table->string('bank_name');
            $table->string('account_number');
            $table->string('account_holder_name');

            $table->enum('status', ['pending', 'completed', 'rejected'])->default('pending');
            $table->string('notes')->nullable(); // alasan kalau ditolak
            $table->timestamp('processed_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('withdrawals');
    }
};
