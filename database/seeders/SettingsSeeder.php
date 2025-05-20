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
                'type'  => 'integer',
                'value' => 3,
            ],
            [
                'title' => 'Дата початку бронювання',
                'key'   => 'start_date',
                'type'  => 'date',
                'value' => Carbon::now(),
            ],
            [
                'title' => 'Дата закінчення бронювання',
                'key'   => 'end_date',
                'type'  => 'date',
                'value' => Carbon::now()->addDays(30),
            ],
            [
                'title' => 'Печатка/підпис документу',
                'key'   => 'stamp',
                'type'  => 'file',
                'value' => null,
            ],
    ];

        foreach ($settings as $setting) {
            $setting  = Settings::updateOrCreate(['key' => $setting['key']], $setting);

            if ($setting['type'] === 'file') {
                $setting->addMediaFromUrl('https://lntu.edu.ua/sites/default/files/logo/logo-lntu-svg2.svg')
                    ->preservingOriginal()
                    ->toMediaCollection('settings');
            }
        }
    }
}
