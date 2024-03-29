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
            ['slug' => 'ФАКУЛЬТЕТ ЦИФРОВИХ, ОСВІТНІХ ТА СОЦІАЛЬНИХ ТЕХНОЛОГІЙ', 'slug_short' => 'FDOST', 'image' => 'FCOST.svg'],
            ['slug' => 'ФАКУЛЬТЕТ АГРАРНИХ ТЕХНОЛОГІЙ ТА ЕКОЛОГІЇ', 'slug_short' => 'FATE', 'image' => 'FATE.svg'],
            ['slug' => 'ФАКУЛЬТЕТ МИТНОЇ СПРАВИ, МАТЕРІАЛІВ ТА ТЕХНОЛОГІЙ', 'slug_short' => 'FMSMT', 'image' => 'FMSMT.svg'],
            ['slug' => 'ФАКУЛЬТЕТ ТРАНСПОРТУ ТА МЕХАНІЧНОЇ ІНЖЕНЕРІЇ', 'slug_short' => 'FTMI', 'image' => 'FTMI.svg'],
            ['slug' => 'ФАКУЛЬТЕТ АРХІТЕКТУРИ БУДІВНИЦТВА ТА ДИЗАЙНУ', 'slug_short' => 'FABD', 'image' => 'FABD.svg'],
            ['slug' => 'ФАКУЛЬТЕТ БІЗНЕМУ ТА ПРАВА', 'slug_short' => 'FBP', 'image' => 'FBP.svg'],
            ['slug' => 'ФАКУЛЬТЕТ КОМП’ЮТЕРНИХ ТА ІНФОРМАЦІЙНИХ ТЕХНОЛОГІЙ', 'slug_short' => 'FKIT', 'image' => 'FKIT.svg'],
            ['slug' => 'КАФЕДРА ВІЙСЬКОВОЇ ПІДГОТОВКИ', 'slug_short' => 'KVP', 'image' => 'KVP.svg'],
        ]);
    }
}
