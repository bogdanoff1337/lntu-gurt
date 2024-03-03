<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;
use putFileAs;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sections = ['Ліворуч', 'Праворуч'];
        $blocks = ['Перший', 'Другий'];
        $genders = ['Чоловіча', 'Жіноча'];
    
        for ($i = 1; $i <= 100; $i++) {
            $room = DB::table('rooms')->insertGetId([
                'dormitory_id' => rand(1, 3),
                'number' => $i,
                'floor' => rand(1, 9), 
                'places' => rand(1, 4), 
                'section' => $sections[array_rand($sections)],
                'block' => $blocks[array_rand($blocks)],
                'gender' => $genders[array_rand($genders)],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    
            for ($j = 1; $j <= rand(1, 10); $j++) {
                $image = new Image;
                $originalPath = storage_path('app/public/1.png');
                $targetPath = storage_path("app/public/1.png");
                copy($originalPath, $targetPath);
                $image->url = "app/public/1.png";
                $image->room_id = $room;
                $image->save();
            }
        }
    }
    

    
}
