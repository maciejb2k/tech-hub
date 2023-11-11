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
                'company_name' => 'ABC Corporation',
                'company_description' => 'A leading company in the industry.',
                'company_url' => 'https://www.abccorp.com',
                'position' => 'HR Manager',
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            'name'
        );
    }
}
