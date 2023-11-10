<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Employee::truncate();
        Schema::enableForeignKeyConstraints();
        Employee::upsert(
            [
                'views' => 100,
                'location' => 'City A',
                'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'expected_salary' => 80000.00,
                'portfolio' => 'https://portfolio.example.com/jan-kowalski',
                'user_id' => 1,
            ],
            'views'
        );
    }
}
