<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
             FacultySeeder::class,
             DormitorySeeder::class,
             RoomSeeder::class,
             StudentSeeder::class,
             OrderSeeder::class,
             UserSeeder::class,

        ]);
    }
}
