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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->string('message');
            $table->enum('status', ['Pending', 'Cancelled', 'Finished']);
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
        Schema::dropIfExists('invitations');
    }
};
