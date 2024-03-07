<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    public function run()
    {
        $sections = ['Ліворуч', 'Праворуч'];
        $blocks = ['Перший', 'Другий'];
        $genders = ['Чоловіча', 'Жіноча'];

        for ($i = 1; $i <= 100; $i++) {
            for ($s = 'a'; $s<= 'b'; $s++){}
            $room = DB::table('rooms')->insertGetId([
                'dormitory_id' => rand(1, 3),
                'faculty_id' => rand(1, 8),
                'number' => $i . $s,
                'floor' => rand(1, 9),
                'places' => rand(1, 4),
                'section' => $sections[array_rand($sections)],
                'block' => $blocks[array_rand($blocks)],
                'gender' => $genders[array_rand($genders)],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Вставка від 1 до 10 фотографій для кожної кімнати
            for ($j = 1; $j <= rand(1, 10); $j++) {
                DB::table('images')->insert([
                    'room_id' => $room,
                    'url' => "/photos/uploads/room/1.png",
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}





