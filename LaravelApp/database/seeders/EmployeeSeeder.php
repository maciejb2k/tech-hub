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
                [
                    'views' => 100,
                    'location' => 'City A',
                    'bio' => 'Experienced Mobile App Developer proficient in Swift and Kotlin. Skilled in developing high-performance and user-friendly mobile applications.',
                    'expected_salary' => null,
                    'portfolio' => 'https://portfolio.example.com/lucas-clark',
                    'user_id' => 1,
                ],
                [
                    'views' => 110,
                    'location' => 'City D',
                    'bio' => 'DevOps Engineer with expertise in automating deployment pipelines using tools like Docker and Kubernetes. Proficient in managing cloud infrastructure.',
                    'expected_salary' => 95000.00,
                    'portfolio' => 'https://portfolio.example.com/olivia-williams',
                    'user_id' => 2,
                ],
                [
                    'views' => 95,
                    'location' => 'City E',
                    'bio' => 'Software Engineer specialized in machine learning algorithms and data analysis. Proficient in Python and TensorFlow.',
                    'expected_salary' => 100000.00,
                    'portfolio' => 'https://portfolio.example.com/william-davis',
                    'user_id' => 3,
                ],
                [
                    'views' => 120,
                    'location' => 'City B',
                    'bio' => 'Frontend Developer with expertise in React and Vue.js. Skilled in building responsive and interactive user interfaces.',
                    'expected_salary' => 85000.00,
                    'portfolio' => 'https://portfolio.example.com/emma-martinez',
                    'user_id' => 4,
                ],
                [
                    'views' => 105,
                    'location' => 'City C',
                    'bio' => 'Backend Developer proficient in PHP and Laravel. Experienced in creating RESTful APIs and optimizing database queries.',
                    'expected_salary' => null,
                    'portfolio' => 'https://portfolio.example.com/alexander-miller',
                    'user_id' => 5,
                ],
                [
                    'views' => 120,
                    'location' => 'City F',
                    'bio' => 'Full Stack Developer proficient in JavaScript (Node.js & React) and experienced in building scalable web applications.',
                    'expected_salary' => 95000.00,
                    'portfolio' => 'https://portfolio.example.com/evelyn-wilson',
                    'user_id' => 6,
                ],
                [
                    'views' => 115,
                    'location' => 'City G',
                    'bio' => 'Data Scientist specialized in statistical analysis and machine learning models using Python and R.',
                    'expected_salary' => 105000.00,
                    'portfolio' => 'https://portfolio.example.com/benjamin-lopez',
                    'user_id' => 7,
                ],
                [
                    'views' => 100,
                    'location' => 'City H',
                    'bio' => 'Blockchain Developer with expertise in Ethereum and Solidity. Proficient in developing smart contracts.',
                    'expected_salary' => 110000.00,
                    'portfolio' => 'https://portfolio.example.com/harper-hill',
                    'user_id' => 8,
                ],
                [
                    'views' => 105,
                    'location' => 'City I',
                    'bio' => 'AI Engineer focused on Natural Language Processing (NLP) and deep learning techniques using Python and TensorFlow.',
                    'expected_salary' => 100000.00,
                    'portfolio' => 'https://portfolio.example.com/lucas-clark',
                    'user_id' => 9,
                ],
                [
                    'views' => 95,
                    'location' => 'City J',
                    'bio' => 'Cybersecurity Analyst experienced in network security and incident response. Proficient in ethical hacking techniques.',
                    'expected_salary' => 95000.00,
                    'portfolio' => 'https://portfolio.example.com/sophia-rodriguez',
                    'user_id' => 10,
                ],
                [
                    'views' => 100,
                    'location' => 'City K',
                    'bio' => 'Experienced Full Stack Developer proficient in JavaScript (Node.js & React) with a focus on creating scalable and efficient web applications.',
                    'expected_salary' => 85000.00,
                    'portfolio' => 'https://portfolio.example.com/user11',
                    'user_id' => 11,
                ],
                [
                    'views' => 90,
                    'location' => 'City L',
                    'bio' => 'Skilled Backend Developer specialized in PHP and Laravel, experienced in designing and implementing robust server-side architectures.',
                    'expected_salary' => null,
                    'portfolio' => 'https://portfolio.example.com/user12',
                    'user_id' => 12,
                ],
                [
                    'views' => 105,
                    'location' => 'City M',
                    'bio' => 'Data Scientist proficient in statistical analysis and machine learning algorithms using Python and R, with a focus on developing predictive models.',
                    'expected_salary' => 95000.00,
                    'portfolio' => 'https://portfolio.example.com/user13',
                    'user_id' => 13,
                ],
                [
                    'views' => 95,
                    'location' => 'City X',
                    'bio' => 'Experienced Frontend Developer proficient in React and Vue.js, focusing on creating interactive and responsive user interfaces.',
                    'expected_salary' => 88000.00,
                    'portfolio' => 'https://portfolio.example.com/user14',
                    'user_id' => 14,
                ],
                [
                    'views' => 85,
                    'location' => 'City Y',
                    'bio' => 'Skilled Software Engineer specialized in Python and Django, with a passion for building scalable web applications and RESTful APIs.',
                    'expected_salary' => 92000.00,
                    'portfolio' => 'https://portfolio.example.com/user15',
                    'user_id' => 15,
                ],
                [
                    'views' => 100,
                    'location' => 'City Z',
                    'bio' => 'Backend Developer proficient in Java and Spring Boot, experienced in developing high-performance and secure server-side applications.',
                    'expected_salary' => null,
                    'portfolio' => 'https://portfolio.example.com/user16',
                    'user_id' => 16,
                ],
                [
                    'views' => 110,
                    'location' => 'City A',
                    'bio' => 'Skilled DevOps Engineer proficient in Docker and Kubernetes, experienced in automating deployment pipelines and managing cloud infrastructure.',
                    'expected_salary' => 95000.00,
                    'portfolio' => 'https://portfolio.example.com/user17',
                    'user_id' => 17,
                ],
                [
                    'views' => 105,
                    'location' => 'City B',
                    'bio' => 'Experienced Software Architect specialized in designing scalable and maintainable software solutions using various architectural patterns.',
                    'expected_salary' => 100000.00,
                    'portfolio' => 'https://portfolio.example.com/user18',
                    'user_id' => 18,
                ],
                [
                    'views' => 95,
                    'location' => 'City C',
                    'bio' => 'Skilled QA Engineer proficient in test automation and ensuring the quality of software products through comprehensive testing strategies.',
                    'expected_salary' => 85000.00,
                    'portfolio' => 'https://portfolio.example.com/user19',
                    'user_id' => 19,
                ],
                [
                    'views' => 100,
                    'location' => 'City D',
                    'bio' => 'Experienced Frontend Developer skilled in Angular and TypeScript, with a focus on building responsive and interactive web applications.',
                    'expected_salary' => 88000.00,
                    'portfolio' => 'https://portfolio.example.com/user20',
                    'user_id' => 20,
                ],
                [
                    'views' => 85,
                    'location' => 'City E',
                    'bio' => 'Skilled Backend Developer proficient in Node.js and Express, experienced in building scalable and efficient server-side applications.',
                    'expected_salary' => 92000.00,
                    'portfolio' => 'https://portfolio.example.com/user21',
                    'user_id' => 21,
                ],
                [
                    'views' => 100,
                    'location' => 'City F',
                    'bio' => 'Full Stack Developer proficient in PHP (Laravel) and Vue.js, with a passion for creating intuitive and user-friendly web applications.',
                    'expected_salary' => null,
                    'portfolio' => 'https://portfolio.example.com/user22',
                    'user_id' => 22,
                ],
                [
                    'views' => 95,
                    'location' => 'City G',
                    'bio' => 'Frontend Developer proficient in React.js and Angular, with experience in crafting visually appealing and high-performing user interfaces.',
                    'expected_salary' => 88000.00,
                    'portfolio' => 'https://portfolio.example.com/user23',
                    'user_id' => 23,
                ],
                [
                    'views' => 85,
                    'location' => 'City H',
                    'bio' => 'Backend Developer skilled in Python (Django & Flask), specializing in building robust and scalable server-side applications.',
                    'expected_salary' => 92000.00,
                    'portfolio' => 'https://portfolio.example.com/user24',
                    'user_id' => 24,
                ],
                [
                    'views' => 100,
                    'location' => 'City I',
                    'bio' => 'Full Stack Developer experienced in JavaScript (React & Node.js), focused on creating innovative and user-friendly web solutions.',
                    'expected_salary' => null,
                    'portfolio' => 'https://portfolio.example.com/user25',
                    'user_id' => 25,
                ],
                [
                    'views' => 105,
                    'location' => 'City J',
                    'bio' => 'DevOps Engineer proficient in managing cloud infrastructure and automating deployment pipelines using Docker and Kubernetes.',
                    'expected_salary' => 95000.00,
                    'portfolio' => 'https://portfolio.example.com/user26',
                    'user_id' => 26,
                ],
                [
                    'views' => 100,
                    'location' => 'City K',
                    'bio' => 'Experienced Data Scientist skilled in Python and R, specializing in machine learning and predictive modeling techniques.',
                    'expected_salary' => 85000.00,
                    'portfolio' => 'https://portfolio.example.com/user27',
                    'user_id' => 27,
                ],
                [
                    'views' => 90,
                    'location' => 'City L',
                    'bio' => 'Software Engineer proficient in Java and Spring Boot, experienced in developing scalable and secure server-side applications.',
                    'expected_salary' => 90000.00,
                    'portfolio' => 'https://portfolio.example.com/user28',
                    'user_id' => 28,
                ],
            ],
            'views'
        );
    }
}
