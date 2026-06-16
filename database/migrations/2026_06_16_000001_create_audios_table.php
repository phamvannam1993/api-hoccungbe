<?php

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
        Schema::create('audios', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('file_path');
            $table->unsignedInteger('duration')->nullable(); // in seconds
            $table->unsignedBigInteger('file_size'); // in bytes
            $table->string('mime_type');
            $table->enum('status', ['active', 'deleted'])->default('active');
            $table->timestamps();

            // Indexes
            $table->index('title');
            $table->index('status');
        });
    }
};
