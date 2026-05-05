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
        Schema::create('counselor_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId("counselor_id")->constrained("counselors")->cascadeOnDelete();
            $table->enum("day_of_week",[1,2,3,4,5,6,7]);
            $table->time("open_time");
            $table->time("close_time");
            $table->boolean("is_active");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('counselor_schedules');
    }
};
