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

    public function cr_workstations()
    {
        return $this->belongsTo(CR_Workstations::class, 'fk_workstations_id');
    }

    public static function boot()
    {
        parent::boot();

        static::created(function (CR_Employees $employee) {
            $defaultAvatarPath = storage_path('/app/public/medias/avatars/default-avatar.png');
            $employee->addMedia($defaultAvatarPath)
                ->usingFileName(basename($defaultAvatarPath))
                ->preservingOriginal()
                ->toMediaCollection('avatars-employees');
        });
    }

    public static function attemptByPasswordless($passwordless)
    {
        $user = static::where('passwordless', $passwordless)->first();

        if ($user) {
            return $user;
        }

        return null;
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Contain, 300, 300)
            ->format('png')
            ->nonQueued();
    }

    public function getAvatarUrl($conversion = '')
    {
        return $this->getFirstMediaUrl('avatars-employees', $conversion);
    }

    public function uploadAvatar($avatar)
    {
        $this->clearMediaCollection('avatars-employees');

        $this->addMedia($avatar)
            ->usingFileName($avatar->hashName())
            ->toMediaCollection('avatars-employees');
    }
}
