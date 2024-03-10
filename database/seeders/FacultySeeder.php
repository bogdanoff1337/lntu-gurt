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
            ['slug' => 'ФАКУЛЬТЕТ ЦИФРОВИХ, ОСВІТНІХ ТА СОЦІАЛЬНИХ ТЕХНОЛОГІЙ', 'slug_short' => 'FDOST', 'image' => '/photos/uploads/facult/FCOST.svg'],
            ['slug' => 'ФАКУЛЬТЕТ АГРАРНИХ ТЕХНОЛОГІЙ ТА ЕКОЛОГІЇ', 'slug_short' => 'FATE', 'image' => '/photos/uploads/facult/FATE.svg'],
            ['slug' => 'ФАКУЛЬТЕТ МИТНОЇ СПРАВИ, МАТЕРІАЛІВ ТА ТЕХНОЛОГІЙ', 'slug_short' => 'FMSMT', 'image' => '/photos/uploads/facult/FMSMT.svg'],
            ['slug' => 'ФАКУЛЬТЕТ ТРАНСПОРТУ ТА МЕХАНІЧНОЇ ІНЖЕНЕРІЇ', 'slug_short' => 'FTMI', 'image' => '/photos/uploads/facult/FTMI.svg'],
            ['slug' => 'ФАКУЛЬТЕТ АРХІТЕКТУРИ БУДІВНИЦТВА ТА ДИЗАЙНУ', 'slug_short' => 'FABD', 'image' => '/photos/uploads/facult/FABD.svg'],
            ['slug' => 'ФАКУЛЬТЕТ БІЗНЕМУ ТА ПРАВА', 'slug_short' => 'FBP', 'image' => '/photos/uploads/facult/FBP.svg'],
            ['slug' => 'ФАКУЛЬТЕТ КОМП’ЮТЕРНИХ ТА ІНФОРМАЦІЙНИХ ТЕХНОЛОГІЙ', 'slug_short' => 'FKIT', 'image' => '/photos/uploads/facult/FKIT.svg'],
            ['slug' => 'КАФЕДРА ВІЙСЬКОВОЇ ПІДГОТОВКИ', 'slug_short' => 'KVP', 'image' => '/photos/uploads/facult/KVP.svg'],
        ]);
    }
}
