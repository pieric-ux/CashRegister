<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CR_App extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $table = 'cr_apps';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'start_date',
        'end_date',
        'location',
        'website',
        'fk_customer_id',
    ];

    public function customers()
    {
        return $this->belongsTo(Customer::class, 'fk_customer_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Manipulations::FIT_CROP, 300, 300)
            ->nonQueued();
    }

    public function getPosterUrl()
    {
        $poster = $this->getFirstMediaUrl('posters');

        if ($poster) {
            return $poster;
        }

        return '/storage/medias/avatars/default-avatar.png';
    }

    public function uploadPoster($poster)
    {
        $this->addMedia($poster)
            ->usingFileName($poster->hashName())
            ->toMediaCollection('posters');
    }
}
