<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Language::truncate();
        Schema::enableForeignKeyConstraints();
        Language::upsert(
            [
                [
                    'name' => 'English',
                    'proficiency' => 'C1',
                    'employee_id' => 1
                ],
                [
                    'name' => 'Spanish',
                    'proficiency' => 'B2',
                    'employee_id' => 1
                ],
                [
                    'name' => 'German',
                    'proficiency' => 'A2',
                    'employee_id' => 1
                ],
                [
                    'name' => 'French',
                    'proficiency' => 'B1',
                    'employee_id' => 1
                ]
            ],
            'name'
        );
    }
}
