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
            $table->string('photos')->default('null');
            $table->foreignId('dormitory_id')->constrained();
            $table->integer('number')->index();
            $table->integer('floor');
            $table->integer('places');
            $table->enum('section', ['Ліворуч', 'Праворуч']);
            $table->enum('block',  ['Перший', 'Другий']);
            $table->enum('gender', ['Чоловіча', 'Жіноча']);
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
