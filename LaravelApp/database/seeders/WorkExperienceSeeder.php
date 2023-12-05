<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Role;
use App\Models\WorkExperience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class WorkExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        WorkExperience::truncate();
        Schema::enableForeignKeyConstraints();
        WorkExperience::upsert(
            [
                [
                    'company_name' => 'ABC Corp',
                    'position' => 'Software Developer',
                    'description' => 'Responsible for developing web applications using PHP and JavaScript.',
                    'start_date' => '2022-01-01',
                    'end_date' => '2023-06-30',
                    'employee_id' => 1
                ],
                [
                    'company_name' => 'XYZ Solutions',
                    'position' => 'Senior Frontend Engineer',
                    'description' => 'Led a team in developing responsive and user-friendly interfaces using React.js.',
                    'start_date' => '2020-03-15',
                    'end_date' => '2022-01-15',
                    'employee_id' => 1
                ],
                [
                    'company_name' => 'Tech Innovators',
                    'position' => 'Data Analyst',
                    'description' => 'Analyzed large datasets and generated reports for business insights.',
                    'start_date' => '2019-06-01',
                    'end_date' => '2020-02-28',
                    'employee_id' => 1
                ],
            ],
            'name'
        );
    }
}
