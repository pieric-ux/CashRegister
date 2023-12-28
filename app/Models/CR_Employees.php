<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class CR_Employees extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

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
        'logout',
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

    // Relationship with CR_Workstations model
    public function cr_workstations()
    {
        return $this->belongsTo(CR_Workstations::class, 'fk_workstations_id');
    }

    // Attempt to authenticate an employee by passwordless code
    public static function attemptByPasswordless($passwordless)
    {
        $user = static::where('passwordless', $passwordless)->first();

        if ($user) {
            return $user;
        }

        return null;
    }
    // Register media conversions for media items
    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Crop, 300, 300)
            ->format('png')
            ->nonQueued();
    }

    // Get URL of the avatar image for the employee
    public function getAvatarUrl($conversion = '')
    {
        $avatar = $this->getFirstMediaUrl('avatars-employees', $conversion);

        if ($avatar) {
            return $avatar;
        }

        return '/storage/medias/avatars/default-avatar.png';
    }

    // Upload a new picture image for the employee
    public function uploadAvatar($avatar)
    {
        $this->clearMediaCollection('avatars-employees');

        $this->addMedia($avatar)
            ->usingFileName($avatar->hashName())
            ->toMediaCollection('avatars-employees');
    }
}
