<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            EmployeeSeeder::class,
            RecruiterSeeder::class,
            EducationSeeder::class,
            LanguageSeeder::class,
            SkillSeeder::class,
            WorkExperienceSeeder::class,
        ]);
    }
}
