<?php

namespace Database\Seeders;

use App\Models\Recruiter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class RecruiterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Recruiter::truncate();
        Schema::enableForeignKeyConstraints();
        Recruiter::upsert(
            [
                [
                    'company_name' => 'XYZ Enterprises',
                    'company_description' => 'A multinational corporation specializing in technology solutions.',
                    'company_url' => 'https://www.xyzenterprises.com',
                    'position' => 'Senior Software Engineer',
                    'user_id' => 29,
                ],
                [
                    'company_name' => 'Tech Innovators Ltd.',
                    'company_description' => 'A startup focused on cutting-edge technological advancements.',
                    'company_url' => 'https://www.techinnovators.com',
                    'position' => 'Data Analyst',
                    'user_id' => 30,
                ],
                [
                    'company_name' => 'InnovateTech Solutions',
                    'company_description' => 'A technology consultancy firm offering innovative solutions.',
                    'company_url' => 'https://www.innovatetech.com',
                    'position' => 'Software Developer',
                    'user_id' => 31,
                ],
                [
                    'company_name' => 'Global Innovations Inc.',
                    'company_description' => 'An international corporation specializing in digital transformations.',
                    'company_url' => 'https://www.globalinnovations.com',
                    'position' => 'Cybersecurity Analyst',
                    'user_id' => 32,
                ],
                [
                    'company_name' => 'Tech Solutions Co.',
                    'company_description' => 'An IT company providing comprehensive technological solutions.',
                    'company_url' => 'https://www.techsolutionsco.com',
                    'position' => 'Product Manager',
                    'user_id' => 33,
                ],
            ],
            'company_name'
        );
    }
}
