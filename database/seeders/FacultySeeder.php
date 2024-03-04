<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('faculties')->insert([
            ['slug' => 'ФАКУЛЬТЕТ ЦИФРОВИХ, ОСВІТНІХ ТА СОЦІАЛЬНИХ ТЕХНОЛОГІЙ', 'image' => '1'],
            ['slug' => 'ФАКУЛЬТЕТ АГРАРНИХ ТЕХНОЛОГІЙ ТА ЕКОЛОГІЇ', 'image' => '2'],
            ['slug' => 'ФАКУЛЬТЕТ МИТНОЇ СПРАВИ, МАТЕРІАЛІВ ТА ТЕХНОЛОГІЙ', 'image' => '3'],
            ['slug' => 'ФАКУЛЬТЕТ ТРАНСПОРТУ ТА МЕХАНІЧНОЇ ІНЖЕНЕРІЇ', 'image' => '4'],
            ['slug' => 'ФАКУЛЬТЕТ АРХІТЕКТУРИ БУДІВНИЦТВА ТА ДИЗАЙНУ', 'image' => '5'],
            ['slug' => 'ФАКУЛЬТЕТ БІЗНЕМУ ТА ПРАВА', 'image' => '6'],
            ['slug' => 'ФАКУЛЬТЕТ КОМП’ЮТЕРНИХ ТА ІНФОРМАЦІЙНИХ ТЕХНОЛОГІЙ', 'image' => '7'],
            ['slug' => 'КАФЕДРА ВІЙСЬКОВОЇ ПІДГОТОВКИ', 'image' => '8'],
        ]);
    }
}
