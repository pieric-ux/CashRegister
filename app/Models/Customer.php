<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Customer extends Authenticatable implements HasMedia, MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

    protected $table = 'customers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_name',
        'first_name',
        'last_name',
        'address',
        'npa',
        'city',
        'phone',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function cr_apps()
    {
        return $this->hasMany(CR_App::class, 'fk_customer_id');
    }

    public function registerMediaConversions(Media $media = null): void // FIXME: format png without transparency
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Crop, 48, 48)
            ->format('png')
            ->nonQueued();
    }

    public function getAvatarUrl($conversion = '')
    {
        $avatar = $this->getFirstMediaUrl('avatars', $conversion);

        if ($avatar) {
            return $avatar;
        }

        return '/storage/medias/avatars/default-avatar.png';
    }
    
    public function uploadAvatar($avatar)
    {
        $this->clearMediaCollection('avatars');

        $this->addMedia($avatar)
            ->usingFileName($avatar->hashName())
            ->toMediaCollection('avatars');
    }
}
