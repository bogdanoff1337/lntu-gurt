<?php

namespace Database\Seeders;

use App\Models\Settings;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'title' => 'Кількість доступних бронювань на користувача',
                'key'   => 'places',
                'value' => 3,
            ],
            [
                'title' => 'Дата початку бронювання',
                'key'   => 'start_date',
                'value' => Carbon::now(),
            ],
            [
                'title' => 'Дата закінчення бронювання',
                'key'   => 'end_date',
                'value' => Carbon::now()->addDays(30),
            ],
    ];

        foreach ($settings as $setting) {
            Settings::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
