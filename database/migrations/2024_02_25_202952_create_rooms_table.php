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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dormitory_id')->constrained();
            $table->foreignId('faculty_id')->constrained();
            $table->string('number');
            $table->integer('floor');
            $table->integer('places');
            $table->enum('section', ['Ліворуч', 'Праворуч']);
            $table->enum('block',  ['Перший', 'Другий']);
            $table->enum('gender', ['Чоловіча', 'Жіноча']);
            $table->string('images');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
