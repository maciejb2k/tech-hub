<?php

use App\Models\Employee;
use App\Models\Recruiter;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wait_lists', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->foreignIdFor(Employee::class)->constrained();
            $table->foreignIdFor(Recruiter::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wait_lists');
    }
};
