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
        Schema::create('consultation_chat_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultation_id')->constrained()->cascadeOnDelete();

            // Diskriminator manual: cuma ada 2 aktor nyata (user, counselor)
            // + 2 aktor virtual (ai, system), jadi enum lebih simpel dari morph.
            $table->enum('sender_type', ['user', 'counselor', 'ai', 'system']);
            $table->unsignedBigInteger('sender_id')->nullable();

            $table->text('message');

            $table->boolean('is_read_by_user')->default(false);
            $table->boolean('is_read_by_counselor')->default(false);

            $table->timestamps();

            // Query utama: WHERE consultation_id = ? ORDER BY id
            $table->index(['consultation_id', 'id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_chat_messages');
    }
};
