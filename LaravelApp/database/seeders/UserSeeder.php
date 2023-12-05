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
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Marek',
                    'last_name' => 'Nowak',
                    'email' => 'nowak@gmail.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Emily',
                    'last_name' => 'Smith',
                    'email' => 'emily.smith@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'James',
                    'last_name' => 'Johnson',
                    'email' => 'james.johnson@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Olivia',
                    'last_name' => 'Williams',
                    'email' => 'olivia.williams@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Liam',
                    'last_name' => 'Brown',
                    'email' => 'liam.brown@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Ava',
                    'last_name' => 'Jones',
                    'email' => 'ava.jones@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Noah',
                    'last_name' => 'Garcia',
                    'email' => 'noah.garcia@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Emma',
                    'last_name' => 'Martinez',
                    'email' => 'emma.martinez@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'William',
                    'last_name' => 'Davis',
                    'email' => 'william.davis@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Sophia',
                    'last_name' => 'Rodriguez',
                    'email' => 'sophia.rodriguez@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Alexander',
                    'last_name' => 'Miller',
                    'email' => 'alexander.miller@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Evelyn',
                    'last_name' => 'Wilson',
                    'email' => 'evelyn.wilson@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Benjamin',
                    'last_name' => 'Lopez',
                    'email' => 'benjamin.lopez@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Harper',
                    'last_name' => 'Hill',
                    'email' => 'harper.hill@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Lucas',
                    'last_name' => 'Clark',
                    'email' => 'lucas.clark@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Henry',
                    'last_name' => 'Lewis',
                    'email' => 'henry.lewis@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Charlotte',
                    'last_name' => 'Walker',
                    'email' => 'charlotte.walker@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Amelia',
                    'last_name' => 'Young',
                    'email' => 'amelia.young@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Oliver',
                    'last_name' => 'King',
                    'email' => 'oliver.king@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Elijah',
                    'last_name' => 'Wright',
                    'email' => 'elijah.wright@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Emma',
                    'last_name' => 'Turner',
                    'email' => 'emma.turner@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Ethan',
                    'last_name' => 'Adams',
                    'email' => 'ethan.adams@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Avery',
                    'last_name' => 'Baker',
                    'email' => 'avery.baker@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Ella',
                    'last_name' => 'Gonzalez',
                    'email' => 'ella.gonzalez@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Ian',
                    'last_name' => 'Perez',
                    'email' => 'ian.perez@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Zoe',
                    'last_name' => 'Scott',
                    'email' => 'zoe.scott@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Hudson',
                    'last_name' => 'Green',
                    'email' => 'hudson.green@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 1
                ],
                [
                    'first_name' => 'Sophie',
                    'last_name' => 'Barnes',
                    'email' => 'sophie.barnes@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 2
                ],
                [
                    'first_name' => 'Jack',
                    'last_name' => 'Murphy',
                    'email' => 'jack.murphy@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 2
                ],
                [
                    'first_name' => 'Aria',
                    'last_name' => 'Ward',
                    'email' => 'aria.ward@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 2
                ],
                [
                    'first_name' => 'Owen',
                    'last_name' => 'Coleman',
                    'email' => 'owen.coleman@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 2
                ],
                [
                    'first_name' => 'Luna',
                    'last_name' => 'Foster',
                    'email' => 'luna.foster@example.com',
                    'avatar' => null,
                    'password' => bcrypt("12312312"),
                    'role_id' => 2
                ],
            ],
            'name'
        );
    }
}
