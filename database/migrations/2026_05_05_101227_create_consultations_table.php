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
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained("users")->cascadeOnDelete();
            $table->foreignId("counselor_id")->constrained("counselors")->cascadeOnDelete();
            $table->string('categories');
            $table->date("consultation_date");
            $table->time("estimated_time");
            $table->integer("queue_position");
            $table->string("meeting_link")->nullable();
            $table->enum('method', ["offline", "online"])->default("online");
            $table->boolean('client_first_experience');
            $table->enum("status", ["pending", "confirmed", "in_queue", "in_progress", "completed", "cancelled", "rejected"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
