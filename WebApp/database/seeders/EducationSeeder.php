<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Education::truncate();
        Schema::enableForeignKeyConstraints();
        Education::upsert(
            [
                [
                    'university_name' => 'University of Science',
                    'field_of_study' => 'Computer Science',
                    'description' => 'Studied Computer Science with a focus on Artificial Intelligence.',
                    'start_date' => '2017-09-01',
                    'end_date' => '2021-06-30',
                    'employee_id' => 1
                ],
                [
                    'university_name' => 'Business School',
                    'field_of_study' => 'Finance',
                    'description' => 'Specialized in Financial Management and Investment Banking.',
                    'start_date' => '2016-08-15',
                    'end_date' => '2020-05-20',
                    'employee_id' => 1
                ],
                [
                    'university_name' => 'Engineering College',
                    'field_of_study' => 'Mechanical Engineering',
                    'description' => 'Completed studies in Mechanical Engineering with a focus on Automotive Design.',
                    'start_date' => '2015-09-01',
                    'end_date' => '2019-06-30',
                    'employee_id' => 1
                ],
            ],
            'university_name'
        );
    }
}
