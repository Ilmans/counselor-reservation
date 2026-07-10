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
        Schema::create('consultation_chats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultation_id')->unique()->constrained()->cascadeOnDelete();

            $table->enum('status', ['closed', 'open'])->default('closed');

            // Toggle manual kalau konselor mau matikan AI di sesi tertentu.
            $table->boolean('ai_enabled')->default(true);

            // Cuma penanda waktu, BUKAN tempat nyimpan token/API key.
            // API key AI tetap di .env (services.anthropic.api_key).
            $table->timestamp('ai_last_replied_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_chats');
    }
};
