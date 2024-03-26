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
        $genders = ['Чоловіча', 'Жіноча'];
        $benefits = ['Пільга 1', 'Пільга 2', 'Пільга 3'];

        for ($i = 1; $i <= 100; $i++) {
            DB::table('orders')->insert([
                'student_id' => 1, //  N студентів
                'room_id' => rand(1, 100), // 100 кімнат
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
