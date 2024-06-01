<?php

namespace Database\Seeders;

use App\Models\Dormitory;
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
        Dormitory::updateOrCreate(['slug' => 'Гуртожиток №1'], [
            'address' => 'м. Луцьк, вул. Даньшина, 8',
        ]);
        Dormitory::updateOrCreate(['slug' => 'Гуртожиток №2'], [
            'address' => 'м. Луцьк, пр-т. Відродження, 22',
        ]);
        Dormitory::updateOrCreate(['slug' => 'Гуртожиток №3'], [
            'address' => 'м. Луцьк, вул. С Ковалевської,29',
        ]);

    }
}
