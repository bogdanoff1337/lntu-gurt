<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cities')->truncate();

        $filePath = base_path('m.json');
        $file = fopen($filePath, 'r');

        $json = fread($file, filesize($filePath));
        fclose($file);

        $locations = json_decode($json, true);

        foreach ($locations as $location) {
            DB::table('cities')->insert([
                'name' => $location['object_name'],
                'region' => $location['region'],
                'community' => $location['region'],
            ]);
        }
    }
}
