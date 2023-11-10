<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        User::truncate();
        Schema::enableForeignKeyConstraints();
        User::upsert(
            [
                [
                    'first_name' => 'Jan',
                    'last_name' => 'Kowalski',
                    'email' => 'kowal@gmail.com',
                    'avatar' => null,
                    'password' => bcrypt("123"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Marek',
                    'last_name' => 'Nowak',
                    'email' => 'nowak@gmail.com',
                    'avatar' => null,
                    'password' => bcrypt("123"),
                    'role_id' => 2
                ],
            ],
            'name'
        );
    }
}
