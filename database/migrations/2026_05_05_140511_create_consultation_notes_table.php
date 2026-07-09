<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultation_notes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('consultation_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->enum('type', [
                'pre_session', // Keluhan awal / informasi sebelum konsultasi dimulai
                'session',     // Catatan proses konsultasi saat sesi berlangsung
                'summary',     // Ringkasan hasil konsultasi dan saran untuk klien
                'follow_up',   // Catatan tindak lanjut setelah sesi selesai
                'cancellation'
            ]);

            $table->enum('visibility', [
                'shared',          // Bisa dilihat user dan konselor
                'counselor_only',  // Hanya konselor
            ])->default('shared');

            $table->longText('content');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_notes');
    }
};
