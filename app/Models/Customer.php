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

    public function cr_modules()
    {
        return $this->hasMany(CR_Module::class, 'fk_customer_id');
    }

    public static function boot()
    {
        parent::boot();

        static::created(function (Customer $customer) {
            $defaultAvatarPath = storage_path('/app/public/medias/avatars/default-avatar.png');
            $customer->addMedia($defaultAvatarPath)
                ->usingFileName(basename($defaultAvatarPath))
                ->preservingOriginal()
                ->toMediaCollection('avatars');
        });
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Contain, 48, 48)
            ->format('png')
            ->nonQueued();
    }

    public function getAvatarUrl($conversion = '')
    {
        return $this->getFirstMediaUrl('avatars', $conversion);
    }
    
    public function uploadAvatar($avatar)
    {
        $this->clearMediaCollection('avatars');

        $this->addMedia($avatar)
            ->usingFileName($avatar->hashName())
            ->toMediaCollection('avatars');
    }
}
