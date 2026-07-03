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
        Schema::create('invoices', function (Blueprint $table) {
            $table->foreignId("user_id")->constrained("users")->cascadeOnDelete();
            $table->string('reference')->unique();
            $table->foreignId('consultation_id')
                ->unique()
                ->constrained()
                ->cascadeOnDelete();
            $table->decimal('amount', 12, 2);
            $table->enum('status', [
                'pending',
                'paid',
                'expired',
                'failed',
                'cancelled',
                'refunded',
            ])->default('pending');
            $table->json('payment_method')->nullable();
            $table->string('payment_reference')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->json('metadata')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
