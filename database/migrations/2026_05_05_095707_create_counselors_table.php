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
        Schema::create('counselors', function (Blueprint $table) {
            $table->id();
            $table->foreignId("specialization_id")
                ->constrained("specializations")
                ->restrictOnDelete();
            $table->string("name");
            $table->string("email");
            $table->string("whatsapp");
            $table->string("bio");
            $table->string("photo_url");
            $table->enum("pricing_type",["paid","free"])->default("free");
            $table->decimal("price_per_hour")->nullable();
            $table->integer("session_duration_minutes");
            $table->enum("status",["active","inactive"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('counselors');
    }
};
