<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DormitorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dormitories')->insert([
            ['slug' => 'Гуртожиток 1', 'address' => 'Адреса 1'],
            ['slug' => 'Гуртожиток 2', 'address' => 'Адреса 2'],
            ['slug' => 'Гуртожиток 3', 'address' => 'Адреса 3'],
        ]);
    }
}
