<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Role;
use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Skill::truncate();
        Schema::enableForeignKeyConstraints();
        Skill::upsert(
            [
                [
                    'name' => 'PHP',
                    'level' => 4,
                    'employee_id' => 1
                ],
                [
                    'name' => 'JavaScript',
                    'level' => 5,
                    'employee_id' => 1
                ],
                [
                    'name' => 'Python',
                    'level' => 3,
                    'employee_id' => 1
                ],
                [
                    'name' => 'HTML',
                    'level' => 4,
                    'employee_id' => 1
                ],
            ],
            'name'
        );
    }
}
