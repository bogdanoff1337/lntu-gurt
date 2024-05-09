<?php

namespace Database\Seeders;

use App\Models\Faculty;
use Illuminate\Database\Seeder;

class FacultySeeder extends Seeder
{
    public function run()
    {
        Faculty::updateOrCreate(['slug' => 'ФАКУЛЬТЕТ ЦИФРОВИХ, ОСВІТНІХ ТА СОЦІАЛЬНИХ ТЕХНОЛОГІЙ'], [
            'slug_short' => 'ФДОСТ',
            'image' => 'FCOST.svg'
        ]);

        Faculty::updateOrCreate(['slug' => 'ФАКУЛЬТЕТ АГРАРНИХ ТЕХНОЛОГІЙ ТА ЕКОЛОГІЇ'], [
            'slug_short' => 'ФАТЕ',
            'image' => 'FATE.svg'
        ]);

        Faculty::updateOrCreate(['slug' => 'ФАКУЛЬТЕТ МИТНОЇ СПРАВИ, МАТЕРІАЛІВ ТА ТЕХНОЛОГІЙ'], [
            'slug_short' => 'ФМСМТ',
            'image' => 'FMSMT.svg'
        ]);

        Faculty::updateOrCreate(['slug' => 'ФАКУЛЬТЕТ ТРАНСПОРТУ ТА МЕХАНІЧНОЇ ІНЖЕНЕРІЇ'], [
            'slug_short' => 'ФТМІ',
            'image' => 'FTMI.svg'
        ]);

        Faculty::updateOrCreate(['slug' => 'ФАКУЛЬТЕТ АРХІТЕКТУРИ БУДІВНИЦТВА ТА ДИЗАЙНУ'], [
            'slug_short' => 'ФІБН',
            'image' => 'FABD.svg'
        ]);

        Faculty::updateOrCreate(['slug' => 'ФАКУЛЬТЕТ БІЗНЕМУ ТА ПРАВА'], [
            'slug_short' => 'ФБП',
            'image' => 'FBP.svg'
        ]);

        Faculty::updateOrCreate(['slug' => 'ФАКУЛЬТЕТ КОМП’ЮТЕРНИХ ТА ІНФОРМАЦІЙНИХ ТЕХНОЛОГІЙ'], [
            'slug_short' => 'ФКІТ',
            'image' => 'FKIT.svg'
        ]);

        Faculty::updateOrCreate(['slug' => 'КАФЕДРА ВІЙСЬКОВОЇ ПІДГОТОВКИ'], [
            'slug_short' => 'КВП',
            'image' => 'KVP.svg'
        ]);
    }
}
