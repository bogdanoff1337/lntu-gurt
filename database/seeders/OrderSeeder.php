<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = DB::table('students')->pluck('id')->toArray();
        $rooms = DB::table('rooms')->pluck('id')->toArray();

        for ($i = 1; $i <= 100; $i++) {
            DB::table('orders')->insert([
                'student_id' => $students[array_rand($students)],
                'room_id' => $rooms[array_rand($rooms)],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
