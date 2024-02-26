<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genders = ['Чоловіча', 'Жіноча'];
        $benefits = ['Пільга 1', 'Пільга 2', 'Пільга 3'];

        for ($i = 1; $i <= 100; $i++) {
            DB::table('orders')->insert([
                'first_name' => 'Ім\'я' . $i,
                'last_name' => 'Прізвище' . $i,
                'father_name' => 'По батькові' . $i,
                'address' => 'Адреса' . $i,
                'gender' => $genders[array_rand($genders)],
                'phone' => '0' . rand(100000000, 999999999), // Генеруємо випадковий номер телефону
                'benefits' => $benefits[array_rand($benefits)],
                'room_id' => rand(1, 100), // Припустимо, у вас є 100 кімнат
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
