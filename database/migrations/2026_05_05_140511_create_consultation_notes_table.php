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

            $table->foreignId("consultation_id")
                ->constrained("consultations")
                ->cascadeOnDelete();
            $table->enum("type",['client_pre_sesi','progress','pasca_sesi']);
            $table->longText("content")->nullable();

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
