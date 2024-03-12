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
            ['slug' => 'Гуртожиток №1', 'address' => 'м. Луцьк, вул. Даньшина, 8'],
            ['slug' => 'Гуртожиток №2', 'address' => ' м. Луцьк, пр-т. Відродження, 22'],
            ['slug' => 'Гуртожиток №3', 'address' => 'м. Луцьк, вул. С Ковалевської,29'],
        ]);
    }
}
