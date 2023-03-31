<?php

namespace Tests\Feature;

use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed(): void
    {
        $user = Customer::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/profile');

        $response->assertOk();
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = Customer::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'company_name' => 'Test Company Name',
                'first_name' => 'Test First Name',
                'last_name' => 'Test Last Name',
                'address' => 'Test Address',
                'npa' => '850',
                'city' => 'Test City',
                'phone' => '1234567899',
                'email' => 'test@test.ch',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $user->refresh();

        $this->assertSame('Test Company Name', $user->company_name);
        $this->assertSame('Test First Name', $user->first_name);
        $this->assertSame('Test Last Name', $user->last_name);
        $this->assertSame('Test Address', $user->address);
        $this->assertSame('850', $user->npa);
        $this->assertSame('Test City', $user->city);
        $this->assertSame('1234567899', $user->phone);
        $this->assertSame('test@test.ch', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged(): void
    {
        $user = Customer::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'company_name' => 'Test Company',
                'first_name' => 'Test First Name',
                'last_name' => 'Test Last Name',
                'address' => 'Test Address',
                'npa' => '850',
                'city' => 'Test City',
                'phone' => '1234567899',
                'email' => $user->email,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    public function test_user_can_delete_their_account(): void
    {
        $user = Customer::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete('/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account(): void
    {
        $user = Customer::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/profile');

        $this->assertNotNull($user->fresh());
    }
}
