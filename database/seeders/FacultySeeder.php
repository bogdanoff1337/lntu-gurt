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
            ['slug' => 'ФАКУЛЬТЕТ ЦИФРОВИХ, ОСВІТНІХ ТА СОЦІАЛЬНИХ ТЕХНОЛОГІЙ', 'image' => '/photos/uploads/facult/FCOST.svg'],
            ['slug' => 'ФАКУЛЬТЕТ АГРАРНИХ ТЕХНОЛОГІЙ ТА ЕКОЛОГІЇ', 'image' => '/photos/uploads/facult/FATE.svg'],
            ['slug' => 'ФАКУЛЬТЕТ МИТНОЇ СПРАВИ, МАТЕРІАЛІВ ТА ТЕХНОЛОГІЙ', 'image' => '/photos/uploads/facult/FMSMT.svg'],
            ['slug' => 'ФАКУЛЬТЕТ ТРАНСПОРТУ ТА МЕХАНІЧНОЇ ІНЖЕНЕРІЇ', 'image' => '/photos/uploads/facult/FTMI.svg'],
            ['slug' => 'ФАКУЛЬТЕТ АРХІТЕКТУРИ БУДІВНИЦТВА ТА ДИЗАЙНУ', 'image' => '/photos/uploads/facult/FABD.svg'],
            ['slug' => 'ФАКУЛЬТЕТ БІЗНЕМУ ТА ПРАВА', 'image' => '/photos/uploads/facult/FBP.svg'],
            ['slug' => 'ФАКУЛЬТЕТ КОМП’ЮТЕРНИХ ТА ІНФОРМАЦІЙНИХ ТЕХНОЛОГІЙ', 'image' => '/photos/uploads/facult/FKIT.svg'],
            ['slug' => 'КАФЕДРА ВІЙСЬКОВОЇ ПІДГОТОВКИ', 'image' => '/photos/uploads/facult/KVP.svg'],
        ]);
    }
}
