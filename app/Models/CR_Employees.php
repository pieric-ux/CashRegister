<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class CR_Employees extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'cr_employees';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'passwordless',
        'fk_workstations_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'passwordless',
        'remember_token',
    ];

    public function cr_workstations()
    {
        return $this->belongsTo(CR_Workstations::class, 'fk_workstations_id');
    }

    public static function attemptByPasswordless($passwordless)
    {
        $user = static::where('passwordless', $passwordless)->first();

        if ($user) {
            return $user;
        }

        return null;
    }
}
