<?php

namespace Tests\Feature;

use App\Models\Student;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class StudentRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_registration_with_test_email()
    {
        Notification::fake();

        $response = $this->postJson('/api/auth/register', [
            'email' => 'student@test.com',
            'password' => 'securepassword',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in'
            ]);

        $this->assertDatabaseHas('students', [
            'email' => 'student@test.com',
        ]);
    }

    public function test_registration_fails_with_invalid_email()
    {
        $response = $this->postJson('/api/auth/register', [
            'email' => 'not-an-email',
            'password' => 'short',
        ]);

        $response->assertStatus(422)
            ->assertJsonStructure(['title', 'text']);
    }

    public function test_registration_denied_for_unauthorized_email()
    {
        $response = $this->postJson('/api/auth/register', [
            'email' => 'student@unauthorized.com',
            'password' => 'validpassword',
        ]);

        $response->assertStatus(422);
    }

    public function test_registration_fails_if_user_already_exists()
    {
        Student::create([
            'email' => 'duplicate@lntu.edu.ua',
            'password' => Hash::make('validpassword'),
        ]);

        $response = $this->postJson('/api/auth/register', [
            'email' => 'duplicate@lntu.edu.ua',
            'password' => 'validpassword',
        ]);

        $response->assertStatus(403);
    }
}

